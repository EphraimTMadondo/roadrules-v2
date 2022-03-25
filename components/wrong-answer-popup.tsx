import { Button, Modal } from '@mantine/core';
import { Question } from '@prisma/client';
import { ResponseComponent } from './response';

interface Props {
  buttonCaption: string;
  buttonOnClick: () => any;
  question: Question;
  correct: boolean;
}

export function WrongAnswerPopup(props: Props) {
  const { buttonCaption, buttonOnClick, question, correct } = props;
  return (
    <Modal opened onClose={buttonOnClick} title="Feedback">
      <div className="flex flex-col justify-center items-center py-4">
        <span className="text-md py-2 text-center text-red-500">
          Oops, you got that one wrong.
        </span>
        <span className="text-md py-1 text-center">The correct answer is</span>
        <ResponseComponent question={question} correct={correct} />
      </div>
      <div className="flex flex-col justify-center items-stretch pt-4">
        <Button onClick={buttonOnClick} size="md">
          {buttonCaption}
        </Button>
      </div>
    </Modal>
  );
}
