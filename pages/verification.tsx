import { Stepper } from '@mantine/core';
import { useForm } from '@mantine/hooks';
import {
  Auth,
  ConfirmationResult,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from 'firebase/auth';
import { useCallback, useState } from 'react';
import Layout from '../components/layout';
import { VerificationOne } from '../components/verification-one';
import { VerificationThree } from '../components/verification-three';
import { VerificationTwo } from '../components/verification-two';
import { Inputs } from '../lib/verification';

async function resetRecaptcha() {
  const widgetId =
    await // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    ((window as any).recaptchaVerifier as RecaptchaVerifier).render();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { grecaptcha }: { grecaptcha: { ready: any; reset: any } } =
    window as any;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  grecaptcha.ready(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    grecaptcha.reset(widgetId);
  });
}

export default function Verification() {
  const [active, setActive] = useState(0);
  const [confirmationResult, setConfirmationResult] = useState<
    ConfirmationResult | undefined
  >(undefined);
  const [sendingCode, setSendingCode] = useState<boolean>(false);
  const [verifying, setVerifying] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const form = useForm<Inputs>({
    initialValues: {
      firstName: '',
      lastName: '',
      gender: 'Male',
      province: '',
      country: '',
      phoneNumber: '',
      code: '',
    },
  });

  const nextStep = useCallback(
    () => setActive((current) => (current < 3 ? current + 1 : current)),
    [setActive]
  );

  // function prevStep() {
  //   return setActive((current) => (current > 0 ? current - 1 : current));
  // }

  const sendVerificationCode = useCallback(
    async (phoneNumber: string, auth: Auth, appVerifier: RecaptchaVerifier) => {
      try {
        setSendingCode(true);

        const newResult = await signInWithPhoneNumber(
          auth,
          phoneNumber,
          appVerifier
        );
        setConfirmationResult(newResult);
      } catch (reason: any) {
        resetRecaptcha();
      } finally {
        setSendingCode(false);
      }
    },
    [setConfirmationResult, setSendingCode]
  );

  async function handleSubmit(data: Inputs) {
    try {
      setVerifying(true);

      // console.log(data);

      if (confirmationResult) {
        const result = await confirmationResult.confirm(data.code);
        window.alert(JSON.stringify(result));
        // console.log(result);
        // register and push to main menu.
        // router.push( "/main-menu" );
      }
    } catch (err: any) {
      setError('Verification code, please try again.');
    } finally {
      setVerifying(false);
    }
  }

  return (
    <Layout title="Welcome to Road Rules">
      <form
        onSubmit={form.onSubmit(handleSubmit)}
        className="flex flex-col justify-start items-stretch"
      >
        <Stepper
          active={active}
          onStepClick={setActive}
          breakpoint="md"
          size="md"
        >
          <Stepper.Step label="Enter Details" className="h-min-full">
            <VerificationOne toNextStep={nextStep} form={form} />
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
  );
}
