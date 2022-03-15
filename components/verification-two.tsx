import { Button, TextInput } from '@mantine/core';
import { UseForm } from '@mantine/hooks/lib/use-form/use-form';
import { Inputs } from '../lib/verification';
import { ErrorAlert } from './error-alert';

interface VerificationTwoProps {
  form: UseForm<Inputs>;
  sendCode: () => void;
  loading: boolean;
  error: string;
}

export function VerificationTwo(props: VerificationTwoProps) {
  const { form, loading, sendCode, error } = props;

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

      {error && <ErrorAlert error={error} />}

      <div className="flex flex-col justify-center items-stretch pt-8">
        <Button
          onClick={sendCode}
          size="md"
          disabled={loading}
          loading={loading}
        >
          {!loading && 'SEND CODE'}
          {loading && 'PROCESSING...'}
        </Button>
      </div>
    </div>
  );
}
