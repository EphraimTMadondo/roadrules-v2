// import { createGetInitialProps } from '@mantine/next';
// import Document from 'next/document';
import { Html, Head, Main, NextScript } from 'next/document';

// const getInitialProps = createGetInitialProps();

// export default class _Document extends Document {
//   static getInitialProps = getInitialProps;
// }

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
