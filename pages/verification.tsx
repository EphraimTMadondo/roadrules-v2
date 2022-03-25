import { Button, LoadingOverlay, Stepper } from '@mantine/core';
import { useForm } from '@mantine/hooks';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import { ZodError } from 'zod';
import { ErrorAlert } from '../components/error-alert';
import Layout from '../components/layout';
import { VerificationOne } from '../components/verification-one';
import { VerificationThree } from '../components/verification-three';
import { VerificationTwo } from '../components/verification-two';
import { capitalize } from '../lib/strings';
import {
  AuthCode,
  AuthCodeSchema,
  CreateUser,
  CreateUserSchema,
  SendCode,
  SendCodeSchema,
} from '../lib/user-schemas';
import { Inputs } from '../lib/verification';
import { customErrorMap, zodErrorsToString } from '../lib/zod-utils';
import { trpc } from '../utils/trpc';

export default function Verification() {
  const {
    isLoading,
    error,
    isError,
    data: fetchedData,
  } = trpc.useQuery(['province.list']);

  const countries = fetchedData?.countries || [];

  const [active, setActive] = useState(0);
  const [countryId, setCountryId] = useState<number | undefined>(
    countries[0]?.id || undefined
  );

  const countryOptions = countries.map((country) => ({
    value: country.id.toString(),
    label: country.country,
  }));

  const provinceOptions = countryId
    ? (
        countries.find((country) => country.id === countryId)?.provinces || []
      ).map((province) => ({
        value: province.id.toString(),
        label: province.province,
      }))
    : [];

  const [loading, setLoading] = useState<boolean>(false);
  const [sendCodeError, setSendCodeError] = useState<string>('');
  const [registrationError, setRegistrationError] = useState<string>('');

  const router = useRouter();

  const toDetails = useCallback(() => {
    setActive(0);
  }, [setActive]);

  const toSendCode = useCallback(() => {
    setActive(1);
  }, [setActive]);

  const toAuthCode = useCallback(() => {
    setActive(2);
  }, [setActive]);

  const form = useForm<Inputs>({
    initialValues: {
      firstName: '',
      lastName: '',
      gender: 'Male',
      provinceId: 0,
      countryId: 0,
      phoneNumber: '',
      code: '',
      pin: '',
      reEnterPin: '',
    },
    validationRules: {
      firstName: (value) => {
        if (!value) toDetails();
        return !!value;
      },
      lastName: (value) => {
        if (!value) toDetails();
        return !!value;
      },
      gender: (value) => {
        if (!value) toDetails();
        return !!value;
      },
      provinceId: (value) => {
        if (!value) toDetails();
        return !!value;
      },
      phoneNumber: (value) => {
        if (!value) toSendCode();
        return !!value;
      },
      pin: (value) => {
        if (!value) toSendCode();
        return !!value;
      },
      reEnterPin: (value) => {
        if (!value) toSendCode();
        return !!value;
      },
    },
    errorMessages: {
      firstName: 'Please enter your first name.',
      lastName: 'Please enter your last name.',
      gender: 'Please select your gender.',
      provinceId: 'Please select your province.',
      phoneNumber: 'Please enter your phone number.',
      pin: 'Please enter your pin.',
      reEnterPin: 'Please re-enter your pin.',
    },
  });

  const sendCodeMutation = trpc.useMutation('user.sendCode', {
    onMutate: () => {
      setLoading(true);
      setSendCodeError('');
    },
    onError: ({ message }: { message: string }) => {
      setSendCodeError(capitalize(message));
      toSendCode();
    },
    onSuccess: () => {
      // notifications.showNotification({
      //   message: 'Code Sent!',
      //   color: 'teal',
      //   icon: <i className="material-icons">done</i>,
      // });
      toAuthCode();
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  const createUserMutation = trpc.useMutation('user.create', {
    onMutate: () => {
      setLoading(true);
      setRegistrationError('');
    },
    onError: ({ message }: { message: string }) => {
      setRegistrationError(capitalize(message));
    },
    onSuccess: () => {
      // notifications.showNotification({
      //   message: 'Registration Complete!',
      //   color: 'teal',
      //   icon: <i className="material-icons">done</i>,
      // });
      router.push('/main-menu');
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  const authCodeMutation = trpc.useMutation('user.authCode', {
    onMutate: () => {
      setLoading(true);
      setRegistrationError('');
    },
    onError: (err) => {
      setRegistrationError(capitalize(err?.message));
      toAuthCode();
    },
    onSuccess: () => {
      // notifications.showNotification({
      //   message: 'Code verified!',
      //   color: 'teal',
      //   icon: <i className="material-icons">done</i>,
      // });
      const createUserDetails: CreateUser = {
        firstName: form.values.firstName,
        lastName: form.values.lastName,
        gender: form.values.gender,
        provinceId: Number(form.values.provinceId),
        phoneNumber: form.values.phoneNumber,
        pin: form.values.pin,
        reEnterPin: form.values.reEnterPin,
      };
      try {
        CreateUserSchema.parse(createUserDetails, { errorMap: customErrorMap });

        if (createUserDetails.pin !== createUserDetails.reEnterPin) {
          throw new Error('Please make sure the pins match.');
        }

        createUserMutation.mutate(createUserDetails);
      } catch (err) {
        const fallbackMessage = 'Failed to create user, please try again.';
        if (err instanceof ZodError) {
          setRegistrationError(zodErrorsToString(err) || fallbackMessage);
        } else {
          setRegistrationError(fallbackMessage);
        }
      }
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  const onCountryChange = useCallback(
    (value: string | null) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const newCountryId = Number(value || '0');
      form.setFieldValue('countryId', newCountryId);
      setCountryId(newCountryId);
    },
    [setCountryId, form]
  );

  const nextStep = useCallback(
    () => setActive((current) => (current < 3 ? current + 1 : current)),
    [setActive]
  );

  const sendCode = useCallback(() => {
    if (!form.values.phoneNumber) {
      setSendCodeError('Please enter your phone number first.');
      return toSendCode();
    }

    const sendCodeDetails: SendCode = {
      phoneNumber: form.values.phoneNumber,
    };
    try {
      SendCodeSchema.parse(sendCodeDetails, { errorMap: customErrorMap });
      sendCodeMutation.mutate(sendCodeDetails);
    } catch (err) {
      const fallbackMessage =
        'Failed to send verification code, please try again.';
      if (err instanceof ZodError) {
        setRegistrationError(zodErrorsToString(err) || fallbackMessage);
      } else {
        setRegistrationError(fallbackMessage);
      }
    }
  }, [form, sendCodeMutation, setSendCodeError, toSendCode]);

  function handleSubmit(data: Inputs) {
    try {
      setLoading(true);
      setRegistrationError('');

      const authCodeDetails: AuthCode = {
        phoneNumber: data.phoneNumber,
        // code: data.code.toString(),
        code: data.code.toString(),
      };
      AuthCodeSchema.parse(authCodeDetails, { errorMap: customErrorMap });
      authCodeMutation.mutate(authCodeDetails);
    } catch (err) {
      const fallbackMessage = 'Verification failed, please try again.';
      if (err instanceof ZodError) {
        setRegistrationError(zodErrorsToString(err) || fallbackMessage);
      } else {
        setRegistrationError(fallbackMessage);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout title="Welcome to Road Rules" className="relative">
      <form
        onSubmit={form.onSubmit(handleSubmit)}
        className="flex flex-col justify-start items-stretch"
      >
        <LoadingOverlay visible={isLoading} />

        <Stepper
          active={active}
          onStepClick={setActive}
          size="xs"
          radius="md"
          style={{ overflowX: 'auto' }}
          // breakpoint="md"
          // size="md"
        >
          <Stepper.Step
            label="Enter Details"
            className="h-min-full"
            // allowStepSelect={active > 0}
            allowStepSelect={!loading}
          >
            <VerificationOne
              form={form}
              toNextStep={nextStep}
              provinceOptions={provinceOptions}
              countryOptions={countryOptions}
              defaultCountryId={countryId}
              onCountryChange={onCountryChange}
            />
          </Stepper.Step>
          <Stepper.Step
            label="Send Code"
            // allowStepSelect={active > 1}
            allowStepSelect={!loading}
          >
            <VerificationTwo
              form={form}
              sendCode={sendCode}
              loading={loading}
              error={sendCodeError}
            />
          </Stepper.Step>
          <Stepper.Step
            label="Verify Number"
            // allowStepSelect={active > 2}
            allowStepSelect={!loading}
          >
            <VerificationThree
              form={form}
              loading={loading}
              error={registrationError}
              toSendCode={toSendCode}
              sendCode={sendCode}
            />
          </Stepper.Step>
        </Stepper>

        <div className="flex flex-col justify-center items-stretch pt-4">
          <Link passHref href="/sign-in">
            <Button variant="light" role="button" size="md">
              Already have an account? Click to sign in!
            </Button>
          </Link>
        </div>

        {isError && <ErrorAlert error={error.message} />}
      </form>
    </Layout>
  );
}
