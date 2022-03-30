import { Question } from '@prisma/client';
import { AnswerExplanation } from './answer-explanation';

interface Props {
  question: Question;
}

export function Correction(props: Props) {
  const { question } = props;

  return (
    <div className="flex flex-col justify-start items-stretch">
      <span className="text-md pb-2">The correct answer is</span>
      <AnswerExplanation question={question} />
    </div>
  );
}
