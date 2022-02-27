import { Question } from "@prisma/client";
import { ResponseComponent } from "./response";

interface Props {
  question: Question;
  correct: boolean;
}

export function WrongAnswerAlert ( props: Props ) {

  const { question, correct } = props;

  return (
    <div className="flex flex-col justify-center items-center py-4">
      <span className="text-md py-2 text-center text-red-500">
        Oops, you got that one wrong.
      </span>
      <span className="text-md py-1 text-center">
        The correct answer is
      </span>
      <ResponseComponent
        question={question}
        correct={correct}
      />
    </div>
  )

}