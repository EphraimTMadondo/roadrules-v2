import { Alert, Button } from '@mantine/core';
import { Question, Response } from '@prisma/client';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import DetailedResponse from '../components/detailed-response';
import Layout from '../components/layout';
import { Toolbar } from '../components/toolbar';
import { FALLBACK_ERROR_MESSAGE } from '../lib/errors';
import {
  createSSRPageProps,
  getDataFromPageProps,
  PageProps,
} from '../lib/props';
import { OptionId } from '../lib/questions-client-logic';
import { getLastWeekResponses } from '../lib/responses';

interface CustomResponse extends Response {
  question: Question;
}

interface Data {
  responses: CustomResponse[];
  loadingError?: string;
}

interface NumberedResponse extends CustomResponse {
  responseNumber: number;
}

export default function DetailedRevision(props: PageProps) {
  const data = getDataFromPageProps<Data>(props, {
    responses: [],
    loadingError: FALLBACK_ERROR_MESSAGE,
  });

  const { responses: initialResponses, loadingError } = data;

  const router = useRouter();

  const [responses, setResponses] = useState<NumberedResponse[]>(
    initialResponses.map((initialResponse) => ({
      ...initialResponse,
      responseNumber: initialResponses.indexOf(initialResponse) + 1,
    }))
  );

  const response = responses.length ? responses[0] : undefined;

  const back = useCallback(() => {
    router.back();
  }, [router]);

  const nextOnClick = useCallback(() => {
    if (response) {
      if (responses.length === 1) {
        return router.back();
      }

      setResponses((prevState) =>
        prevState.filter((el) => el.id !== response.id)
      );
    }
  }, [response, responses, router, setResponses]);

  const title = 'Detailed Revision';

  return (
    <Layout title={title}>
      <Toolbar title={title} leftIcon="arrow_back" leftIconAction={back} />

      {loadingError && (
        <div className="flex flex-col justify-start items-stretch pt-4">
          <Alert
            icon={<i className="material-icons">error</i>}
            title="Error"
            color="red"
          >
            {loadingError}
          </Alert>
        </div>
      )}
      {response && (
        <>
          <DetailedResponse
            key={response.responseNumber.toString()}
            question={response.question}
            questionNumber={response.responseNumber}
            numQuestions={initialResponses.length}
            selectedOption={response.choice as OptionId}
            correct={response.correct}
          />
          <div className="flex flex-col justify-center items-stretch pt-4">
            {response.responseNumber === responses.length && (
              <Link passHref href="/progress">
                <Button variant="light" size="md">
                  BACK
                </Button>
              </Link>
            )}
            {response.responseNumber !== responses.length && (
              <Button onClick={nextOnClick} size="md">
                NEXT
              </Button>
            )}
          </div>
        </>
      )}
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const responses = await getLastWeekResponses(
      new Date(),
      'includeQuestions'
    );

    return createSSRPageProps<Data>({
      responses,
    });
  } catch (error: any) {
    return createSSRPageProps<Data>({
      responses: [],
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      loadingError: (error?.message as string) || FALLBACK_ERROR_MESSAGE,
    });
  }
};
