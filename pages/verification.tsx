import { LoadingOverlay, Stepper } from '@mantine/core';
import { useForm } from '@mantine/hooks';
import { useNotifications } from '@mantine/notifications';
import { useCallback, useState } from 'react';
import { ErrorAlert } from '../components/error-alert';
import Layout from '../components/layout';
import { VerificationOne } from '../components/verification-one';
import { VerificationThree } from '../components/verification-three';
import { VerificationTwo } from '../components/verification-two';
import { capitalize } from '../lib/strings';
import { Inputs } from '../lib/verification';
import { trpc } from '../utils/trpc';

export default function Verification() {
  const [active, setActive] = useState(0);

  const [sendingCode, setSendingCode] = useState<boolean>(false);
  const [verifying, setVerifying] = useState<boolean>(false);
  const [registrationError, setRegistrationError] = useState<string>('');
  const [isRegistering, setIsRegistering] = useState(false);

  const notifications = useNotifications();

  const form = useForm<Inputs>({
    initialValues: {
      firstName: '',
      lastName: '',
      gender: 'Male',
      provinceId: 0,
      countryId: 0,
      phoneNumber: '',
      code: '',
    },
  });

  const {
    isLoading,
    error,
    isError,
    data: fetchedData,
  } = trpc.useQuery(['province.list']);

  const countries = fetchedData?.countries || [];

  const countryOptions = countries.map((country) => ({
    value: country.id.toString(),
    label: country.country,
  }));

  const countryId = form.values.countryId || countries[0]?.id || undefined;

  const provinceOptions = countryId
    ? (
        countries.find((country) => country.id === countryId)?.provinces || []
      ).map((province) => ({
        value: province.id.toString(),
        label: province.province,
      }))
    : [];

  const mutation = trpc.useMutation('user.create', {
    onMutate: () => {
      setIsRegistering(true);
      setRegistrationError('');
    },
    onError: ({ message }: { message: string }) => {
      setRegistrationError(capitalize(message));
    },
    onSuccess: () => {
      notifications.showNotification({
        message: 'Registration Complete!',
        color: 'teal',
        icon: <i className="material-icons">done</i>,
      });
    },
    onSettled: () => {
      setIsRegistering(false);
    },
  });

  const toSendCode = useCallback(() => {
    setActive(1);
  }, [setActive]);

  const nextStep = useCallback(
    () => setActive((current) => (current < 3 ? current + 1 : current)),
    [setActive]
  );

  async function handleSubmit(data: Inputs) {
    try {
      setVerifying(true);
      setRegistrationError('');

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const {
        confirmationResult,
      }: { confirmationResult: { confirm: (code: string) => any } } =
        window as any;

      if (confirmationResult) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        await confirmationResult.confirm(data.code);
        // register and push to main menu.
        mutation.mutate({
          firstName: data.firstName,
          lastName: data.lastName,
          gender: data.gender,
          phoneNumber: data.phoneNumber,
          provinceId: Number(data.provinceId),
        });
        // router.push( "/main-menu" );
      }
    } catch (err: any) {
      setRegistrationError('Verification failed, please try again.');
    } finally {
      setVerifying(false);
    }
  }

  return (
    <Layout title="Welcome to Road Rules" className="relative">
      <form
        onSubmit={form.onSubmit(handleSubmit)}
        className="flex flex-col justify-start items-stretch"
      >
        <LoadingOverlay visible={isLoading || isRegistering} />

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
            allowStepSelect={!sendingCode && !verifying}
          >
            <VerificationOne
              form={form}
              toNextStep={nextStep}
              provinceOptions={provinceOptions}
              countryOptions={countryOptions}
              defaultCountryId={countryId}
            />
          </Stepper.Step>
          <Stepper.Step
            label="Send Code"
            // allowStepSelect={active > 1}
            allowStepSelect={!sendingCode && !verifying}
          >
            <VerificationTwo
              toNextStep={nextStep}
              sendingCode={sendingCode}
              setSendingCode={setSendingCode}
              form={form}
            />
          </Stepper.Step>
          <Stepper.Step
            label="Verify Number"
            // allowStepSelect={active > 2}
            allowStepSelect={!sendingCode && !verifying}
          >
            <VerificationThree
              form={form}
              verifying={verifying}
              error={registrationError}
              toSendCode={toSendCode}
            />
          </Stepper.Step>
        </Stepper>

        {isError && <ErrorAlert error={error.message} />}
      </form>
    </Layout>
  );
}
