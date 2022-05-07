import { Alert, Button } from '@mantine/core';
import { Question, Response } from '@prisma/client';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import Layout from '../components/layout';
import { QuickRevisionResponse } from '../components/quick-revision-response';
import { Toolbar } from '../components/toolbar';
import { FALLBACK_ERROR_MESSAGE } from '../lib/errors';
import {
  createSSRPageProps,
  getDataFromPageProps,
  PageProps,
} from '../lib/props';
import { OptionId } from '../lib/questions-client-logic';
import { getBatchResponses, getLastWeekResponses } from '../lib/responses';
import { withSessionSsr } from '../lib/with-session';
import { getCurrentUser } from './api/trpc/[trpc]';

interface CustomResponse extends Response {
  question: Question;
}

interface Data {
  responses: CustomResponse[];
  loadingError?: string;
}

export default function QuickRevision(props: PageProps) {
  const data = getDataFromPageProps<Data>(props, {
    responses: [],
    loadingError: FALLBACK_ERROR_MESSAGE,
  });

  const { responses, loadingError } = data;

  const router = useRouter();

  const back = useCallback(() => {
    router.back();
  }, [router]);

  const title = 'Quick Revision';

  return (
    <Layout title={title}>
      <Toolbar title={title} />

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
      {!loadingError && (
        <div className="flex flex-col justify-start items-stretch pt-8">
          {responses.map((response) => (
            <div
              key={response.id}
              className="flex flex-col justify-start items-stretch py-3"
            >
              <QuickRevisionResponse
                selectedOption={response.choice as OptionId}
                question={response.question}
                correct={response.correct}
              />
            </div>
          ))}
        </div>
      )}
      <div className="flex flex-col justify-center items-stretch pt-4">
        <Button onClick={back} variant="light">
          BACK
        </Button>
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = withSessionSsr<PageProps>(
  async ({ req, query }) => {
    try {
      const currentUser = getCurrentUser(req.session);

      if (!currentUser) {
        return {
          redirect: {
            destination: '/sign-in',
            permanent: false,
          },
        };
      }

      const { batchIdentifier } = query;

      const responses = await (async () => {
        if (batchIdentifier) {
          return getBatchResponses(batchIdentifier as string);
        }
        return getLastWeekResponses(
          currentUser.id,
          new Date(),
          'includeQuestions'
        );
      })();

      return createSSRPageProps<Data>({
        responses: responses.sort((x, y) => {
          if (x.correct === y.correct) {
            return 0;
          }
          return y.correct ? -1 : 1;
        }),
      });
    } catch (reason: any) {
      return createSSRPageProps<Data>({
        responses: [],
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        loadingError: (reason?.message as string) || FALLBACK_ERROR_MESSAGE,
      });
    }
  }
);
