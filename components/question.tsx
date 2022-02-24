import { Button } from '@mantine/core';
import { Question } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { ABC } from '../components/abc';
import Layout from '../components/layout';
import { OptionContent } from '../components/option-content';
import { SelectOption } from '../components/select-option';
import { Toolbar } from '../components/toolbar';
import { OptionId } from '../lib/questions-client-logic';
import { BORDER } from '../lib/tailwind-utils';

interface QuestionComponentProps {
  key: string;
  question: Question;
  questionNumber: number;
  numQuestions: number;
  processResponse?: ( question: Question, selectedOption: OptionId ) => any;
}

export default function QuestionComponent ( props: QuestionComponentProps ) {

  const { question, questionNumber, numQuestions, processResponse } = props;

  const [ selectedOption, setSelectedOption ] = useState<OptionId | undefined>( undefined );
  const [ submitted, setSubmitted ] = useState<boolean>( false );
  const [ correct, setCorrect ] = useState<boolean>( false );

  const title = "Question";

  function optionOnClick ( option: OptionId ) {
    setSelectedOption( option );
  }

  function submitAnswer () {
    setSubmitted( true );
    setCorrect( selectedOption === question.correctOption );
  }

  return (
    <Layout title={title}>

      <Toolbar
        title={"Practice"}
      />

      {
        question &&
        <>
          <div className="flex flex-col justify-center items-center py-4">
            <span className="text-md font-semibold py-2">
              Question {questionNumber} of {numQuestions}
            </span>
            <span className="text-md py-2 text-center">
              {question.text}
            </span>
          </div>

          {
            question.image &&
            <div className="flex flex-row justify-center items-center">
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={question.image}
                  alt="Question illustration"
                  layout="fill"
                  objectFit="scale-down"
                />
              </div>
            </div>
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
                />
              </div>

              <div className="flex flex-col justify-center items-stretch py-2">
                <SelectOption
                  id="B"
                  content={question.option2}
                  selected={selectedOption === "option2"}
                  onClick={() => optionOnClick( "option2" )}
                />
              </div>

              <div className="flex flex-col justify-center items-stretch py-2">
                <SelectOption
                  id="C"
                  content={question.option3}
                  selected={selectedOption === "option3"}
                  onClick={() => optionOnClick( "option3" )}
                />
              </div>
            </>
          }

          {
            submitted && correct &&
            <div className={`flex flex-row justify-center items-center py-2 bg-teal-50`}>
              <span className="text-md p-2 text-center text-teal-500">
                Correct!
              </span>
              <i className="p-2 material-icons text-teal-500">
                check_circle
              </i>
            </div>
          }

          {
            submitted && !correct &&
            <div className="flex flex-col justify-center items-center py-4">
              <span className="text-md py-2 text-center text-red-500">
                Oops, you got that one wrong.
              </span>
              <span className="text-md py-1 text-center">
                The correct answer is
              </span>
              <div className={`flex flex-col justify-center items-center p-4 ${ BORDER }`}>
                <span className="text-md font-semibold py-2">
                  <ABC
                    optionId={question.correctOption as OptionId}
                  />
                  .&nbsp;
                  <OptionContent
                    optionId={question.correctOption as OptionId}
                    question={question}
                  />
                </span>
                <span className="text-md py-2 text-center">
                  {question.explanation}
                </span>
              </div>
            </div>
          }

          {
            submitted && selectedOption &&
            <div className="flex flex-col justify-center items-stretch pt-4">
              {
                processResponse &&
                <Button
                  size="md"
                  onClick={( e: any ) => processResponse( question, selectedOption )}
                >
                  NEXT
                </Button>
              }
              {
                !processResponse &&
                <Link href="/progress">
                  <Button size="md">
                    VIEW PROGRESS
                  </Button>
                </Link>
              }
            </div>
          }

          {
            !submitted &&
            <div className="flex flex-col justify-center items-stretch pt-4">
              <Button onClick={submitAnswer} size="md">
                SUBMIT ANSWER
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
        </>
      }

    </Layout>
  )

}
