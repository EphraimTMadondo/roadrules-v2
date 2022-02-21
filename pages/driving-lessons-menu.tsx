import { Button } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '../components/layout';
import { Toolbar } from '../components/toolbar';

export default function DrivingLessonsMenu () {

  const router = useRouter();

  function back () {
    // router.back();
    router.push( "/main-menu" );
  }

  const title = "Driving Lessons";

  return (
    <Layout title={title}>

      <Toolbar
        title={title}
        leftIcon="arrow_back"
        leftIconAction={back}
      />

      <div className="grow py-2"></div>

      <div className="flex flex-col justify-center items-stretch">
        <p style={{ textAlign: "center" }}>
          Powered by the <br />
          Traffic Safety Council of Zimbabwe
        </p>
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

      <div className="grow py-2"></div>

      <div className="flex flex-col justify-center items-stretch py-4">
        <Link href="/notes">
          <Button size="md">
            NOTES
          </Button>
        </Link>
      </div>

      <div className="flex flex-col justify-center items-stretch py-4">
        <Link href="/questions/1">
          <Button size="md">
            PRACTICE
          </Button>
        </Link>
      </div>

      <div className="flex flex-col justify-center items-stretch py-4">
        <Button size="md">
          MOCK TEST
        </Button>
      </div>

      <div className="flex flex-col justify-center items-stretch pt-4">
        <Button size="md">
          PROGRESS
        </Button>
      </div>

    </Layout>
  )
}
