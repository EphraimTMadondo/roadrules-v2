import { Button, Modal } from '@mantine/core';
import { Question } from '@prisma/client';
import { ResponseComponent } from './response';

interface Props {
  buttonCaption: string;
  buttonOnClick: () => any;
  question: Question;
}

export function CorrectAnswerPopup(props: Props) {
  const { buttonCaption, buttonOnClick, question } = props;
  return (
    <Modal opened onClose={buttonOnClick} title="Feedback">
      <div className="flex flex-col justify-center items-stretch">
        <span className="text-md py-2 font-bold text-center">
          {question.text}
        </span>
        <div className="flex flex-row justify-center items-center py-2">
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
        <ResponseComponent question={question} correct />
        <div className="flex flex-col justify-center items-stretch pt-4">
          <Button onClick={buttonOnClick} size="md">
            {buttonCaption}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
