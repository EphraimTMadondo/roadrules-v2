import { NotificationsProvider } from '@mantine/notifications';

import { MantineProvider } from '@mantine/core';
import { withTRPC } from '@trpc/next';
import { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/globals.css';
import { AppRouter } from './api/trpc/[trpc]';

console.log( "NEXT_PUBLIC_SERVER_URL", process.env.NEXT_PUBLIC_SERVER_URL );

export default withTRPC<AppRouter>( {
  config ( { ctx } ) {

    return {
      url: process.env.NODE_ENV === "production"
        ? `https://${ process.env.NEXT_PUBLIC_SERVER_URL }/api/trpc`
        : `http://${ process.env.NEXT_PUBLIC_SERVER_URL }/api/trpc`
    }

  },
  ssr: true,
} )( MyApp );

function MyApp ( props: AppProps ) {

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
        <meta name="description" content="Zimbabwe provisional driving license test question papers, learners licence & road traffic rules app!" />
        <meta name="keywords" content="Keywords" />

        <title>Road Rules</title>

        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap" />

        <link rel="manifest" href="/manifest.json" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
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
        <link rel="apple-touch-icon" href="/apple-icon.png"></link>
        <meta name="theme-color" content="#317EFB" />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: 'light',
          primaryColor: "teal"
        }}
      >
        <NotificationsProvider>
          <Component {...pageProps} />
        </NotificationsProvider>
      </MantineProvider>

    </>
  )

}
