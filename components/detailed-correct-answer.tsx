import { Question } from '@prisma/client';
import { AnswerExplanation } from './answer-explanation';
import { CorrectAlert } from './correct-alert';

interface Props {
  question: Question;
}

export function DetailedCorrectAnswer(props: Props) {
  const { question } = props;

  return (
    <div className="flex flex-col justify-center items-stretch">
      <CorrectAlert />
      <div className="flex flex-col justify-center items-stretch p-4 border border-solid rounded border-green-600">
        <AnswerExplanation question={question} />
      </div>
    </div>
  );
}
