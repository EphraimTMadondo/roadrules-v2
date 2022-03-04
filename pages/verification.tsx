import { Stepper } from '@mantine/core';
import { Auth, ConfirmationResult, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from '@mantine/hooks';
import Layout from '../components/layout';
import { VerificationOne } from '../components/verification-one';
import { VerificationThree } from '../components/verification-three';
import { VerificationTwo } from '../components/verification-two';

export interface Inputs {
  firstName: string;
  lastName: string;
  gender: "Male" | "Female";
  province: string;
  country: string;
  phoneNumber: string;
  code: string;
}

export default function Verification () {

  const router = useRouter();

  const [ active, setActive ] = useState( 0 );
  const [ confirmationResult, setConfirmationResult ] = useState<ConfirmationResult | undefined>( undefined );
  const [ sendingCode, setSendingCode ] = useState<boolean>( false );
  const [ verifying, setVerifying ] = useState<boolean>( false );
  const [ error, setError ] = useState<string>( "" );

  const form = useForm<Inputs>( {
    initialValues: {
      firstName: "",
      lastName: "",
      gender: "Male",
      province: "",
      country: "",
      phoneNumber: "",
      code: ""
    }
  } );

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

  async function sendVerificationCode ( phoneNumber: string, auth: Auth, appVerifier: RecaptchaVerifier ) {

    try {

      setSendingCode( true );

      const confirmationResult = await signInWithPhoneNumber( auth, phoneNumber, appVerifier );
      setConfirmationResult( confirmationResult );

    } catch ( error ) {

      resetRecaptcha();

    } finally {

      setSendingCode( false );

    }

  }

  async function handleSubmit ( data: Inputs ) {

    try {

      setVerifying( true );

      console.log( data );

      if ( confirmationResult ) {
        const result = await confirmationResult.confirm( data.code );
        console.log( result );
        // register and push to main menu.
        // router.push( "/main-menu" );
      }

    } catch ( error ) {

      setError( "Verification code, please try again." );

    } finally {

      setVerifying( false );

    }

  }

  async function resetRecaptcha () {

    const widgetId = await ( ( window as any ).recaptchaVerifier as RecaptchaVerifier ).render();

    ( window as any ).grecaptcha.ready( function () {
      ( window as any ).grecaptcha.reset( widgetId );
    } );

  }

  return (
    <Layout title="Welcome to Road Rules">

      <form
        onSubmit={form.onSubmit( handleSubmit )}
        className="flex flex-col justify-start items-stretch"
      >
        <Stepper active={active} onStepClick={setActive} breakpoint="md" size="md">
          <Stepper.Step label="Enter Details" className="h-min-full">
            <VerificationOne
              toNextStep={nextStep}
              form={form}
            />
          </Stepper.Step>
          <Stepper.Step label="Send Code">
            <VerificationTwo
              toNextStep={nextStep}
              form={form}
              sendVerificationCode={sendVerificationCode}
              error={error}
              setError={setError}
            />
          </Stepper.Step>
          <Stepper.Step label="Verify Phone Number">
            <VerificationThree
              form={form}
              sendingCode={sendingCode}
              verifying={verifying}
              error={error}
            />
          </Stepper.Step>
        </Stepper>
      </form>

    </Layout>
  )
}
