import { Autocomplete, Button, TextInput } from "@mantine/core";
import { useColors } from "../hooks/useColors";

interface VerificationTwoProps {
  toNextStep: () => void;
}

export function VerificationTwo ( props: VerificationTwoProps ) {

  const { toNextStep } = props;

  const { primary } = useColors();

  const countries = [
    "Zimbabwe",
    "Zambia",
    "South Africa"
  ];

  return (
    <div className="flex flex-col justify-center items-stretch pt-8">

      <div className="flex flex-col justify-center items-center">
        <span className="font-bold text-lg text-center py-2">
          Send Verification Code
        </span>
      </div>

      <span className="text-sm text-center py-2">
        We will send an SMS to verify your phone number.<br />
        Enter your country code and phone number.
      </span>

      <div className="flex flex-col justify-center items-stretch py-4">
        <Autocomplete
          label="Country"
          placeholder="Pick Country"
          data={countries}
        />
      </div>

      <div className="flex flex-col justify-center items-stretch py-4">
        <TextInput
          placeholder="+263 77 777 7777"
          label="Phone Number"
        />
      </div>

      <div className="flex flex-col justify-center items-stretch pt-8">
        <Button
          onClick={toNextStep}
          style={{ backgroundColor: primary }}
        >
          PROCEED
        </Button>
      </div>

    </div>
  )

}