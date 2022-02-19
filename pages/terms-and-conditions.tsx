import { ActionIcon, Button, Card } from '@mantine/core';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '../components/layout';
import { Toolbar } from '../components/toolbar';
import { useColors } from '../hooks/useColors';
import { useRouter } from 'next/router'

export default function TermsAndConditions () {

  const { primary } = useColors();
  const router = useRouter();

  const title = "Terms and Conditions";

  function back () {
    router.back();
  }

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

      <div className="flex flex-col justify-center items-stretch px-4">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </p>
      </div>

      <div className="grow"></div>

      <div className="flex flex-col md:flex-row justify-start items-stretch">
        <div className="flex flex-col justify-center items-stretch grow p-4 md:pr-2">
          <Link href="/">
            <Button variant="outline">
              Reject
            </Button>
          </Link>
        </div>
        <div className="flex flex-col justify-center items-stretch grow p-4 md:pl-2">
          <Link href="/verification">
            <Button style={{ backgroundColor: primary }} type="submit">
              Accept
            </Button>
          </Link>
        </div>
      </div>

    </Layout>
  )
}
