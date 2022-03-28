import { Question } from '@prisma/client';
import { OptionId } from '../lib/questions-client-logic';
import { ResponseComponent } from './response';

interface Props {
  question: Question;
  selectedOption: OptionId;
}

export function CorrectAnswerAlert(props: Props) {
  const { question, selectedOption } = props;
  return (
    <div className="flex flex-col justify-center items-stretch">
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
      <ResponseComponent
        selectedOption={selectedOption}
        question={question}
        correct
      />
    </div>
  );
}
