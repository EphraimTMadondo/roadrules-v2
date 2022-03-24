import { Button } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';
// import { useRouter } from 'next/router';
// import { useCallback } from 'react';
import Layout from '../components/layout';
import { Toolbar } from '../components/toolbar';

export default function DrivingLessonsMenu() {
  // const router = useRouter();

  // const back = useCallback(() => {
  //   router.push('/main-menu');
  // }, [router]);

  const title = 'Driving Lessons';

  return (
    <Layout title={title}>
      <Toolbar
        title={title}
        // leftIcon="arrow_back"
        // leftIconAction={back}
      />

      <div className="grow py-2" />

      <div className="flex flex-col justify-center items-stretch">
        <p style={{ textAlign: 'center' }}>
          Powered by the <br />
          Traffic Safety Council of Zimbabwe
        </p>
      </div>

      <div className="flex flex-row justify-center items-center">
        <div className="relative h-56 w-10/12 overflow-hidden">
          <Image
            src="/images/tsc_logo.png"
            alt="Traffic Safety Council Logo"
            layout="fill"
            objectFit="contain"
            // objectFit="scale-down"
          />
        </div>
      </div>

      <div className="grow py-2" />

      <div className="flex flex-col justify-center items-stretch py-4">
        <Link passHref href="/notes">
          <Button size="md">NOTES</Button>
        </Link>
      </div>

      <div className="flex flex-col justify-center items-stretch py-4">
        <Link passHref href="/questions">
          <Button size="md">PRACTICE</Button>
        </Link>
      </div>

      <div className="flex flex-col justify-center items-stretch py-4">
        <Link passHref href="/timed-test">
          <Button size="md">MOCK TEST</Button>
        </Link>
      </div>

      <div className="flex flex-col justify-center items-stretch pt-4">
        <Link passHref href="/progress">
          <Button size="md">PROGRESS</Button>
        </Link>
      </div>
    </Layout>
  );
}
