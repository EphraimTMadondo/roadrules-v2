import { Button, LoadingOverlay } from '@mantine/core';
import { Question } from '@prisma/client';
import Link from 'next/link';
import { useState } from 'react';
import Layout from '../components/layout';
import { SelectOption } from '../components/select-option';
import { Toolbar } from '../components/toolbar';
import { OptionId } from '../lib/questions-client-logic';
import { CorrectAnswerAlert } from './correct-answer-alert';
import { ErrorAlert } from './error-alert';
import { QuestionTitle } from './question-title';
import { StandardImage } from './standard-image';
import { WrongAnswerAlert } from './wrong-answer-alert';

interface QuestionComponentProps {
  key: string;
  question: Question;
  questionNumber: number;
  numQuestions: number;
  processResponse: ( question: Question, selectedOption: OptionId ) => any;
  nextQuestion: ( question: Question ) => any;
  isLoading?: boolean;
  error?: string;
}

export default function QuestionComponent ( props: QuestionComponentProps ) {

  const { question, questionNumber, numQuestions } = props;
  const { processResponse, nextQuestion, isLoading, error } = props;

  const [ selectedOption, setSelectedOption ] = useState<OptionId | undefined>( undefined );
  const [ submitted, setSubmitted ] = useState<boolean>( false );
  const [ correct, setCorrect ] = useState<boolean>( false );

  const title = "Question";

  function optionOnClick ( option: OptionId ) {
    setSelectedOption( option );
  }

  async function submitAnswer () {

    if ( selectedOption ) {
      await processResponse( question, selectedOption );
      setCorrect( selectedOption === question.correctOption );
      setSubmitted( true );
    }

  }

  return (
    <Layout className="relative" title={title}>

      <Toolbar
        title={"Practice"}
      />

      <LoadingOverlay
        visible={isLoading || false}
        transitionDuration={500}
      />

      <QuestionTitle
        questionNumber={questionNumber}
        numQuestions={numQuestions}
        title={question.text}
      />

      {
        question.image &&
        <StandardImage
          src={question.image}
          alt="Question illustration"
          layout="fill"
          objectFit="scale-down"
        />
      }

      {
        !submitted &&
        <>
          <div className="flex flex-col justify-center items-stretch py-2">
            <SelectOption
              id="A"
              content={question.option1}
              selected={selectedOption === "option1"}
              onClick={() => optionOnClick( "option1" )}
              wrong={submitted && !correct && selectedOption === "option1"}
            />
          </div>

          <div className="flex flex-col justify-center items-stretch py-2">
            <SelectOption
              id="B"
              content={question.option2}
              selected={selectedOption === "option2"}
              onClick={() => optionOnClick( "option2" )}
              wrong={submitted && !correct && selectedOption === "option2"}
            />
          </div>

          <div className="flex flex-col justify-center items-stretch py-2">
            <SelectOption
              id="C"
              content={question.option3}
              selected={selectedOption === "option3"}
              onClick={() => optionOnClick( "option3" )}
              wrong={submitted && !correct && selectedOption === "option3"}
            />
          </div>
        </>
      }

      {
        submitted && correct &&
        <CorrectAnswerAlert />
      }

      {
        submitted && !correct &&
        <WrongAnswerAlert
          question={question}
          correct={true}
        />
      }

      {
        error &&
        <ErrorAlert error={error} />
      }

      {
        !submitted &&
        <div className="flex flex-col justify-center items-stretch pt-4">
          <Button onClick={submitAnswer} size="md">
            SUBMIT ANSWER
          </Button>
        </div>
      }
      {
        submitted &&
        <div className="flex flex-col justify-center items-stretch pt-4">
          <Button onClick={( e: any ) => nextQuestion( question )} size="md">
            {questionNumber === numQuestions ? "VIEW PROGRESS" : "NEXT"}
          </Button>
        </div>
      }
      <div className="flex flex-col justify-center items-stretch pt-4">
        <Link href="/driving-lessons-menu">
          <Button size="md" variant="light">
            QUIT
          </Button>
        </Link>
      </div>

    </Layout>
  )

}
