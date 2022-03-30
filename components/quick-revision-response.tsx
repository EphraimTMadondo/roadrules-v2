import { Question } from '@prisma/client';
import { OptionId } from '../lib/questions-client-logic';
import { ABC } from './abc';
import { Correction } from './correction';
import { OptionContent } from './option-content';

interface Props {
  question: Question;
  correct: boolean;
  selectedOption: OptionId;
}

export function QuickRevisionResponse(props: Props) {
  const { question, selectedOption, correct } = props;

  const redBorder = 'border border-solid rounded border-red-600';
  const tealBorder = 'border border-solid rounded border-teal-600';

  const border = correct ? tealBorder : redBorder;

  return (
    <div className={`flex flex-col justify-center items-stretch p-4 ${border}`}>
      <div className="flex grow flex-col justify-start items-stretch">
        <span className="text-md py-2 pl-14 font-semibold">
          {question.text}
        </span>

        <div
          className={`flex flex-row justify-start items-center rounded-md ${
            correct ? 'bg-teal-100/50' : 'bg-red-100/50'
          }`}
        >
          <div className="flex flex-col justify-center items-center p-4">
            {correct && (
              <i className="material-icons text-teal-600">check_circle</i>
            )}
            {!correct && <i className="material-icons text-red-600">cancel</i>}
          </div>
          <span className="text-md font-semibold py-4">
            <ABC optionId={selectedOption} />
            .&nbsp;
            <OptionContent optionId={selectedOption} question={question} />
          </span>
        </div>

        {!correct && (
          <div className="flex flex-col justify-start items-stretch pl-14 pt-4">
            <Correction question={question} />
          </div>
        )}

        {correct && (
          <span className="text-md py-2 pl-14">{question.explanation}</span>
        )}
      </div>
    </div>
  );
}
