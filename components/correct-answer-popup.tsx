import { Button, Modal } from '@mantine/core';

interface Props {
  buttonCaption: string;
  buttonOnClick: () => any;
}

export function CorrectAnswerPopup(props: Props) {
  const { buttonCaption, buttonOnClick } = props;
  return (
    <Modal opened onClose={buttonOnClick} title="Feedback">
      <div className="flex flex-row justify-center items-center py-8 bg-teal-50">
        <span className="text-lg font-semibold p-2 text-center text-teal-500">
          Correct!
        </span>
        <i
          className="p-2 material-icons text-teal-500"
          style={{ fontSize: '56' }}
        >
          check_circle
        </i>
      </div>
      <div className="flex flex-col justify-center items-stretch pt-4">
        <Button onClick={buttonOnClick} size="md">
          {buttonCaption}
        </Button>
      </div>
    </Modal>
  );
}
