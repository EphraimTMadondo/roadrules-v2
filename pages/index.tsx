import { Button } from '@mantine/core';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '../components/layout';
import { Toolbar } from '../components/toolbar';
import { useColors } from '../hooks/useColors';

export default function Home () {

  const { primary } = useColors();

  return (
    <Layout>

      <Head>
        <title>Welcome to RoadRules</title>
      </Head>

      <div className="grow"></div>

      <div className="flex flex-row justify-center items-center py-16">
        <div className="relative h-56 w-full overflow-hidden">
          <Image
            src="/images/road_rules_logo.png"
            alt="Road Rules Logo"
            layout="fill"
            objectFit="scale-down"
          />
        </div>
      </div>

      <div className="grow"></div>

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

      <div className="flex flex-col justify-center items-stretch p-4">
        <Link href="/terms-and-conditions">
          <Button style={{ backgroundColor: primary }} type="submit">
            NEXT
          </Button>
        </Link>
      </div>

    </Layout>
  )
}
