import { Alert, Button, useMantineTheme } from '@mantine/core';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Layout from '../components/layout';
import { Toolbar } from '../components/toolbar';
import { prisma } from '../lib/db';
import { FALLBACK_ERROR_MESSAGE } from '../lib/errors';
import { perc } from '../lib/numbers';
import {
  createSSRPageProps,
  getDataFromPageProps,
  PageProps,
} from '../lib/props';
import {
  BatchIdentifier,
  getLastBatchResponseNumbers,
  getLastWeekResponseNumbers,
  ResponseNumbers,
} from '../lib/responses';
import { withSessionSsr } from '../lib/with-session';
import { getCurrentUser } from './api/trpc/[trpc]';

const ProgressPieChart = dynamic(
  () => import('../components/progress-pie-chart'),
  { ssr: false }
);

interface Data {
  numCorrect: number;
  numWrong: number;
  paid: boolean;
  batchIdentifier?: string;
  loadingError?: string;
}

export default function Progress(props: PageProps) {
  const data = getDataFromPageProps<Data>(props, {
    numCorrect: 0,
    numWrong: 0,
    paid: false,
    loadingError: FALLBACK_ERROR_MESSAGE,
  });

  const { numCorrect, numWrong, batchIdentifier, loadingError, paid } = data;

  const theme = useMantineTheme();

  const title = batchIdentifier ? 'Practice Result' : 'Overall Progress';

  const total = numCorrect + numWrong;

  const percentageCorrect =
    total === 0 ? 0 : Math.round(perc(numCorrect / total));

  const percentageWrong = total === 0 ? 0 : Math.round(perc(numWrong / total));

  return (
    <Layout title={title}>
      <Toolbar title={title} RightElement={undefined} />

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
        <>
          <div className="grow py-2" />

          <div className="flex flex-row justify-center items-center">
            <div className="relative h-80 w-full overflow-hidden">
              <ProgressPieChart
                effectiveValue={percentageCorrect}
                elements={[
                  {
                    id: 'correct',
                    label: 'Correct',
                    value: percentageCorrect,
                    color:
                      percentageCorrect >= 88
                        ? theme.colors.green[3]
                        : theme.colors.red[5],
                  },
                  {
                    id: 'wrong',
                    label: 'Wrong',
                    value: percentageWrong,
                    color: '#d1d1d1',
                  },
                ]}
              />
            </div>
          </div>

          {percentageCorrect < 88 && (
            <div className="flex flex-col justify-center items-stretch">
              <p className="text-center font-semibold text-red-500">
                Your {batchIdentifier ? 'last test' : 'weekly average'} score is
                below the required pass mark of 88%, keep practising.
              </p>
            </div>
          )}

          {!paid && <Button color="blue">UPGRADE</Button>}

          <div className="grow py-2" />

          <div className="flex flex-col justify-center items-stretch py-4">
            <Link
              passHref
              href={
                batchIdentifier
                  ? `/quick-revision?batchIdentifier=${batchIdentifier}`
                  : 'quick-revision'
              }
            >
              <Button>QUICK REVISION</Button>
            </Link>
          </div>

          <div className="flex flex-col justify-center items-stretch py-4">
            <Link
              passHref
              href={
                batchIdentifier
                  ? `/detailed-revision?batchIdentifier=${batchIdentifier}`
                  : '/detailed-revision'
              }
            >
              <Button>DETAILED REVISION</Button>
            </Link>
          </div>
        </>
      )}
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

      const { lastBatch } = query;

      const user = await prisma.user.findFirst({
        where: { id: currentUser.id },
      });

      if (!user) {
        throw new Error('User record not found');
      }

      const {
        numCorrect,
        numWrong,
        batchIdentifier,
      }: ResponseNumbers & BatchIdentifier = await (async () => {
        if (lastBatch) {
          return getLastBatchResponseNumbers(currentUser.id);
        }
        const result = await getLastWeekResponseNumbers(
          currentUser.id,
          new Date()
        );

        return { ...result, batchIdentifier: '' };
      })();

      return createSSRPageProps<Data>({
        numCorrect,
        numWrong,
        batchIdentifier,
        paid: user.paid,
      });
    } catch (error: any) {
      return createSSRPageProps<Data>({
        numCorrect: 0,
        numWrong: 0,
        batchIdentifier: '',
        paid: false,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        loadingError: (error?.message as string) || FALLBACK_ERROR_MESSAGE,
      });
    }
  }
);
