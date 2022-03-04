import { Alert } from '@mantine/core';
import { useNotifications } from '@mantine/notifications';
import { Question } from '@prisma/client';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { ErrorAlert } from '../components/error-alert';
import Layout from '../components/layout';
import QuestionComponent from '../components/question';
import { Toolbar } from '../components/toolbar';
import { FALLBACK_ERROR_MESSAGE } from '../lib/errors';
import { createSSRPageProps, getDataFromPageProps, PageProps } from '../lib/props';
import { getQuestions } from '../lib/questions';
import { OptionId } from '../lib/questions-client-logic';
import { trpc } from '../utils/trpc';

interface Data {
  initialQuestions: Question[];
  loadingError?: string;
}

interface CustomQuestion extends Question {
  questionNumber: number;
}

export default function Questions ( props: PageProps ) {

  const data: Data = getDataFromPageProps( props, {
    initialQuestions: [],
    loadingError: FALLBACK_ERROR_MESSAGE
  } );

  const { initialQuestions, loadingError } = data;

  const router = useRouter();
  const notifications = useNotifications();

  const [ questions, setQuestions ] = useState<CustomQuestion[]>(
    initialQuestions
      .map( question => ( {
        ...question,
        questionNumber: initialQuestions.indexOf( question ) + 1
      } ) )
  );

  const [ isLoading, setisLoading ] = useState<boolean>( false );
  const [ error, setError ] = useState<string>( "" );

  const mutation = trpc.useMutation( "response.create", {
    onMutate: async () => {
      setisLoading( true );
      setError( "" );
    },
    onError: error => {
      console.log( error.data );
      setError( error.message );
    },
    onSuccess: () => {
      notifications.showNotification( {
        message: "Response recorded!",
        color: "teal",
        icon: <i className="material-icons">done</i>
      } );
    },
    onSettled: async () => {
      setisLoading( false );
    }
  } );

  const question = questions.length ?
    questions[ 0 ] :
    undefined;

  async function processResponse ( question: Question, selectedOption: OptionId ) {

    mutation.mutate( {
      questionId: question.id,
      choice: selectedOption
    } );

  }

  function nextQuestion ( question: Question ) {

    if ( questions.length === 1 )
      return router.push( "/progress" );

    setQuestions( questions => questions
      .filter( el => el.id !== question.id )
    );

  }

  function back () {
    router.push( "/driving-lessons-menu" );
  }

  return (
    <>
      {
        loadingError &&
        <Layout className="relative" title="Practice">

          <Toolbar
            title={"Practice"}
            leftIcon="arrow_back"
            leftIconAction={back}
          />

          <div className="flex flex-col justify-start items-stretch pt-4">
            <ErrorAlert error={loadingError} />
          </div>

        </Layout>
      }
      {
        question &&
        <QuestionComponent
          key={question.questionNumber.toString()}
          title="Practice"
          question={question}
          questionNumber={question.questionNumber}
          numQuestions={initialQuestions.length}
          processResponse={processResponse}
          nextQuestion={nextQuestion}
          isLoading={isLoading}
          error={error}
        />
      }
    </>
  )

}

const LIMIT = 25;

export const getServerSideProps: GetServerSideProps = async ( _ ) => {

  try {

    const questions = await getQuestions( LIMIT );

    return createSSRPageProps<Data>( {
      initialQuestions: questions
    } );

  } catch ( error: any ) {

    return createSSRPageProps<Data>( {
      initialQuestions: [],
      loadingError: error?.message || FALLBACK_ERROR_MESSAGE
    } );

  }

}