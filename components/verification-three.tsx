import { Button, NumberInput } from "@mantine/core";

interface VerificationThreeProps {
  toNextStep: () => void;
}

export function VerificationThree ( props: VerificationThreeProps ) {

  const { toNextStep } = props;
  
  return (
    <div className="flex flex-col justify-center items-stretch pt-8">

      <div className="flex flex-col justify-center items-center">
        <span className="font-bold text-lg text-center py-2">
          Verify your phone number
        </span>
      </div>

      <span className="text-sm text-center py-2">
        This may take a few minutes.<br />
        Enter the code you received to verify your credentials.
      </span>

      <div className="flex flex-col justify-center items-stretch py-4">
        <NumberInput
          hideControls
          label="Code"
        />
      </div>

      <div className="flex flex-col justify-center items-stretch pt-4 pb-8">
        <Button onClick={toNextStep} size="md">
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