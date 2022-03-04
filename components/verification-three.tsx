import { Button, LoadingOverlay, NumberInput } from "@mantine/core";
import { UseForm } from "@mantine/hooks/lib/use-form/use-form";
import { Inputs } from "../pages/verification";
import { ErrorAlert } from "./error-alert";

interface VerificationThreeProps {
  form: UseForm<Inputs>;
  sendingCode: boolean;
  verifying: boolean;
  error?: string;
}

export function VerificationThree ( props: VerificationThreeProps ) {

  const { form, sendingCode, verifying, error } = props;

  return (
    <div className="flex flex-col justify-center items-stretch pt-8 relative">

      <LoadingOverlay visible={sendingCode || verifying} />

      <div className="flex flex-col justify-center items-center">
        <span className="font-bold text-lg text-center py-2">
          Verify your phone number
        </span>
      </div>

      <span className="text-sm text-center py-2">
        This may take a few minutes.<br />
        Enter the code you received to verify your credentials.
      </span>

      {
        error &&
        <ErrorAlert error={error} />
      }

      <div className="flex flex-col justify-center items-stretch py-4">
        <NumberInput
          hideControls
          label="Code"
          {...form.getInputProps( "code" )}
          required
        />
      </div>

      <div className="flex flex-col justify-center items-stretch pt-4 pb-8">
        <Button type="submit" size="md">
          VERIFY
        </Button>
      </div>

      <div className="flex flex-col justify-center items-stretch py-4">
        <Button variant="light" leftIcon={<i className="material-icons">mail</i>}>
          Resend Code
        </Button>
      </div>

      <div className="flex flex-col justify-center items-stretch py-4">
        <Button variant="light" leftIcon={<i className="material-icons">edit</i>}>
          Change Number
        </Button>
      </div>

      <div className="flex flex-col justify-center items-stretch py-4">
        <Button variant="light" leftIcon={<i className="material-icons">help</i>}>
          Help
        </Button>
      </div>

    </div>
  )

}