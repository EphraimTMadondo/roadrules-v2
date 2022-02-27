import { Question } from '@prisma/client';
import { SelectOption } from '../components/select-option';
import { OptionId } from '../lib/questions-client-logic';
import { CorrectAnswerAlert } from './correct-answer-alert';
import { QuestionTitle } from './question-title';
import { StandardImage } from './standard-image';
import { WrongAnswerAlert } from './wrong-answer-alert';

interface DetailedResponseProps {
  key: string;
  question: Question;
  questionNumber: number;
  numQuestions: number;

  selectedOption: OptionId | undefined;
  correct: boolean;
}

export default function DetailedResponse ( props: DetailedResponseProps ) {

  const { question, questionNumber, numQuestions } = props;
  const { selectedOption, correct } = props;

  return (
    <>
      <QuestionTitle
        questionNumber={questionNumber}
        numQuestions={numQuestions}
        title={question.text}
      />

      {
        question.image &&
        <StandardImage
          src={question.image}
          alt="Question illustration"
          layout="fill"
          objectFit="scale-down"
        />
      }

      <div className="flex flex-col justify-center items-stretch py-2">
        <SelectOption
          id="A"
          content={question.option1}
          selected={selectedOption === "option1"}
          disabled={true}
          wrong={!correct && selectedOption === "option1"}
        />
      </div>

      <div className="flex flex-col justify-center items-stretch py-2">
        <SelectOption
          id="B"
          content={question.option2}
          selected={selectedOption === "option2"}
          disabled={true}
          wrong={!correct && selectedOption === "option2"}
        />
      </div>

      <div className="flex flex-col justify-center items-stretch py-2">
        <SelectOption
          id="C"
          content={question.option3}
          selected={selectedOption === "option3"}
          disabled={true}
          wrong={!correct && selectedOption === "option3"}
        />
      </div>

      {
        correct &&
        <CorrectAnswerAlert />
      }

      {
        !correct &&
        <WrongAnswerAlert
          question={question}
          correct={true}
        />
      }

    </>
  )

}
