import { Question } from '@prisma/client';
import { OptionId } from '../lib/questions-client-logic';
import { ABC } from './abc';
import { OptionContent } from './option-content';

interface Props {
  question: Question;
  selectedOption: OptionId;
}

export function WrongAlert(props: Props) {
  const { question, selectedOption } = props;
  return (
    <div className="flex flex-col justify-center items-stretch my-4 bg-red-100/50 rounded">
      <div className="flex flex-row justify-center items-center pt-2 pb-2 px-4">
        <span className="text-lg font-semibold pr-1 text-center text-red-700">
          Wrong
        </span>
      </div>
      <div className="flex flex-row justify-center items-center px-4">
        <span className="text-md font-semibold pb-2 text-center">
          <ABC optionId={selectedOption} />
          .&nbsp;
          <OptionContent optionId={selectedOption} question={question} />
        </span>
      </div>
    </div>
  );
}
