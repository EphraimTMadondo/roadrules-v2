import { Button, LoadingOverlay, NumberInput } from '@mantine/core';
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
    <div className="flex flex-col justify-center items-stretch pt-8 relative">
      <LoadingOverlay visible={loading} />

      <div className="flex flex-col justify-center items-center">
        <span className="font-bold text-lg text-center py-2">
          Verify your phone number
        </span>
      </div>

      <span className="text-sm text-center py-2">
        Please enter the code you received to verify your credentials.
      </span>

      {error && <ErrorAlert error={error} />}

      <div className="flex flex-col justify-center items-stretch py-4">
        <NumberInput
          hideControls
          label="Code"
          inputMode="numeric"
          autoComplete="one-time-code"
          pattern="\d{6}"
          {...form.getInputProps('code')}
          required
        />
      </div>

      <div className="flex flex-col justify-center items-stretch pt-4 pb-8">
        <Button type="submit" size="md">
          VERIFY
        </Button>
      </div>

      <div className="flex flex-col justify-center items-stretch py-4">
        <Button
          variant="light"
          size="md"
          leftIcon={<i className="material-icons">mail</i>}
          onClick={sendCode}
        >
          Resend Code
        </Button>
      </div>

      <div className="flex flex-col justify-center items-stretch py-4">
        <Button
          variant="light"
          size="md"
          leftIcon={<i className="material-icons">edit</i>}
          onClick={toSendCode}
        >
          Change Number
        </Button>
      </div>

      <div className="flex flex-col justify-center items-stretch py-4">
        <Button
          variant="light"
          size="md"
          leftIcon={<i className="material-icons">help</i>}
        >
          Help
        </Button>
      </div>
    </div>
  );
}
