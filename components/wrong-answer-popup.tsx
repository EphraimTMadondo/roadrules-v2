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
      <div className="flex flex-col justify-center items-stretch py-4">
        <span className="text-md py-2 font-bold text-center">
          {question.text}
        </span>
        <div className="flex flex-row justify-center items-center py-2">
          <span className="text-lg font-semibold p-2 text-center text-red-500">
            Wrong!
          </span>
          <i
            className="p-2 material-icons text-red-500"
            style={{ fontSize: '56', width: 56 }}
          >
            cancel_outline
          </i>
        </div>
        <span className="text-md pb-2 text-center">The correct answer is</span>
        <ResponseComponent question={question} correct={false} />
      </div>
      <div className="flex flex-col justify-center items-stretch pt-4">
        <Button onClick={buttonOnClick} size="md">
          {buttonCaption}
        </Button>
      </div>
    </Modal>
  );
}
