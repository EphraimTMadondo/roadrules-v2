import { Button, Modal } from '@mantine/core';
import { Question } from '@prisma/client';
import { AnswerExplanation } from './answer-explanation';
import { CorrectAlert } from './correct-alert';

interface Props {
  opened: boolean;
  buttonCaption: string;
  buttonOnClick: () => any;
  question: Question;
}

export function CorrectAnswerPopup(props: Props) {
  const { opened, buttonCaption, buttonOnClick, question } = props;
  return (
    <Modal
      opened={opened}
      // centered
      onClose={buttonOnClick}
      withCloseButton={false}
      overlayOpacity={0}
    >
      <div className="flex flex-col justify-center items-stretch">
        <span className="text-md py-2 font-bold text-center">
          {question.text}
        </span>
        <CorrectAlert />
        <div className="flex flex-col justify-center items-stretch p-4 border border-solid rounded border-green-600">
          <AnswerExplanation question={question} />
        </div>
        <div className="flex flex-col justify-center items-stretch pt-8">
          <Button onClick={buttonOnClick}>{buttonCaption}</Button>
        </div>
      </div>
    </Modal>
  );
}
