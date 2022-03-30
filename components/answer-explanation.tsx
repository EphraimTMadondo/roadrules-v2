import { Question } from '@prisma/client';
import { OptionId } from '../lib/questions-client-logic';
import { ABC } from './abc';
import { OptionContent } from './option-content';

interface Props {
  question: Question;
}

export function AnswerExplanation(props: Props) {
  const { question } = props;

  return (
    <div className="flex flex-col justify-start items-start">
      <span className="text-md font-semibold">
        <ABC optionId={question.correctOption as OptionId} />
        .&nbsp;
        <OptionContent
          optionId={question.correctOption as OptionId}
          question={question}
        />
      </span>
      <span className="text-md py-2">{question.explanation}</span>
    </div>
  );
}
