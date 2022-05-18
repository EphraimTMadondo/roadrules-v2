import { Question } from '@prisma/client';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { prisma } from '../lib/db';
import Layout from '../components/layout';
import { TestTimer } from '../components/test-timer';
import TimedTestComponent from '../components/timed-test';
import { ToolbarForTimer } from '../components/toolbar-for-timer';
import { FALLBACK_ERROR_MESSAGE } from '../lib/errors';
import { createKey } from '../lib/keys';
import {
  createSSRPageProps,
  getDataFromPageProps,
  PageProps,
} from '../lib/props';
import { getQuestions } from '../lib/questions';
import { withSessionSsr } from '../lib/with-session';
import { getCurrentUser } from './api/trpc/[trpc]';

interface Data {
  initialQuestions: Question[];
  batchIdentifier: string;
  paid: boolean;
  loadingError?: string;
}

export default function TimedTest(props: PageProps) {
  const data = getDataFromPageProps<Data>(props, {
    initialQuestions: [],
    batchIdentifier: '',
    paid: false,
    loadingError: FALLBACK_ERROR_MESSAGE,
  });

  const router = useRouter();

  const onTimerRunOut = useCallback(() => {
    router.push('/progress?lastBatch=lastBatch');
  }, [router]);

  const { initialQuestions, batchIdentifier, loadingError, paid } = data;

  console.log(paid);

  return (
    <Layout className="relative" title="Timed Test">
      <ToolbarForTimer
        RightElement={<TestTimer onTimerRunOut={onTimerRunOut} />}
        paid
      />
      <TimedTestComponent
        initialQuestions={initialQuestions}
        batchIdentifier={batchIdentifier}
        loadingError={loadingError}
      />
    </Layout>
  );
}

const LIMIT = 25;

export const getServerSideProps: GetServerSideProps = withSessionSsr<PageProps>(
  async ({ req }) => {
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

      const user = await prisma.user.findFirst({
        where: { id: currentUser.id },
      });

      if (!user) {
        throw new Error('User record not found');
      }

      const questions = await getQuestions(LIMIT, user.paid);

      const finalQuestions = user.paid ? questions : questions.slice(0, 10);

      return createSSRPageProps<Data>({
        initialQuestions: finalQuestions,
        batchIdentifier: createKey(),
        paid: user.paid,
      });
    } catch (error: any) {
      return createSSRPageProps<Data>({
        initialQuestions: [],
        batchIdentifier: '',
        paid: false,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        loadingError: (error?.message as string) || FALLBACK_ERROR_MESSAGE,
      });
    }
  }
);
