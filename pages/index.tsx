import { Image, Button } from '@mantine/core';

// import Image from 'next/image';
import Link from 'next/link';
import Layout from '../components/layout';

export const roles = {
  rrLogo: 'rrLogo',
  tscLogo: 'tscLogo',
};

export default function Home() {
  return (
    <Layout title="Welcome to Road Rules">
      <div className="grow" />

      <div className="flex flex-col justify-center items-center p-6">
        <Image height="12rem" src="/images/road_rules_logo.png" fit="contain" />
      </div>
      {/* <Image height="18rem" src="/images/road_rules_logo.png" fit="contain" /> */}
      {/* <div className="flex flex-row justify-center items-center py-2">
        <div className="relative h-72 w-10/12 overflow-hidden">
          <Image
            role={roles.rrLogo}
            src="/images/road_rules_logo.png"
            alt="Road Rules"
            layout="fill"
            objectFit="contain"
            // objectFit="scale-down"
          />
        </div>
      </div> */}

      <div className="grow" />

      <div className="flex flex-col justify-center items-stretch">
        <p className="text-lg text-center">
          Powered by the <br />
          Traffic Safety Council of Zimbabwe
        </p>
      </div>

      <div className="flex flex-col justify-center items-center p-6">
        <Image
          height="10rem"
          src="/images/tsc_logo_high_res.png"
          fit="contain"
        />
      </div>
      {/* <Image height="14rem" src="/images/tsc_logo_high_res.png" fit="contain" /> */}
      {/* <div className="flex flex-row justify-center items-center p-6">
        <div className="relative h-56 w-10/12 overflow-hidden">
          <Image
            role={roles.tscLogo}
            src="/images/tsc_logo_high_res.png"
            alt="Traffic Safety Council"
            layout="fill"
            objectFit="contain"
            // objectFit="scale-down"
          />
        </div>
      </div> */}

      <div className="grow" />

      <div className="flex flex-col justify-center items-stretch pt-4">
        <Link passHref href="/sign-in">
          <Button role="button">NEXT</Button>
        </Link>
      </div>
    </Layout>
  );
}
