import { NotificationsProvider } from '@mantine/notifications';

import { MantineProvider } from '@mantine/core';
import { withTRPC } from '@trpc/next';
import { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/globals.css';
import { AppRouter } from './api/trpc/[trpc]';

const envVars = [
  process.env.NEXT_PUBLIC_SERVER_URL,
  process.env.RECAPTCHA_SITE_KEY,
  process.env.NODE_ENV,
];

const missingEnvVars = envVars.filter((el) => !el);

if (missingEnvVars.length) {
  throw new Error('Env variables missing.');
}

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || '';
const recaptchaSiteKey = process.env.RECAPTCHA_SITE_KEY || '';
const nodeEnv = process.env.NODE_ENV || '';

function MyApp(props: AppProps) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta
          name="description"
          content="Zimbabwe provisional driving license test question papers, learners licence &amp; road traffic rules app!"
        />
        <meta name="keywords" content="Keywords" />

        <title>Road Rules</title>

        <script
          async
          src={`https://www.google.com/recaptcha/api.js?render=${recaptchaSiteKey}`}
        />

        <link rel="manifest" href="/manifest.json" />
        <link
          href="/icons/road_rules_logo-16_x_16.png"
          rel="icon"
          type="image/png"
          sizes="16x16"
        />
        <link
          href="/icons/road_rules_logo-32_x_32.png"
          rel="icon"
          type="image/png"
          sizes="32x32"
        />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <meta name="theme-color" content="#317EFB" />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: 'light',
          primaryColor: 'teal',
        }}
      >
        <NotificationsProvider>
          <Component {...pageProps} />
        </NotificationsProvider>
      </MantineProvider>
    </>
  );
}

export default withTRPC<AppRouter>({
  config() {
    return {
      url:
        nodeEnv === 'production'
          ? `https://${serverUrl}/api/trpc`
          : `http://${serverUrl}/api/trpc`,
    };
  },
  ssr: true,
})(MyApp);
