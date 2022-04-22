import { Button } from '@mantine/core';
import Link from 'next/link';
import Layout from '../components/layout';
import { Toolbar } from '../components/toolbar';

export default function TermsAndConditions() {
  const title = 'Terms and Conditions';

  return (
    <Layout title={title}>
      <Toolbar title={title} />

      <div className="flex flex-col justify-center items-stretch py-4">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum.
        </p>
      </div>

      <div className="grow" />

      <div className="flex flex-col md:flex-row justify-start items-stretch">
        <div className="flex flex-col justify-center items-stretch grow pt-4 md:pr-2">
          <Link passHref href="/verification">
            <Button type="submit">Accept</Button>
          </Link>
        </div>
        <div className="flex flex-col justify-center items-stretch grow pt-4 md:pl-2">
          <Link passHref href="/">
            <Button variant="outline">Reject</Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
