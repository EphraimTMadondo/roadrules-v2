import { Button, Select, TextInput } from '@mantine/core';
import { UseForm } from '@mantine/hooks/lib/use-form/use-form';
import { Inputs } from '../lib/verification';

interface VerificationOneProps {
  toNextStep: () => void;
  form: UseForm<Inputs>;
}

export function VerificationOne(props: VerificationOneProps) {
  const { toNextStep, form } = props;

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
          data={['Male', 'Femail']}
          {...form.getInputProps('gender')}
          required
        />
      </div>

      <div className="flex flex-col justify-center items-stretch py-2">
        <TextInput
          placeholder="Province"
          label="Province"
          {...form.getInputProps('province')}
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
