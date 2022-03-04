import { motion } from "framer-motion"
import { Button } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '../components/layout';

export default function Home () {

  return (
    <Layout title="Welcome to Road Rules">

      <div className="grow"></div>

      <div className="flex flex-row justify-center items-center py-8">
        <div className="relative h-56 w-full overflow-hidden">
          <Image
            src="/images/road_rules_logo.png"
            alt="Road Rules Logo"
            layout="fill"
            objectFit="scale-down"
          />
        </div>
      </div>

      <div className="grow"></div>

      <div className="flex flex-col justify-center items-stretch">
        <p style={{ textAlign: "center" }}>
          Powered by the <br />
          Traffic Safety Council of Zimbabwe
        </p>
      </div>

      <div className="flex flex-row justify-center items-center pb-8">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src="/images/tsc_logo.png"
            alt="Traffic Safety Council Logo"
            layout="fill"
            objectFit="scale-down"
          />
        </div>
      </div>

      <div className="grow"></div>

      <div className="flex flex-col justify-center items-stretch pt-4">
        <Link href="/terms-and-conditions">
          <Button type="submit" size="md">
            NEXT
          </Button>
        </Link>
      </div>

    </Layout>
  )
}
