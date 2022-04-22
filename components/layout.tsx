import { Card } from '@mantine/core';
import Head from 'next/head';
import * as React from 'react';
import { CustomCenter } from './custom-center';

interface LayoutProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export default function Layout(props: LayoutProps) {
  const { title, children, className } = props;

  const injectedClassName = className ? ` ${className}` : '';

  return (
    <div
      className={`flex flex-col justify-start items-stretch${injectedClassName}`}
    >
      <Head>
        <title>Road Rules - {title}</title>
      </Head>

      <div className="flex flex-col justify-start items-stretch">
        <div className="flex flex-row justify-center items-stretch p-4">
          <CustomCenter>
            <Card
              shadow="xl"
              p="xl"
              className="w-full flex flex-col justify-start items-stretch max-h-full"
            >
              <Card.Section className="flex flex-col justify-start items-stretch p-6">
                {children}
              </Card.Section>
            </Card>
          </CustomCenter>
        </div>
      </div>
    </div>
  );
}
