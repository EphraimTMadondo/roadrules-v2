import { Card } from '@mantine/core';
import { motion } from 'framer-motion';
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

      <div className="flex flex-col justify-start items-stretch bg-slate-100">
        <div className="flex flex-row justify-center items-stretch p-4">
          <CustomCenter>
            <motion.div
              layout
              animate={{ scale: [0.95, 1] }}
              transition={{ duration: 0.2, staggerChildren: 1 }}
              className="flex flex-row justify-center items-stretch"
            >
              <Card
                shadow="xl"
                padding="xl"
                className="w-full flex flex-col justify-start items-stretch"
              >
                <Card.Section className="flex flex-col justify-start items-stretch p-6">
                  {children}
                </Card.Section>
              </Card>
            </motion.div>
          </CustomCenter>
        </div>
      </div>
    </div>
  );
}
