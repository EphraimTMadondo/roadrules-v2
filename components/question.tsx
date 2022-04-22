import { Button } from '@mantine/core';
import { Question } from '@prisma/client';
import { useCallback, useState } from 'react';
import { OptionId } from '../lib/questions-client-logic';
import { CorrectAnswerPopup } from './correct-answer-popup';
import { ErrorAlert } from './error-alert';
import Layout from './layout';
import { QuestionTitle } from './question-title';
import { SelectOption } from './select-option';
import { SelectOptionContainer } from './select-option-container';
import { StandardImage } from './standard-image';
import { Toolbar } from './toolbar';
import { WrongAnswerPopup } from './wrong-answer-popup';

interface QuestionComponentProps {
  title: string;
  question: Question;
  questionNumber: number;
  numQuestions: number;
  processResponse: (question: Question, selectedOption: OptionId) => any;
  nextQuestion: (question: Question) => void;
  error?: string;
}

export default function QuestionComponent(props: QuestionComponentProps) {
  const { title, question, questionNumber, numQuestions } = props;
  const { processResponse, nextQuestion } = props;
  const { error } = props;

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

  const popupButtonCaption =
    questionNumber === numQuestions ? 'VIEW PROGRESS' : 'NEXT';

  return (
    <>
      {Boolean(!submitted) && (
        <Layout className="relative" title={title}>
          <Toolbar title={title} RightElement={undefined} />

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

          {error && <ErrorAlert error={error} />}

          {!submitted && (
            <div className="flex flex-col justify-center items-stretch pt-8">
              <Button onClick={submitAnswer}>SUBMIT ANSWER</Button>
            </div>
          )}
          {submitted && (
            <div className="flex flex-col justify-center items-stretch pt-8">
              <Button onClick={nextAction}>{popupButtonCaption}</Button>
            </div>
          )}
        </Layout>
      )}
      <CorrectAnswerPopup
        opened={Boolean(submitted && correct && selectedOption)}
        question={question}
        buttonCaption={popupButtonCaption}
        buttonOnClick={nextAction}
      />

      {selectedOption && (
        <WrongAnswerPopup
          opened={Boolean(submitted && !correct && selectedOption)}
          question={question}
          selectedOption={selectedOption}
          buttonCaption={popupButtonCaption}
          buttonOnClick={nextAction}
        />
      )}
    </>
  );
}
