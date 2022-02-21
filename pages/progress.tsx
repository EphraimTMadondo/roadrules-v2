import { Button, useMantineTheme } from '@mantine/core';
import dynamic from "next/dynamic";
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '../components/layout';
import { Toolbar } from '../components/toolbar';

const ProgressPieChart = dynamic( () => import( "../components/progress-pie-chart" ), {
  ssr: false
} );

export default function Progress () {

  const router = useRouter();

  const theme = useMantineTheme();

  function back () {
    // router.back();
    router.push( "/driving-lessons-menu" );
  }

  const title = "Progress";

  const numCorrect = 75;
  const numWrong = 35;
  const total = numCorrect + numWrong;
  const percentageCorrect = Math.round( perc( numCorrect / total ) );
  const percentageWrong = Math.round( perc( numWrong / total ) );

  function perc ( fraction: number ) {
    return fraction * 100;
  }

  return (
    <Layout title={title}>

      <Toolbar
        title={title}
        leftIcon="arrow_back"
        leftIconAction={back}
      />

      <div className="grow py-2"></div>

      <div className="flex flex-row justify-center items-center">
        <div className="relative h-96 w-full overflow-hidden">
          <ProgressPieChart
            effectiveValue={percentageCorrect}
            elements={[
              {
                id: "correct",
                label: "Correct",
                value: percentageCorrect,
                color: percentageCorrect > 88 ?
                  theme.colors.green[ 3 ] :
                  theme.colors.red[ 5 ]
              },
              {
                id: "wrong",
                label: "Wrong",
                value: percentageWrong,
                color: "#d1d1d1"
              }
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

      <div className="grow py-2"></div>

      <div className="flex flex-col justify-center items-stretch py-4">
        <Link href="/quick-revision">
          <Button size="md">
            QUICK REVISION
          </Button>
        </Link>
      </div>

      <div className="flex flex-col justify-center items-stretch py-4">
        <Link href="/detailed-revision">
          <Button size="md">
            DETAILED REVISION
          </Button>
        </Link>
      </div>

    </Layout>
  )

}