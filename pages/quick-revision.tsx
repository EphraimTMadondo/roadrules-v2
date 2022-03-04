import { Alert } from '@mantine/core';
import { Question, Response } from '@prisma/client';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Layout from '../components/layout';
import { ResponseComponent } from '../components/response';
import { Toolbar } from '../components/toolbar';
import { FALLBACK_ERROR_MESSAGE } from '../lib/errors';
import { createSSRPageProps, getDataFromPageProps, PageProps } from '../lib/props';
import { getLastWeekResponses } from '../lib/responses';

interface Data {
  responses: CustomResponse[];
  loadingError?: string;
}

interface CustomResponse extends Response {
  question: Question
}

export default function QuickRevision ( props: PageProps ) {

  const data = getDataFromPageProps<Data>( props, {
    responses: [],
    loadingError: FALLBACK_ERROR_MESSAGE
  } );

  const { responses, loadingError } = data;

  const router = useRouter();

  function back () {
    router.back();
  }

  const title = "Quick Revision";

  return (
    <Layout title={title}>

      <Toolbar
        title={title}
        leftIcon="arrow_back"
        leftIconAction={back}
      />

      {
        loadingError &&
        <div className="flex flex-col justify-start items-stretch pt-4">
          <Alert icon={<i className="material-icons">error</i>} title="Error" color="red">
            {loadingError}
          </Alert>
        </div>
      }
      {
        !loadingError &&
        <div className="flex flex-col justify-start items-stretch pt-8">
          {
            responses
              .map( response => (
                <div
                  key={response.id}
                  className="flex flex-col justify-start items-stretch py-3"
                >
                  <ResponseComponent
                    question={response.question}
                    correct={response.correct}
                    showIcon={true}
                  />
                </div>
              ) )
          }
        </div>
      }

    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ( _ ) => {

  try {

    const responses = await getLastWeekResponses( new Date(), "includeQuestions" );

    return createSSRPageProps<Data>( {
      responses
    } );

  } catch ( reason: any ) {

    return createSSRPageProps<Data>( {
      responses: [],
      loadingError: reason?.message || FALLBACK_ERROR_MESSAGE
    } );

  }

}