import { Alert } from '@mantine/core';

interface Props {
  error: string;
}

export function ErrorAlert(props: Props) {
  const { error } = props;

  return (
    <div className="flex flex-col justify-start items-stretch pt-4">
      <Alert
        color="red"
        title="Error"
        icon={<i className="material-icons">error</i>}
      >
        {error}
      </Alert>
    </div>
  );
}
