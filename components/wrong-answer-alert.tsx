import { Question } from '@prisma/client';
import { ResponseComponent } from './response';

interface Props {
  question: Question;
  correct: boolean;
}

export function WrongAnswerAlert(props: Props) {
  const { question, correct } = props;

  return (
    <div className="flex flex-col justify-center items-center py-4">
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
      <span className="text-md pb-4 text-center">The correct answer is</span>
      <ResponseComponent question={question} correct={correct} />
    </div>
  );
}
