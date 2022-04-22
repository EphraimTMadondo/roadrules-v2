import { Button, LoadingOverlay, TextInput } from '@mantine/core';
import { UseForm } from '@mantine/hooks/lib/use-form/use-form';
import { Inputs } from '../lib/verification';
import { ErrorAlert } from './error-alert';

interface VerificationThreeProps {
  form: UseForm<Inputs>;
  loading: boolean;
  error: string;
  toSendCode: () => void;
  sendCode: () => void;
}

export function VerificationThree(props: VerificationThreeProps) {
  const { form, loading, error, toSendCode, sendCode } = props;

  return (
    <div className="flex flex-col justify-center items-stretch pt-2 relative">
      <LoadingOverlay visible={loading} />

      <div className="flex flex-col justify-center items-center">
        <span className="font-bold text-lg text-center py-2">
          Verify Phone Number
        </span>
      </div>

      <span className="text-sm text-center pb-2">
        Please enter the code you received.
      </span>

      {error && <ErrorAlert error={error} />}

      <div className="flex flex-col justify-center items-stretch py-4">
        <TextInput
          placeholder="Code"
          label="Code"
          {...form.getInputProps('code')}
          required
        />
      </div>

      <div className="flex flex-col justify-center items-stretch pt-4 pb-8">
        <Button type="submit">VERIFY</Button>
      </div>

      <div className="flex flex-col justify-center items-stretch py-4">
        <Button
          variant="light"
          leftIcon={<i className="material-icons">mail</i>}
          onClick={sendCode}
        >
          Resend Code
        </Button>
      </div>

      <div className="flex flex-col justify-center items-stretch py-4">
        <Button
          variant="light"
          leftIcon={<i className="material-icons">edit</i>}
          onClick={toSendCode}
        >
          Change Number
        </Button>
      </div>

      <div className="flex flex-col justify-center items-stretch py-4">
        <Button
          variant="light"
          leftIcon={<i className="material-icons">help</i>}
        >
          Help
        </Button>
      </div>
    </div>
  );
}
