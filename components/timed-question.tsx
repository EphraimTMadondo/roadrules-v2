import { Button } from '@mantine/core';
import { Question } from '@prisma/client';
import { useCallback, useState } from 'react';
import { OptionId } from '../lib/questions-client-logic';
import { ErrorAlert } from './error-alert';
import { QuestionTitle } from './question-title';
import { SelectOption } from './select-option';
import { SelectOptionContainer } from './select-option-container';
import { StandardImage } from './standard-image';

interface TimedQuestionProps {
  question: Question;
  questionNumber: number;
  numQuestions: number;
  processResponse: (question: Question, selectedOption: OptionId) => any;
  nextQuestion: (question: Question) => void;
  error?: string;
}

export default function TimedQuestion(props: TimedQuestionProps) {
  const { question, questionNumber, numQuestions } = props;
  const { processResponse, nextQuestion } = props;
  const { error } = props;

  const [selectedOption, setSelectedOption] = useState<OptionId | undefined>(
    undefined
  );

  function optionOnClick(option: OptionId) {
    setSelectedOption(option);
  }

  const submitAnswer = useCallback(async () => {
    if (selectedOption) {
      await processResponse(question, selectedOption);
      nextQuestion(question);
    }
  }, [selectedOption, question, processResponse, nextQuestion]);

  return (
    <>
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
          objectFit="contain"
          // objectFit="scale-down"
        />
      )}

      <SelectOptionContainer>
        <SelectOption
          id="A"
          content={question.option1}
          selected={selectedOption === 'option1'}
          onClick={() => optionOnClick('option1')}
          wrong={false}
        />
      </SelectOptionContainer>

      <SelectOptionContainer>
        <SelectOption
          id="B"
          content={question.option2}
          selected={selectedOption === 'option2'}
          onClick={() => optionOnClick('option2')}
          wrong={false}
        />
      </SelectOptionContainer>

      <SelectOptionContainer>
        <SelectOption
          id="C"
          content={question.option3}
          selected={selectedOption === 'option3'}
          onClick={() => optionOnClick('option3')}
          wrong={false}
        />
      </SelectOptionContainer>

      {error && <ErrorAlert error={error} />}

      <div className="flex flex-col justify-center items-stretch pt-4">
        <Button onClick={submitAnswer} size="md">
          SUBMIT ANSWER
        </Button>
      </div>
    </>
  );
}
