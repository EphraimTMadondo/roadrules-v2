import { Stepper } from '@mantine/core';
import Head from 'next/head';
import { useState } from 'react';
import Layout from '../components/layout';
import { Toolbar } from '../components/toolbar';
import { VerificationOne } from '../components/verification-one';
import { VerificationThree } from '../components/verification-three';
import { VerificationTwo } from '../components/verification-two';

import { useRouter } from 'next/router'

// interface Inputs {
//   phoneNumber: string;
// }

export default function Verification () {

  const router = useRouter();

  const [ active, setActive ] = useState( 0 );

  function nextStep () {

    return setActive( current => {

      return current < 3 ?
        current + 1 :
        current;

    } );

  }

  function prevStep () {

    return setActive( current => {

      return current > 0 ?
        current - 1 :
        current;

    } );

  }

  function conclude () {
    router.push( "/main-menu" );
  }

  // const { register, handleSubmit } = useForm<Inputs>();

  // function onSubmit ( data: Inputs ) {
  //   console.log( data );
  //   // router.push( "/verify" );
  // };

  return (
    <Layout>

      <Head>
        <title>Welcome to RoadRules</title>
      </Head>

      {/* <Toolbar
        title="Registration"
      /> */}

      <div className="flex flex-col justify-start items-stretch p-4">
        <Stepper active={active} onStepClick={setActive} breakpoint="md" iconSize={32}>
          <Stepper.Step label="Enter Details" className="h-min-full">
            <VerificationOne toNextStep={nextStep} />
          </Stepper.Step>
          <Stepper.Step label="Send Code">
            <VerificationTwo toNextStep={nextStep} />
          </Stepper.Step>
          <Stepper.Step label="Verify Phone Number">
            <VerificationThree toNextStep={conclude} />
          </Stepper.Step>
          {/* <Stepper.Completed>
          Completed, click back button to get to previous step
        </Stepper.Completed> */}
        </Stepper>
      </div>

    </Layout>
  )
}
