import { Button } from '@mantine/core';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '../components/layout';
import { Toolbar } from '../components/toolbar';
import { useColors } from '../hooks/useColors';

export default function MainMenu () {

  const { primary } = useColors();

  const router = useRouter();

  function back () {
    router.back();
  }

  const title = "Road Rules";

  return (
    <Layout>

      <Head>
        <title>{title}</title>
      </Head>

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

      <div className="flex flex-col justify-center items-stretch p-4">
        <Link href="/driving-lessons-menu">
          <Button
            rightIcon={<i className="material-icons">arrow_forward</i>}
            style={{ backgroundColor: primary }}
          >
            DRIVING LESSONS
          </Button>
        </Link>
      </div>

      <div className="flex flex-col justify-center items-stretch p-4">
        <Link href="/driving-schools-menu">
          <Button
            rightIcon={<i className="material-icons">arrow_forward</i>}
            style={{ backgroundColor: primary }}
          >
            DRIVING SCHOOLS
          </Button>
        </Link>
      </div>

      <div className="flex flex-col justify-center items-stretch p-4">
        <Link href="/book-vid-test">
          <Button
            rightIcon={<i className="material-icons">arrow_forward</i>}
            style={{ backgroundColor: primary }}
          >
            BOOK VID TEST
          </Button>
        </Link>
      </div>

      <div className="flex flex-col justify-center items-stretch p-4">
        <Link href="/traffic-safety-council">
          <Button
            rightIcon={<i className="material-icons">arrow_forward</i>}
            style={{ backgroundColor: primary }}
          >
            TRAFFIC SAFETY COUNCIL
          </Button>
        </Link>
      </div>

    </Layout>
  )
}
