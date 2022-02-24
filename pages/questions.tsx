import { Question } from '@prisma/client';
import { GetServerSideProps, GetStaticProps } from 'next';
import { useState } from 'react';
import QuestionComponent from '../components/question';
import { getQuestions } from '../lib/questions';
import { OptionId } from '../lib/questions-client-logic';

interface Data {
  initialQuestions: Question[];
}

interface QuestionPageProps {
  data: string;
}

interface CustomQuestion extends Question {
  questionNumber: number;
}

export default function QuestionPage ( props: QuestionPageProps ) {

  const data: Data = JSON.parse( props.data );

  const { initialQuestions } = data;

  const [ questions, setQuestions ] = useState<CustomQuestion[]>(
    initialQuestions
      .map( question => ( {
        ...question,
        questionNumber: initialQuestions.indexOf( question ) + 1
      } ) )
  );

  const question = questions.length ?
    questions[ 0 ] :
    undefined;

  function processResponse ( question: Question, selectedOption: OptionId ) {

    console.log( "selected", selectedOption );

    setQuestions( questions => {

      return questions
        .filter( el => el.id !== question.id );

    } );

  }

  return (
    <>
      {
        question &&
        <QuestionComponent
          key={question.questionNumber.toString()}
          question={question}
          questionNumber={question.questionNumber}
          numQuestions={initialQuestions.length}
          processResponse={questions.length > 1 ? processResponse : undefined}
        />
      }
    </>
  )

}

const LIMIT = 3;

export const getServerSideProps: GetServerSideProps = async ( { params } ) => {

  const questions = await getQuestions( LIMIT );

  const data: Data = {
    initialQuestions: questions
  }

  const props: QuestionPageProps = {
    data: JSON.stringify( data )
  };

  return {
    props
  }

}