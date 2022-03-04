import { Question } from "@prisma/client";
import { OptionId } from "../lib/questions-client-logic";
import { red_border, teal_border } from "../lib/tailwind-utils";
import { ABC } from "./abc";
import { OptionContent } from "./option-content";

interface Props {
  question: Question;
  correct: boolean;
  showIcon?: boolean;
}

export function ResponseComponent ( props: Props ) {

  const { question, correct, showIcon } = props;

  const border = correct ?
    teal_border :
    red_border;

  return (
    <div className={`flex flex-col justify-center items-stretch p-4 ${ border }`}>
      <div className="flex flex-row justify-start items-center">
        {
          showIcon &&
          <div className="flex flex-col justify-center items-center p-4">
            {
              correct &&
              <i className="material-icons text-teal-600">
                check_circle
              </i>
            }
            {
              !correct &&
              <i className="material-icons text-red-600">
                cancel
              </i>
            }
          </div>
        }
        <div className="flex grow flex-col justify-start items-start">
          <span className="text-md font-semibold py-2">
            <ABC
              optionId={question.correctOption as OptionId}
            />
            .&nbsp;
            <OptionContent
              optionId={question.correctOption as OptionId}
              question={question}
            />
          </span>
          <span className="text-md py-2">
            {question.explanation}
          </span>
        </div>
      </div>
    </div>
  )

}