import { Question } from '@prisma/client';
import { ResponseComponent } from './response';

interface Props {
  question: Question;
}

export function CorrectAnswerAlert(props: Props) {
  const { question } = props;
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
      <ResponseComponent question={question} correct />
    </div>
  );
}
