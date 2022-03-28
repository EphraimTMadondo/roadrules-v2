import { Button, Modal } from '@mantine/core';
import { Question } from '@prisma/client';
import { OptionId } from '../lib/questions-client-logic';
import { ABC } from './abc';
import { OptionContent } from './option-content';
import { ResponseComponent } from './response';

interface Props {
  buttonCaption: string;
  buttonOnClick: () => any;
  question: Question;
  selectedOption: OptionId;
}

export function WrongAnswerPopup(props: Props) {
  const { buttonCaption, buttonOnClick, question, selectedOption } = props;
  return (
    <Modal opened onClose={buttonOnClick} title="Feedback">
      <div className="flex flex-col justify-center items-stretch py-4">
        <span className="text-md py-2 font-bold text-center">
          {question.text}
        </span>
        <div className="flex flex-col justify-center items-stretch my-4 bg-red-100 rounded">
          <div className="flex flex-row justify-start items-center pt-2 px-4">
            <span className="text-lg font-semibold pr-1 text-center text-red-500">
              Wrong!
            </span>
            <i
              className="pl-1 material-icons text-red-500"
              style={{ fontSize: '56', width: 56 }}
            >
              cancel_outline
            </i>
          </div>
          <div className="flex flex-row justify-start items-center px-4">
            <span className="text-md font-semibold pb-2">
              <ABC optionId={selectedOption} />
              .&nbsp;
              <OptionContent optionId={selectedOption} question={question} />
            </span>
          </div>
        </div>
        <span className="text-md pb-2 text-center">The correct answer is</span>
        <ResponseComponent
          selectedOption={selectedOption}
          question={question}
          correct
        />
      </div>
      <div className="flex flex-col justify-center items-stretch pt-4">
        <Button onClick={buttonOnClick} size="md">
          {buttonCaption}
        </Button>
      </div>
    </Modal>
  );
}
