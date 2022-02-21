import { Card } from '@mantine/core';

import Head from 'next/head';
import * as React from 'react';
import { CustomCenter } from '../components/custom-center';

interface LayoutProps {
  title?: string;
  children: any;
}

export default function Layout ( props: LayoutProps ) {

  const { title, children } = props;

  return (
    <div className="flex flex-col justify-start items-stretch">

      <Head>
        <title>Road Rules - {title}</title>
      </Head>

      <div className="flex flex-col justify-start items-stretch bg-slate-100">
        <div className="flex flex-row justify-center items-stretch p-4">
          <CustomCenter>
            <div className="flex flex-row justify-center items-stretch">
              <Card shadow="xl" padding="xl" className="w-full flex flex-col justify-start items-stretch">
                <Card.Section className="flex flex-col justify-start items-stretch p-6">
                  {children}
                </Card.Section>
              </Card>
            </div>
          </CustomCenter>
        </div>
      </div>

    </div>
  )

}

/* <div className="flex flex-col justify-start items-stretch min-h-screen">

<Head>
  <title>{title}</title>
</Head>

<div className="flex flex-col justify-start items-stretch min-h-screen bg-slate-100">
  <div className="flex flex-row justify-center items-stretch min-h-screen p-4">
    <CustomCenter>
      <div className="flex flex-row justify-center items-stretch min-h-screen">
        <Card shadow="xl" padding="xl" className="w-full flex flex-col justify-start items-stretch">
          <Card.Section className="flex flex-col justify-start items-stretch min-h-screen">
            {children}
          </Card.Section>
        </Card>
      </div>
    </CustomCenter>
  </div>
</div>

</div> */