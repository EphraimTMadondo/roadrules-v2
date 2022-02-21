import { Button, TextInput } from "@mantine/core";

interface VerificationOneProps {
  toNextStep: () => void;
}

export function VerificationOne ( props: VerificationOneProps ) {

  const { toNextStep } = props;

  return (
    <div className="flex flex-col justify-center items-stretch pt-8">

      <div className="flex flex-col justify-center items-center">
        <span className="font-bold text-lg text-center py-2">
          Provide the following details
        </span>
      </div>

      <div className="flex flex-col justify-center items-stretch py-2">
        <TextInput
          placeholder="First Name"
          label="First Name"
        />
      </div>

      <div className="flex flex-col justify-center items-stretch py-2">
        <TextInput
          placeholder="Last Name"
          label="Last Name"
        />
      </div>

      <div className="flex flex-col justify-center items-stretch py-2">
        <TextInput
          placeholder="Gender"
          label="Gender"
        />
      </div>

      <div className="flex flex-col justify-center items-stretch py-2">
        <TextInput
          placeholder="Province"
          label="Province"
        />
      </div>

      <div className="flex flex-col justify-center items-stretch py-2">
        <TextInput
          placeholder="Phone Number"
          label="Phone Number"
        />
      </div>

      <div className="grow"></div>

      <div className="flex flex-col justify-center items-stretch pt-12">
        <Button onClick={toNextStep} size="md">
          PROCEED
        </Button>
      </div>

    </div>
  )

}