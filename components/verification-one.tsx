import { Button, Select, SelectItem, TextInput } from '@mantine/core';
import { UseForm } from '@mantine/hooks/lib/use-form/use-form';
import { Inputs } from '../lib/verification';

interface VerificationOneProps {
  toNextStep: () => void;
  countryOptions: SelectItem[];
  defaultCountryId: number | undefined;
  provinceOptions: SelectItem[];
  form: UseForm<Inputs>;
}

export function VerificationOne(props: VerificationOneProps) {
  const {
    toNextStep,
    countryOptions,
    defaultCountryId,
    provinceOptions,
    form,
  } = props;

  return (
    <div className="flex flex-col justify-center items-stretch pt-8">
      <div className="flex flex-col justify-center items-center">
        <span className="font-bold text-lg text-center pt-2 pb-4">
          Please provide the following details
        </span>
      </div>

      <div className="flex flex-col justify-center items-stretch py-2">
        <TextInput
          placeholder="First Name"
          label="First Name"
          {...form.getInputProps('firstName')}
          required
        />
      </div>

      <div className="flex flex-col justify-center items-stretch py-2">
        <TextInput
          placeholder="Last Name"
          label="Last Name"
          {...form.getInputProps('lastName')}
          required
        />
      </div>

      <div className="flex flex-col justify-center items-stretch py-2">
        <Select
          placeholder="Gender"
          label="Gender"
          data={['Male', 'Female']}
          {...form.getInputProps('gender')}
          required
        />
      </div>

      <div className="flex flex-col justify-center items-stretch py-4">
        <Select
          label="Country"
          placeholder="Pick Country"
          data={countryOptions}
          defaultValue={defaultCountryId?.toString()}
          {...form.getInputProps('countryId')}
          required
        />
      </div>

      <div className="flex flex-col justify-center items-stretch py-2">
        <Select
          placeholder="Province"
          label="Province"
          data={provinceOptions}
          {...form.getInputProps('provinceId')}
          required
        />
      </div>

      <div className="grow" />

      <div className="flex flex-col justify-center items-stretch pt-12">
        <Button onClick={toNextStep} size="md">
          PROCEED
        </Button>
      </div>
    </div>
  );
}
