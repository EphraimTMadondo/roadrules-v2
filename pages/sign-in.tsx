import {
  Button,
  LoadingOverlay,
  PasswordInput,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/hooks';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import { EyeCheck, EyeOff } from 'tabler-icons-react';
import { ZodError } from 'zod';
import { ErrorAlert } from '../components/error-alert';
import Layout from '../components/layout';
import { Toolbar } from '../components/toolbar';
import { capitalize } from '../lib/strings';
import { SignIn, SignInSchema } from '../lib/user-schemas';
import { customErrorMap, zodErrorsToString } from '../lib/zod-utils';
import { trpc } from '../utils/trpc';

interface Inputs {
  phoneNumber: string;
  pin: string;
}

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const router = useRouter();

  const toMainMenu = useCallback(() => {
    router.push('/main-menu');
  }, [router]);

  const form = useForm<Inputs>({
    initialValues: {
      phoneNumber: '',
      pin: '',
    },
    errorMessages: {
      phoneNumber: 'Please enter your phone number.',
      pin: 'Please enter your pin.',
    },
  });

  const mutation = trpc.useMutation('user.signIn', {
    onMutate: () => {
      setIsLoading(true);
      setError('');
    },
    onError: ({ message }: { message: string }) => {
      setError(capitalize(message));
    },
    onSuccess: () => {
      toMainMenu();
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  function handleSubmit(data: Inputs) {
    try {
      setIsLoading(true);
      setError('');

      const details: SignIn = {
        phoneNumber: data.phoneNumber,
        pin: data.pin,
      };

      SignInSchema.parse(details, { errorMap: customErrorMap });
      mutation.mutate(details);
    } catch (err) {
      const fallbackMessage = 'Sign in failed, please try again.';
      if (err instanceof ZodError) {
        setError(zodErrorsToString(err) || fallbackMessage);
      } else {
        setError(fallbackMessage);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Layout title="Sign In" className="relative">
      <Toolbar title="Sign In" />

      <form
        onSubmit={form.onSubmit(handleSubmit)}
        className="flex flex-col justify-start items-stretch pt-4"
      >
        <LoadingOverlay visible={isLoading} />

        <div className="flex flex-col justify-center items-stretch py-4">
          <TextInput
            placeholder="+263 77 777 7777"
            label="Phone Number"
            {...form.getInputProps('phoneNumber')}
            required
          />
        </div>

        <div className="flex flex-col justify-center items-stretch py-4">
          <PasswordInput
            label="Pin (4 digits)"
            placeholder="Enter your pin (4 digits)"
            // eslint-disable-next-line react/no-unstable-nested-components
            visibilityToggleIcon={({ reveal, size }) =>
              reveal ? <EyeOff size={size} /> : <EyeCheck size={size} />
            }
            {...form.getInputProps('pin')}
            inputMode="numeric"
            autoComplete="pin"
            pattern="\d{4}"
            required
          />
        </div>

        {error && <ErrorAlert error={error} />}

        <div className="flex flex-col justify-center items-stretch pt-8">
          <Button
            type="submit"
            size="md"
            disabled={isLoading}
            loading={isLoading}
          >
            {!isLoading && 'SIGN IN'}
            {isLoading && 'PROCESSING...'}
          </Button>
        </div>

        <div className="flex flex-col justify-center items-stretch pt-4">
          <Link passHref href="/terms-and-conditions">
            <Button variant="light" role="button" size="md">
              <span className="flex sm:hidden">CREATE ACCOUNT</span>
              <span className="hidden sm:inline-flex">
                Don't have an account? Click to register
              </span>
            </Button>
          </Link>
        </div>
      </form>
    </Layout>
  );
}
