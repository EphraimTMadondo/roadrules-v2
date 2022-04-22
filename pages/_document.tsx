import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        {/* <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700&display=swap"
        /> */}
      </Head>
      <body className="bg-slate-100">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
