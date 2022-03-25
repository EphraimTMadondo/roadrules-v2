import { Alert, Button } from '@mantine/core';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '../components/layout';
import { Toolbar } from '../components/toolbar';
import { FALLBACK_ERROR_MESSAGE } from '../lib/errors';
import {
  createSSRPageProps,
  getDataFromPageProps,
  PageProps,
} from '../lib/props';
import { withSessionSsr } from '../lib/with-session';
import { getCurrentUser } from './api/trpc/[trpc]';

interface Data {
  loadingError?: string;
}

export default function MainMenu(props: PageProps) {
  const { loadingError } = getDataFromPageProps<Data>(props, {
    loadingError: FALLBACK_ERROR_MESSAGE,
  });

  const title = 'Road Rules';

  return (
    <Layout>
      <Head>
        <title>{title}</title>
      </Head>

      <Toolbar title={title} />

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
            <Link passHref href="/driving-lessons-menu">
              <Button size="md">DRIVING LESSONS</Button>
            </Link>
          </div>

          <div className="flex flex-col justify-center items-stretch py-4">
            <Button size="md" disabled>
              DRIVING SCHOOLS
            </Button>
          </div>

          <div className="flex flex-col justify-center items-stretch py-4">
            <Button size="md" disabled>
              BOOK VID TEST
            </Button>
          </div>

          <div className="flex flex-col justify-center items-stretch pt-4">
            <Button size="md" disabled>
              TRAFFIC SAFETY COUNCIL
            </Button>
          </div>
        </>
      )}
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = withSessionSsr<PageProps>(
  async ({ req }) => {
    try {
      await Promise.resolve();
      const currentUser = getCurrentUser(req.session);

      if (!currentUser) {
        return {
          redirect: {
            destination: '/sign-in',
            permanent: false,
          },
        };
      }

      return createSSRPageProps<Data>({});
    } catch (error: any) {
      return createSSRPageProps<Data>({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        loadingError: (error?.message as string) || FALLBACK_ERROR_MESSAGE,
      });
    }
  }
);
