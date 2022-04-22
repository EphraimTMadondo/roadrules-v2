import { Button, Select, SelectItem, TextInput } from '@mantine/core';
import { UseForm } from '@mantine/hooks/lib/use-form/use-form';
import { Inputs } from '../lib/verification';

interface VerificationOneProps {
  toNextStep: () => void;
  countryOptions: SelectItem[];
  defaultCountryId: number | undefined;
  provinceOptions: SelectItem[];
  form: UseForm<Inputs>;
  onCountryChange: (event: any) => void;
}

export function VerificationOne(props: VerificationOneProps) {
  const {
    toNextStep,
    countryOptions,
    defaultCountryId,
    provinceOptions,
    form,
    onCountryChange,
  } = props;

  return (
    <div className="flex flex-col justify-center items-stretch pt-2">
      <div className="flex flex-col justify-center items-center">
        <span className="font-bold text-lg text-center py-2">
          Create Account
        </span>
      </div>

      <span className="text-sm text-center pb-2">
        Please provide the following details
      </span>

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
          onChange={onCountryChange}
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
        <Button onClick={toNextStep}>PROCEED</Button>
      </div>
    </div>
  );
}
