/**
 * Imperatieve WebMCP-registratie voor de Quickscan.
 *
 * WebMCP is een experimentele Chrome-standaard (developer.chrome.com/docs/ai)
 * waarmee een pagina runtime-tools kan aanbieden aan een browser-agent. We
 * registreren twee tools:
 *
 *  1. `quickscan_stellingen` — gegeven een profiel, retourneer de 10 stellingen
 *  2. `quickscan_evalueer`   — gegeven profiel + 10 antwoorden, retourneer
 *                              score, bucket en aanbevolen vervolgstap
 *
 * In browsers zonder `window.webmcp` doet dit bestand niets. De UI blijft
 * onaangetast — agents zonder ondersteuning vallen terug op het normale
 * swipe-formulier (dat dankzij Ronde 1 ook a11y-vriendelijk is).
 */

import type { StatementsConfig } from './content';
import {
  buildQuestions,
  scoreResult,
  type Answer,
  type Profile,
  type ResultBucket,
} from './quickscan-logic';

type JSONSchema = Record<string, unknown>;

type WebMCPTool = {
  name: string;
  description: string;
  inputSchema: JSONSchema;
  handler: (input: unknown) => unknown | Promise<unknown>;
};

type WebMCP = {
  registerTool: (tool: WebMCPTool) => void | Promise<void>;
};

declare global {
  interface Window {
    webmcp?: WebMCP;
  }
}

const PROFILE_VALUES: Profile[] = ['b2b', 'b2c', 'both'];
const ANSWER_VALUES: Answer[] = ['yes', 'no'];

const BUCKET_ADVICE: Record<
  ResultBucket,
  { title: string; recommendation: string; nextStep: string }
> = {
  match: {
    title: "It's a match.",
    recommendation:
      'Op basis van de antwoorden is er een grote kans dat een productconfigurator het verkoopproces flink helpt. Configuratie, guided selling en visualisatie sluiten goed aan op de situatie.',
    nextStep:
      'Plan een kennismaking met Gerke van den Akker via https://configurator.nl/contact — hij neemt deze week persoonlijk contact op.',
  },
  kansen: {
    title: 'Er liggen kansen.',
    recommendation:
      'Een paar antwoorden wijzen op duidelijke configurator-kansen, maar er staan ook nog open vragen. Een korte analyse op maat helpt om de juiste eerste stap te bepalen.',
    nextStep:
      'Vraag een korte analyse aan via https://configurator.nl/contact, of speel de quickscan opnieuw met een ander profiel.',
  },
  nognniet: {
    title: 'Misschien nu nog niet de prioriteit.',
    recommendation:
      'Op basis van de antwoorden lijkt een configurator nu nog niet de meest waardevolle investering. Inspiratie opdoen kan wel helpen om het juiste moment te herkennen.',
    nextStep:
      'Download het inspiratiestuk via https://configurator.nl/inspiratiestuk.pdf, of speel de quickscan opnieuw.',
  },
};

function isProfile(value: unknown): value is Profile {
  return typeof value === 'string' && (PROFILE_VALUES as string[]).includes(value);
}

function isAnswerArray(value: unknown): value is Answer[] {
  return (
    Array.isArray(value) &&
    value.length === 10 &&
    value.every((a) => typeof a === 'string' && (ANSWER_VALUES as string[]).includes(a))
  );
}

function buildTools(statements: StatementsConfig): WebMCPTool[] {
  const profileSchema: JSONSchema = {
    type: 'string',
    enum: PROFILE_VALUES,
    description:
      'Doelgroep van het bedrijf. "b2b" voor zakelijke afnemers, "b2c" voor consumenten, "both" voor een mix.',
  };

  return [
    {
      name: 'quickscan_stellingen',
      description:
        'Geef de tien quickscan-stellingen terug die horen bij een bepaald profiel. Gebruik deze tool om de stellingen te tonen of om antwoorden van de gebruiker te verzamelen voordat je quickscan_evalueer aanroept.',
      inputSchema: {
        type: 'object',
        additionalProperties: false,
        required: ['profile'],
        properties: {
          profile: profileSchema,
        },
      },
      handler: (input: unknown) => {
        const profile = (input as { profile?: unknown })?.profile;
        if (!isProfile(profile)) {
          return {
            ok: false,
            error: `profile moet een van ${PROFILE_VALUES.join(', ')} zijn`,
          };
        }
        const questions = buildQuestions(statements, profile);
        return {
          ok: true,
          profile,
          statements: questions.map((q, i) => ({
            index: i,
            id: q.id,
            text: q.text,
          })),
        };
      },
    },
    {
      name: 'quickscan_evalueer',
      description:
        'Evalueer of een productconfigurator past bij dit bedrijf. Geef een profiel (b2b / b2c / both) en exact tien yes/no antwoorden in dezelfde volgorde als quickscan_stellingen. Retourneert score, bucket (match / kansen / nognniet) en een aanbevolen vervolgstap.',
      inputSchema: {
        type: 'object',
        additionalProperties: false,
        required: ['profile', 'answers'],
        properties: {
          profile: profileSchema,
          answers: {
            type: 'array',
            minItems: 10,
            maxItems: 10,
            items: { type: 'string', enum: ANSWER_VALUES },
            description:
              'Tien yes/no antwoorden in volgorde van de stellingen voor het gekozen profiel.',
          },
        },
      },
      handler: (input: unknown) => {
        const profile = (input as { profile?: unknown })?.profile;
        const answers = (input as { answers?: unknown })?.answers;
        if (!isProfile(profile)) {
          return {
            ok: false,
            error: `profile moet een van ${PROFILE_VALUES.join(', ')} zijn`,
          };
        }
        if (!isAnswerArray(answers)) {
          return {
            ok: false,
            error: 'answers moet een array van precies 10 yes/no-strings zijn',
          };
        }
        const { yes, bucket } = scoreResult(answers);
        const advice = BUCKET_ADVICE[bucket];
        return {
          ok: true,
          profile,
          score: { yes, total: 10 },
          bucket,
          title: advice.title,
          recommendation: advice.recommendation,
          nextStep: advice.nextStep,
        };
      },
    },
  ];
}

/**
 * Registreer de quickscan-tools op `window.webmcp` als die API aanwezig is.
 * Idempotent: bij meerdere aanroepen registreren we maar één keer per session.
 */
let registered = false;

export function registerQuickscanTools(statements: StatementsConfig): void {
  if (typeof window === 'undefined') return;
  if (registered) return;
  const api = window.webmcp;
  if (!api || typeof api.registerTool !== 'function') return;

  const tools = buildTools(statements);
  try {
    for (const tool of tools) {
      api.registerTool(tool);
    }
    registered = true;
  } catch {
    // WebMCP is experimenteel; eventuele registratiefouten mogen de pagina
    // niet breken. Bij een fout blijft `registered = false` zodat een latere
    // poging (bv. na navigatie) opnieuw mag proberen.
  }
}
