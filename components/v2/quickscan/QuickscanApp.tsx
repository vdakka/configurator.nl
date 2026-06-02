'use client';

import { useEffect, useMemo, useState } from 'react';
import { IntroScreen } from './IntroScreen';
import { ProfileScreen } from './ProfileScreen';
import { SwipeScreen } from './SwipeScreen';
import { LoadingScreen } from './LoadingScreen';
import { ResultScreen } from './ResultScreen';
import { ThanksScreen } from './ThanksScreen';
import {
  buildQuestions,
  scoreResult,
  type Answer,
  type Profile,
  type ResultBucket,
} from '@/lib/quickscan-logic';
import { track } from '@/lib/analytics';
import type { Statement, StatementsConfig, TeamMember } from '@/lib/content';

type Microcopy = any;

type Screen = 'intro' | 'profile' | 'swipe' | 'loading' | 'result' | 'thanks';

/**
 * Orchestrator voor /v2/quickscan — Merkboek 2026 stijl.
 *
 * Identieke state-machine als het origineel (`components/quickscan/QuickscanApp`).
 * Verschil: gebruikt de v2-screens met mk-* tokens en past het wrapper-bg
 * aan per screen volgens merkboek-palet (paper / beige / yellow / ink).
 */
export function QuickscanApp({
  statements,
  microcopy,
  gerke,
  initialScreen = 'intro',
}: {
  statements: StatementsConfig;
  microcopy: Microcopy;
  gerke: TeamMember;
  initialScreen?: Screen;
}) {
  const [screen, setScreen] = useState<Screen>(initialScreen);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);

  const questions: Statement[] = useMemo(() => {
    if (!profile) return [];
    return buildQuestions(statements, profile);
  }, [statements, profile]);

  const result = useMemo(() => scoreResult(answers), [answers]);

  useEffect(() => {
    if (initialScreen !== 'intro') {
      track('quickscan_start', { source: 'deep-link-v2' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function start() {
    track('quickscan_start', { source: 'v2' });
    setScreen('profile');
  }

  function pickProfile(p: Profile) {
    setProfile(p);
    setIndex(0);
    setAnswers([]);
    track('quickscan_profile_selected', { profile: p, source: 'v2' });
    setScreen('swipe');
  }

  function commit(answer: Answer) {
    setAnswers((prev) => {
      const next = [...prev];
      next[index] = answer;
      return next;
    });
    track('quickscan_question_answered', {
      index,
      direction: answer,
      source: 'v2',
    });
    if (index + 1 >= questions.length) {
      goToResult();
    } else {
      setIndex(index + 1);
    }
  }

  function goPrev() {
    if (index === 0) return;
    setIndex(index - 1);
  }

  function goToResult() {
    setScreen('loading');
  }

  useEffect(() => {
    if (screen !== 'loading') return;
    const id = setTimeout(() => {
      const { yes, bucket } = scoreResult(answers);
      track('quickscan_completed', { score: yes, bucket, source: 'v2' });
      track(`quickscan_result_${bucket}` as const, { source: 'v2' });
      setScreen('result');
    }, 1200);
    return () => clearTimeout(id);
  }, [screen, answers]);

  function onSubmitted() {
    setScreen('thanks');
  }

  function replay() {
    setProfile(null);
    setIndex(0);
    setAnswers([]);
    setScreen('intro');
  }

  // Background per screen — strakke wisseling op merkboek-palet.
  // intro=paper, profile=paper, swipe=beige, loading=ink,
  // result depending on bucket, thanks=paper.
  const wrapperBg =
    screen === 'swipe'
      ? 'bg-mk-beige'
      : screen === 'loading'
        ? 'bg-mk-ink'
        : screen === 'result' && result.bucket === 'match'
          ? 'bg-mk-yellow'
          : screen === 'result' && result.bucket === 'kansen'
            ? 'bg-mk-beige'
            : screen === 'result' && result.bucket === 'nognniet'
              ? 'bg-mk-ink'
              : 'bg-mk-paper';

  return (
    <div className={`flex flex-1 flex-col ${wrapperBg}`}>
      {screen === 'intro' && (
        <IntroScreen copy={microcopy.intro} onStart={start} />
      )}
      {screen === 'profile' && (
        <ProfileScreen copy={microcopy.profile} onChoose={pickProfile} />
      )}
      {screen === 'swipe' && questions.length > 0 && (
        <SwipeScreen
          questions={questions}
          index={index}
          copy={microcopy.swipe}
          onCommit={commit}
          onPrev={goPrev}
        />
      )}
      {screen === 'loading' && <LoadingScreen title={microcopy.loading.title} />}
      {screen === 'result' && (
        <ResultScreen
          bucket={result.bucket as ResultBucket}
          score={result.yes}
          total={questions.length || 10}
          copy={microcopy.results[result.bucket]}
          formLabels={microcopy.form.labels}
          gerke={gerke}
          onSubmitted={onSubmitted}
          onReplay={replay}
        />
      )}
      {screen === 'thanks' && (
        <ThanksScreen copy={microcopy.thanks} onReplay={replay} />
      )}
    </div>
  );
}
