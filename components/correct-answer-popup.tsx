import { Button, Modal } from '@mantine/core';
import { Question } from '@prisma/client';
import { AnswerExplanation } from './answer-explanation';
import { CorrectAlert } from './correct-alert';

interface Props {
  buttonCaption: string;
  buttonOnClick: () => any;
  question: Question;
}

export function CorrectAnswerPopup(props: Props) {
  const { buttonCaption, buttonOnClick, question } = props;
  return (
    <Modal opened centered onClose={buttonOnClick} title="Feedback">
      <div className="flex flex-col justify-center items-stretch">
        <span className="text-md py-2 font-bold text-center">
          {question.text}
        </span>
        <CorrectAlert />
        <div className="flex flex-col justify-center items-stretch p-4 border border-solid rounded border-teal-600">
          <AnswerExplanation question={question} />
        </div>
        <div className="flex flex-col justify-center items-stretch pt-4">
          <Button onClick={buttonOnClick} size="md">
            {buttonCaption}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
