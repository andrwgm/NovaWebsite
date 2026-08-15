import React, { useMemo, useState } from 'react';
import { Button } from 'primereact/button';
import { requestContactModal } from '../utils/contactModalService';
import './questionnaireSection.css';

const START_COPY = {
  title: 'Start your quick screening',
  description:
    'Get a fast, private check for autism or ADHD in the UK. It does not replace a clinical assessment, but it can guide whether a professional evaluation may help.',
  cta: 'Begin the screening',
};

const TOPIC_OPTIONS = [
  {
    id: 'autism',
    title: 'Autism screening',
    description:
      'Explore early signs with the AQ-10 for adults, adolescents, or children.',
  },
  {
    id: 'adhd',
    title: 'ADHD screening',
    description:
      'Take the SNAP-IV 26-item scale to check attention and activity patterns.',
  },
];

export default function QuestionnaireSection() {
  const [started, setStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [questionnaires, setQuestionnaires] = useState(null);
  const [topic, setTopic] = useState(null);
  const [activeId, setActiveId] = useState(null);
  const [answers, setAnswers] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [result, setResult] = useState(null);

  const activeQuestionnaire = useMemo(() => {
    if (!questionnaires || !activeId) return null;
    return questionnaires.find((item) => item.id === activeId) || null;
  }, [questionnaires, activeId]);

  const availableQuestionnaires = useMemo(() => {
    if (!questionnaires || !topic) return [];
    if (topic === 'autism') {
      return questionnaires.filter((item) => item.id.startsWith('aq10'));
    }
    if (topic === 'adhd') {
      return questionnaires.filter((item) => item.id.startsWith('snap'));
    }
    return questionnaires;
  }, [questionnaires, topic]);

  const currentItem = activeQuestionnaire?.items?.[currentIndex] || null;
  const currentAnswer = currentItem ? answers[currentItem.id] : null;

  const loadQuestionnaires = async () => {
    if (questionnaires) return;
    setIsLoading(true);
    try {
      const module = await import('../data/questionnaires');
      setQuestionnaires(module.QUESTIONNAIRES);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStart = async () => {
    setStarted(true);
    await loadQuestionnaires();
  };

  const handleSelectQuestionnaire = (id) => {
    setActiveId(id);
    setAnswers({});
    setCurrentIndex(0);
    setResult(null);
  };

  const handleSelectTopic = (nextTopic) => {
    setTopic(nextTopic);
    setActiveId(null);
    setAnswers({});
    setCurrentIndex(0);
    setResult(null);
  };

  const handleAnswer = (responseId) => {
    if (!currentItem) return;
    setAnswers((prev) => ({ ...prev, [currentItem.id]: responseId }));
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    if (!activeQuestionnaire || !currentItem) return;
    const isLast = currentIndex === activeQuestionnaire.items.length - 1;
    if (isLast) {
      const computed = computeResult(activeQuestionnaire, answers);
      setResult(computed);
      return;
    }
    setCurrentIndex((prev) => prev + 1);
  };

  const handleRestart = () => {
    setActiveId(null);
    setAnswers({});
    setCurrentIndex(0);
    setResult(null);
  };

  const handleTopicReset = () => {
    setTopic(null);
    handleRestart();
  };

  return (
    <section className="questionnaire-section">
      <div className="questionnaire-card">
        {!started ? (
          <div className="questionnaire-stage questionnaire-stage-start">
            <h2 className="questionnaire-title">{START_COPY.title}</h2>
            <p className="questionnaire-desc">{START_COPY.description}</p>
            <Button className="questionnaire-primary" onClick={handleStart}>
              {START_COPY.cta}
            </Button>
          </div>
        ) : null}

        {started && isLoading ? (
          <div className="questionnaire-loading">Loading questionnaires...</div>
        ) : null}

        {started && !isLoading && !topic ? (
          <div className="questionnaire-stage questionnaire-stage-topic">
            <div className="questionnaire-header">
              <h2 className="questionnaire-title">What would you like to explore?</h2>
              <p className="questionnaire-desc">
                Choose autism or ADHD to see the right screening options. You can switch anytime.
              </p>
            </div>
            <div className="questionnaire-options">
              {TOPIC_OPTIONS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className="questionnaire-option"
                  onClick={() => handleSelectTopic(item.id)}
                >
                  <span className="questionnaire-option-title">{item.title}</span>
                  <span className="questionnaire-option-desc">{item.description}</span>
                </button>
              ))}
            </div>
          </div>
        ) : null}

        {started && !isLoading && topic && !activeQuestionnaire && questionnaires ? (
          <>
            <div className="questionnaire-header">
              <div className="questionnaire-header-top">
                <h2 className="questionnaire-title">Choose your questionnaire</h2>
                <button
                  type="button"
                  className="questionnaire-link questionnaire-back"
                  onClick={handleTopicReset}
                >
                  <i className="pi pi-arrow-left" aria-hidden="true" />
                  Back to topics
                </button>
              </div>
              <p className="questionnaire-desc">
                Pick the version that matches your age group and get clear next steps.
              </p>
            </div>
            <div className="questionnaire-options">
              {availableQuestionnaires.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className="questionnaire-option"
                  onClick={() => handleSelectQuestionnaire(item.id)}
                >
                  <span className="questionnaire-option-title">{item.title}</span>
                  <span className="questionnaire-option-meta">{item.ageRange}</span>
                  <span className="questionnaire-option-desc">{item.description}</span>
                </button>
              ))}
            </div>
          </>
        ) : null}

        {activeQuestionnaire && !result ? (
          <>
            <div className="questionnaire-progress">
              <span>
                Question {currentIndex + 1} of {activeQuestionnaire.items.length}
              </span>
              <button
                type="button"
                className="questionnaire-link questionnaire-back"
                onClick={handleRestart}
              >
                <i className="pi pi-arrow-left" aria-hidden="true" />
                Change questionnaire
              </button>
            </div>
            <h3 className="questionnaire-question">{currentItem?.text}</h3>
            <div className="questionnaire-answers" role="radiogroup">
              {activeQuestionnaire.responseOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  role="radio"
                  aria-checked={currentAnswer === option.id}
                  className={
                    currentAnswer === option.id
                      ? 'questionnaire-answer is-selected'
                      : 'questionnaire-answer'
                  }
                  onClick={() => handleAnswer(option.id)}
                >
                  {option.label}
                </button>
              ))}
            </div>
            <div className="questionnaire-actions">
              <Button
                className="questionnaire-secondary"
                label="Back"
                icon="pi pi-arrow-left"
                iconPos="left"
                onClick={handlePrevious}
                disabled={currentIndex === 0}
              >
              </Button>
              <Button
                className="questionnaire-primary"
                label={currentIndex === activeQuestionnaire.items.length - 1 ? 'Finish' : 'Next'}
                icon={currentIndex === activeQuestionnaire.items.length - 1 ? 'pi pi-check' : 'pi pi-arrow-right'} 
                iconPos="right"
                onClick={handleNext}
                disabled={!currentAnswer}
              >
              </Button>
            </div>
          </>
        ) : null}

        {result ? (
          <div className="questionnaire-result questionnaire-stage questionnaire-stage-result">
            <h3 className="questionnaire-title">Your result</h3>
            {result.isPositive ? (
              <p className="questionnaire-desc">
                Based on your answers, it may be worth speaking with our team to learn
                about autism and ADHD assessments.
              </p>
            ) : (
              <p className="questionnaire-desc">
                There are not enough indicators right now, but you are welcome to speak
                with us if you would like more clarity.
              </p>
            )}
            <div className="questionnaire-actions">
              <Button
                className="questionnaire-primary"
                label="Get in contact"
                icon="pi pi-send"
                iconPos="right"
                onClick={requestContactModal}
              >
              </Button>
              <Button className="questionnaire-secondary" onClick={handleTopicReset}>
                Back to topic selection
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}

const computeResult = (questionnaire, answers) => {
  if (!questionnaire || !questionnaire.scoring) {
    return { isPositive: false };
  }

  const scoring = questionnaire.scoring;

  if ('scales' in scoring) {
    const scoreByOptionId = Object.fromEntries(
      questionnaire.responseOptions.map((option) => [option.id, option.score ?? 0])
    );

    const scaleSummaries = scoring.scales.map((scale) => {
      const total = scale.itemIds.reduce((sum, itemId) => {
        const responseId = answers[itemId];
        if (!responseId) return sum;
        return sum + (scoreByOptionId[responseId] ?? 0);
      }, 0);
      const range = scale.ranges.find((entry) => total >= entry.min && total <= entry.max);
      return { id: scale.id, label: range?.label || 'not clinically significant' };
    });

    const isPositive = scaleSummaries.some(
      (summary) => summary.label !== 'not clinically significant'
    );

    return { isPositive };
  }

  const totalScore = questionnaire.items.reduce((sum, item) => {
    const responseId = answers[item.id];
    if (!responseId) return sum;
    if (item.scoring?.scoreIfResponseIds?.includes(responseId)) {
      return sum + 1;
    }
    return sum;
  }, 0);

  return { isPositive: totalScore >= scoring.referralThreshold };
};
