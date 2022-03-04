import { Autocomplete, Button, TextInput } from "@mantine/core";
import { UseForm } from "@mantine/hooks/lib/use-form/use-form";
import { Auth, getAuth, RecaptchaVerifier } from "firebase/auth";
import { useState } from 'react';
import { Inputs } from "../pages/verification";
import { ErrorAlert } from "./error-alert";

interface VerificationTwoProps {
  toNextStep: () => void;
  form: UseForm<Inputs>;
  sendVerificationCode: ( phoneNumber: string, auth: Auth, appVerifier: RecaptchaVerifier ) => any;
  error: string;
  setError: ( error: string ) => any;
}

export function VerificationTwo ( props: VerificationTwoProps ) {

  const { toNextStep, form, sendVerificationCode, error, setError } = props;

  const countries = [
    "Zimbabwe",
    "Zambia",
    "South Africa"
  ];

  const [ passedRecaptcha, setPassedRecaptcha ] = useState<boolean>( false );

  const auth = getAuth();
  // auth.languageCode = 'it';
  auth.useDeviceLanguage();

  let appVerifier: RecaptchaVerifier = ( window as any ).recaptchaVerifier;

  appVerifier = new RecaptchaVerifier( 'recaptcha-container', {
    'size': 'normal',
    'callback': ( response: any ) => {
      // reCAPTCHA solved, allow signInWithPhoneNumber.
      setPassedRecaptcha( true );
    },
    'expired-callback': () => {
      // Response expired. Ask user to solve reCAPTCHA again.
      setError( "Recaptcha session's expired, please try again." );
    }
  }, auth );

  function buttonOnClick ( e: any ) {
    sendVerificationCode( "", auth, appVerifier );
    toNextStep();
  }

  return (
    <div className="flex flex-col justify-center items-stretch pt-8">

      <div className="flex flex-col justify-center items-center">
        <span className="font-bold text-lg text-center py-2">
          Send Verification Code
        </span>
      </div>

      <span className="text-sm text-center py-2">
        We will send an SMS to verify your phone number.<br />
        Enter your country code and phone number.
      </span>

      <div className="flex flex-col justify-center items-stretch py-4">
        <Autocomplete
          label="Country"
          placeholder="Pick Country"
          data={countries}
          {...form.getInputProps( "country" )}
          required
        />
      </div>

      <div className="flex flex-col justify-center items-stretch py-4">
        <TextInput
          placeholder="+263 77 777 7777"
          label="Phone Number"
          {...form.getInputProps( "phoneNumber" )}
          required
        />
      </div>

      <div className="flex flex-col justify-center items-stretch py-4">
        <div id="recaptcha-container"></div>
      </div>

      {
        error &&
        <ErrorAlert error={error} />
      }

      <div className="flex flex-col justify-center items-stretch pt-8">
        <Button onClick={buttonOnClick} size="md" disabled={!passedRecaptcha}>
          SEND CODE
        </Button>
      </div>

    </div>
  )

}