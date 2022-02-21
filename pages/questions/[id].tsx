import { Alert, Button } from '@mantine/core';
import { GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Layout from '../../components/layout';
import { Option } from '../../components/option';
import { Toolbar } from '../../components/toolbar';
import { getOptionContent, getQuestions, OptionId, Question } from '../../lib/questions';
import { BORDER } from '../../lib/tailwind-utils';

interface QuestionPageProps {
  key: string;
  question: Question | null;
  numQuestions: number;
  lastQuestion?: boolean;
}

export default function QuestionPage ( props: QuestionPageProps ) {

  const { question, numQuestions, lastQuestion } = props;

  const [ selectedOption, setSelectedOption ] = useState<OptionId | undefined>( undefined );
  const [ submitted, setSubmitted ] = useState<boolean>( false );
  const [ correct, setCorrect ] = useState<boolean>( false );

  const router = useRouter();

  const title = "Question";

  function back () {
    router.back();
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

          <div className="flex flex-row justify-center items-center">
            <div className="relative h-48 w-full overflow-hidden">
              <Image
                src="/images/tsc_logo.png"
                alt="Traffic Safety Council Logo"
                layout="fill"
                objectFit="scale-down"
              />
            </div>
          </div>

          {
            !submitted &&
            <>
              <div className="flex flex-col justify-center items-stretch py-2">
                <Option
                  id="A"
                  content={question.option1}
                  selected={selectedOption === "A"}
                  onClick={() => optionOnClick( "A" )}
                />
              </div>

              <div className="flex flex-col justify-center items-stretch py-2">
                <Option
                  id="B"
                  content={question.option2}
                  selected={selectedOption === "B"}
                  onClick={() => optionOnClick( "B" )}
                />
              </div>

              <div className="flex flex-col justify-center items-stretch py-2">
                <Option
                  id="C"
                  content={question.option3}
                  selected={selectedOption === "C"}
                  onClick={() => optionOnClick( "C" )}
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
                  {question.correctOption}. {getOptionContent( question.correctOption as OptionId, question )}
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

  const questions = getQuestions();

  const question = questions
    .find( question => question.refNumber === id );

  const lastQuestion = question ?
    questions.indexOf( question ) === questions.length - 1 :
    true;

  const props: QuestionPageProps = {
    key: question?.refNumber.toString() || "",
    question: question || null,
    lastQuestion,
    numQuestions: questions.length
  };

  return {
    props,
    revalidate: 10
  }

}

export async function getStaticPaths () {

  const questions = getQuestions();

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
