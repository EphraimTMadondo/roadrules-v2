import { Button, LoadingOverlay } from '@mantine/core';
import { Question } from '@prisma/client';
import Link from 'next/link';
import { useCallback, useState } from 'react';
import Layout from './layout';
import { SelectOption } from './select-option';
import { Toolbar } from './toolbar';
import { OptionId } from '../lib/questions-client-logic';
import { CorrectAnswerAlert } from './correct-answer-alert';
import { ErrorAlert } from './error-alert';
import { QuestionTitle } from './question-title';
import { SelectOptionContainer } from './select-option-container';
import { StandardImage } from './standard-image';
import { Timer } from './timer';
import { WrongAnswerAlert } from './wrong-answer-alert';

interface QuestionComponentProps {
  key: string;
  title: string;
  question: Question;
  questionNumber: number;
  numQuestions: number;
  processResponse: (question: Question, selectedOption: OptionId) => any;
  nextQuestion: (question: Question) => void;
  isLoading?: boolean;
  error?: string;
  timed?: boolean;
  secondsLeft?: number;
  crunchTime?: boolean;
}

export default function QuestionComponent(props: QuestionComponentProps) {
  const { key, title, question, questionNumber, numQuestions } = props;
  const { processResponse, nextQuestion, isLoading } = props;
  const { error, timed, secondsLeft, crunchTime } = props;

  const [selectedOption, setSelectedOption] = useState<OptionId | undefined>(
    undefined
  );
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [correct, setCorrect] = useState<boolean>(false);

  function optionOnClick(option: OptionId) {
    setSelectedOption(option);
  }

  const submitAnswer = useCallback(async () => {
    if (selectedOption) {
      await processResponse(question, selectedOption);
      setCorrect(selectedOption === question.correctOption);
      setSubmitted(true);
    }
  }, [selectedOption, question, processResponse, setCorrect, setSubmitted]);

  const nextAction = useCallback(
    () => nextQuestion(question),
    [question, nextQuestion]
  );

  const RightElement = timed
    ? () => (
        <Timer
          secondsLeft={secondsLeft || 0}
          crunchTime={crunchTime || false}
        />
      )
    : undefined;

  return (
    <Layout key={key} className="relative" title={title}>
      <Toolbar title={title} RightElement={RightElement} />

      <LoadingOverlay visible={isLoading || false} transitionDuration={500} />

      <QuestionTitle
        questionNumber={questionNumber}
        numQuestions={numQuestions}
        title={question.text}
      />

      {question.image && (
        <StandardImage
          src={question.image}
          alt="Question illustration"
          layout="fill"
          objectFit="scale-down"
        />
      )}

      {!submitted && (
        <>
          <SelectOptionContainer>
            <SelectOption
              id="A"
              content={question.option1}
              selected={selectedOption === 'option1'}
              onClick={() => optionOnClick('option1')}
              wrong={submitted && !correct && selectedOption === 'option1'}
            />
          </SelectOptionContainer>

          <SelectOptionContainer>
            <SelectOption
              id="B"
              content={question.option2}
              selected={selectedOption === 'option2'}
              onClick={() => optionOnClick('option2')}
              wrong={submitted && !correct && selectedOption === 'option2'}
            />
          </SelectOptionContainer>

          <SelectOptionContainer>
            <SelectOption
              id="C"
              content={question.option3}
              selected={selectedOption === 'option3'}
              onClick={() => optionOnClick('option3')}
              wrong={submitted && !correct && selectedOption === 'option3'}
            />
          </SelectOptionContainer>
        </>
      )}

      {submitted && correct && <CorrectAnswerAlert />}

      {submitted && !correct && (
        <WrongAnswerAlert question={question} correct />
      )}

      {error && <ErrorAlert error={error} />}

      {!submitted && (
        <div className="flex flex-col justify-center items-stretch pt-4">
          <Button onClick={submitAnswer} size="md">
            SUBMIT ANSWER
          </Button>
        </div>
      )}
      {submitted && (
        <div className="flex flex-col justify-center items-stretch pt-4">
          <Button onClick={nextAction} size="md">
            {questionNumber === numQuestions ? 'VIEW PROGRESS' : 'NEXT'}
          </Button>
        </div>
      )}
      <div className="flex flex-col justify-center items-stretch pt-4">
        <Link passHref href="/driving-lessons-menu">
          <Button size="md" variant="light">
            QUIT
          </Button>
        </Link>
      </div>
    </Layout>
  );
}
