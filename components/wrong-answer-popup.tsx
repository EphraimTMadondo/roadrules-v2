import { Button, Modal } from '@mantine/core';
import { Question } from '@prisma/client';
import { OptionId } from '../lib/questions-client-logic';
import { Correction } from './correction';
import { WrongAlert } from './wrong-alert';

interface Props {
  opened: boolean;
  buttonCaption: string;
  buttonOnClick: () => any;
  question: Question;
  selectedOption: OptionId;
}

export function WrongAnswerPopup(props: Props) {
  const { opened, buttonCaption, buttonOnClick, question, selectedOption } =
    props;
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
        <WrongAlert selectedOption={selectedOption} question={question} />
        <div className="flex flex-col justify-center items-stretch p-4 border border-solid rounded border-green-600">
          <Correction question={question} />
        </div>
      </div>
      <div className="flex flex-col justify-center items-stretch pt-8">
        <Button onClick={buttonOnClick}>{buttonCaption}</Button>
      </div>
    </Modal>
  );
}
