import { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/globals.css';
import { MantineProvider } from '@mantine/core';

export default function MyApp ( props: AppProps ) {

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
          /** Put your mantine theme override here */
          colorScheme: 'light',
          colors: {
            green: [
              "#EBFBEE",
              "#D3F9D8",
              "#B2F2BB",
              "#8CE99A",
              "#69DB7C",
              "#51CF66",
              "#40C057",
              "#37B24D",
              "#2F9E44",
              "#2B8A3E"
            ]
          },
          primaryColor: "green"
        }}
      >
        <Component {...pageProps} />
      </MantineProvider>

    </>
  )

}
