import { Alert, Button, useMantineTheme } from '@mantine/core';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import Layout from '../components/layout';
import { Toolbar } from '../components/toolbar';
import { FALLBACK_ERROR_MESSAGE } from '../lib/errors';
import {
  createSSRPageProps,
  getDataFromPageProps,
  PageProps,
} from '../lib/props';
import { getLastWeekResponseNumbers } from '../lib/responses';

const ProgressPieChart = dynamic(
  () => import('../components/progress-pie-chart'),
  { ssr: false }
);

interface Data {
  numCorrect: number;
  numWrong: number;
  loadingError?: string;
}

function perc(fraction: number) {
  return fraction * 100;
}

export default function Progress(props: PageProps) {
  const data = getDataFromPageProps<Data>(props, {
    numCorrect: 0,
    numWrong: 0,
    loadingError: FALLBACK_ERROR_MESSAGE,
  });

  const { numCorrect, numWrong, loadingError } = data;

  const router = useRouter();

  const theme = useMantineTheme();

  const back = useCallback(() => {
    router.push('/driving-lessons-menu');
  }, [router]);

  const title = 'Progress';

  const total = numCorrect + numWrong;

  const percentageCorrect =
    total === 0 ? 0 : Math.round(perc(numCorrect / total));

  const percentageWrong = total === 0 ? 0 : Math.round(perc(numWrong / total));

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
      {!loadingError && (
        <>
          <div className="grow py-2" />

          <div className="flex flex-row justify-center items-center">
            <div className="relative h-96 w-full overflow-hidden">
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

          <div className="flex flex-col justify-center items-stretch">
            <p className="text-center text-red-500">
              Your weekly average score is below the required pass mark of 88%,
              keep practising.
            </p>
          </div>

          <div className="grow py-2" />

          <div className="flex flex-col justify-center items-stretch py-4">
            <Link passHref href="/quick-revision">
              <Button size="md">QUICK REVISION</Button>
            </Link>
          </div>

          <div className="flex flex-col justify-center items-stretch py-4">
            <Link passHref href="/detailed-revision">
              <Button size="md">DETAILED REVISION</Button>
            </Link>
          </div>
        </>
      )}
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const { numCorrect, numWrong } = await getLastWeekResponseNumbers(
      new Date()
    );

    return createSSRPageProps<Data>({
      numCorrect,
      numWrong,
    });
  } catch (error: any) {
    return createSSRPageProps<Data>({
      numCorrect: 0,
      numWrong: 0,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      loadingError: (error?.message as string) || FALLBACK_ERROR_MESSAGE,
    });
  }
};
