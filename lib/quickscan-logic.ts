import type { Statement, StatementsConfig } from './content';

export type Profile = 'b2b' | 'b2c' | 'both';
export type Answer = 'yes' | 'no';
export type ResultBucket = 'match' | 'kansen' | 'nognniet';

export function buildQuestions(
  cfg: StatementsConfig,
  profile: Profile,
): Statement[] {
  const qs = cfg.core.map((q) => ({ ...q }));

  if (profile === 'b2b') {
    cfg.b2b.forEach((extra) => {
      qs[extra.swapIndex] = { id: extra.id, text: extra.text };
    });
  } else if (profile === 'b2c') {
    cfg.b2c.forEach((extra) => {
      qs[extra.swapIndex] = { id: extra.id, text: extra.text };
    });
  } else {
    // 'both': keep core[4], swap [5] = first B2B, [6] = first B2C
    if (cfg.b2b[0]) qs[5] = { id: cfg.b2b[0].id, text: cfg.b2b[0].text };
    if (cfg.b2c[0]) qs[6] = { id: cfg.b2c[0].id, text: cfg.b2c[0].text };
  }
  return qs;
}

export function scoreResult(answers: Answer[]): {
  yes: number;
  bucket: ResultBucket;
} {
  const yes = answers.filter((a) => a === 'yes').length;
  let bucket: ResultBucket;
  if (yes >= 8) bucket = 'match';
  else if (yes >= 5) bucket = 'kansen';
  else bucket = 'nognniet';
  return { yes, bucket };
}
