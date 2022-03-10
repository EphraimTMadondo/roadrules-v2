import { Button, TextInput } from '@mantine/core';
import { UseForm } from '@mantine/hooks/lib/use-form/use-form';
import { useNotifications } from '@mantine/notifications';
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from 'firebase/auth';
import { useCallback, useEffect, useState } from 'react';
import { app } from '../lib/firebase';
import { Inputs } from '../lib/verification';

interface VerificationTwoProps {
  toNextStep: () => void;
  form: UseForm<Inputs>;
  sendingCode: boolean;
  setSendingCode: (sendingCode: boolean) => void;
}

export function VerificationTwo(props: VerificationTwoProps) {
  const { toNextStep, form, sendingCode, setSendingCode } = props;

  const [passedRecaptcha, setPassedRecaptcha] = useState(false);
  // const [sendingCode, setSendingCode] = useState(false);
  const notifications = useNotifications();

  const auth = getAuth(app);
  auth.useDeviceLanguage();

  const onSubmitLogin = useCallback(async () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const appVerifier = (window as any).recaptchaVerifier as RecaptchaVerifier;

    try {
      setSendingCode(true);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      (window as any).confirmationResult = await signInWithPhoneNumber(
        auth,
        form.values.phoneNumber,
        appVerifier
      );
      notifications.showNotification({
        message: 'Verification Code Sent!',
        color: 'teal',
        icon: <i className="material-icons">done</i>,
      });
    } catch (err) {
      console.log(err);
    } finally {
      setSendingCode(false);
    }
  }, [auth, setSendingCode, notifications, form.values.phoneNumber]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    (window as any).recaptchaVerifier = new RecaptchaVerifier(
      'recaptcha-container',
      {
        size: 'invisible',
        callback: () => {
          setPassedRecaptcha(true);
          onSubmitLogin();
        },
      },
      auth
    );
  }, [auth, onSubmitLogin, setPassedRecaptcha]);

  return (
    <div className="flex flex-col justify-center items-stretch pt-8">
      <div className="flex flex-col justify-center items-center">
        <span className="font-bold text-lg text-center py-2">
          Send Verification Code
        </span>
      </div>

      <span className="text-sm text-center py-2">
        Enter your phone number,
        <br />
        we will send a verification code via SMS.
      </span>

      <div className="flex flex-col justify-center items-stretch py-4">
        <TextInput
          placeholder="+263 77 777 7777"
          label="Phone Number"
          {...form.getInputProps('phoneNumber')}
          required
        />
      </div>

      <div
        id="recaptcha-container"
        className="flex flex-row justify-center items-stretch"
      />

      <div className="flex flex-col justify-center items-stretch pt-8">
        <Button
          onClick={passedRecaptcha ? toNextStep : onSubmitLogin}
          size="md"
          disabled={sendingCode}
          loading={sendingCode}
        >
          {passedRecaptcha && 'NEXT'}
          {!passedRecaptcha && !sendingCode && 'SEND CODE'}
          {!passedRecaptcha && sendingCode && 'SENDING CODE...'}
        </Button>
      </div>
    </div>
  );
}
