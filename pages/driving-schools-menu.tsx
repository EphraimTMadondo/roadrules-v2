import { Button } from '@mantine/core';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import Layout from '../components/layout';
import { Toolbar } from '../components/toolbar';

export default function DrivingSchoolsMenu() {
  const router = useRouter();

  const back = useCallback(() => {
    router.push('/main-menu');
  }, [router]);

  const title = 'Driving Schools';

  return (
    <Layout>
      <Head>
        <title>{title}</title>
      </Head>

      <Toolbar title={title} leftIcon="arrow_back" leftIconAction={back} />

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
        <Button size="md">HIGHWAY CODE</Button>
      </div>

      <div className="flex flex-col justify-center items-stretch py-4">
        <Button size="md">DEFENSIVE DRIVING</Button>
      </div>

      <div className="flex flex-col justify-center items-stretch py-4">
        <Button size="md">INSTRUCTOR COURSE</Button>
      </div>

      <div className="flex flex-col justify-center items-stretch pt-4">
        <Button size="md">SCHOOL REGISTRATION</Button>
      </div>
    </Layout>
  );
}
