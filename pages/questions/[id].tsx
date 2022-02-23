import { Alert, Button } from '@mantine/core';
import { Question } from '@prisma/client';
import { GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Layout from '../../components/layout';
import { OptionContent } from '../../components/option-content';
import { ABC } from '../../components/abc';
import { SelectOption } from '../../components/select-option';
import { Toolbar } from '../../components/toolbar';
import { getQuestions } from '../../lib/questions';
import { getOptionContent, getOptionDisplayValue, OptionId } from '../../lib/questions-client-logic';
import { BORDER } from '../../lib/tailwind-utils';

interface Data {
  question: Question | null;
  numQuestions: number;
  lastQuestion?: boolean;
}

interface QuestionPageProps {
  key: string;
  data: string;
}

export default function QuestionPage ( props: QuestionPageProps ) {

  const data: Data = JSON.parse( props.data );

  const { question, numQuestions, lastQuestion } = data;

  const [ selectedOption, setSelectedOption ] = useState<OptionId | undefined>( undefined );
  const [ submitted, setSubmitted ] = useState<boolean>( false );
  const [ correct, setCorrect ] = useState<boolean>( false );

  const router = useRouter();

  const title = "Question";

  function back () {
    router.push( "/driving-lessons-menu" );
  }

  function optionOnClick ( option: OptionId ) {
    setSelectedOption( option );
  }

  function submitAnswer () {
    setSubmitted( true );
    setCorrect( selectedOption === question?.correctOption );
  }

  return (
    <Layout title={title}>

      <Toolbar
        title={"Practice"}
        leftIcon="arrow_back"
        leftIconAction={back}
      />

      {
        question &&
        <>
          <div className="flex flex-col justify-center items-center py-4">
            <span className="text-md font-semibold py-2">
              Question {question.refNumber} of {numQuestions}
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
            submitted &&
            <div className="flex flex-col justify-center items-stretch pt-4">
              {
                !lastQuestion &&
                <Link href={`/questions/${ question.refNumber + 1 }`}>
                  <Button size="md">
                    NEXT
                  </Button>
                </Link>
              }
              {
                lastQuestion &&
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
        </>
      }

      {
        !question &&
        <div className="flex flex-col justify-start items-stretch pt-4">
          <Alert icon={<i className="material-icons">error</i>} title="Sorry" color="red">
            We couldn't find that particular question.
          </Alert>
        </div>
      }

    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ( { params } ) => {

  const id = Number( params?.id || 0 );

  const questions = await getQuestions();

  const question = questions
    .find( question => question.refNumber === id );

  const lastQuestion = question ?
    questions.indexOf( question ) === questions.length - 1 :
    true;

  if ( question )
    console.log( question );

  const data: Data = {
    question: question || null,
    lastQuestion,
    numQuestions: questions.length
  }

  const props: QuestionPageProps = {
    key: question?.refNumber.toString() || "",
    data: JSON.stringify( data )
  };

  return {
    props,
    revalidate: 10
  }

}

export async function getStaticPaths () {

  const questions = await getQuestions();

  const paths = questions
    .map( question => {

      return {
        params: {
          id: question.refNumber.toString()
        },
      }

    } );

  return {
    paths,
    fallback: 'blocking'
  }

}
