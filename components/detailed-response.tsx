import { Question } from '@prisma/client';
import { OptionId } from '../lib/questions-client-logic';
import { AnswerExplanation } from './answer-explanation';
import { CorrectAlert } from './correct-alert';
import { Correction } from './correction';
import { QuestionTitle } from './question-title';
import { SelectOption } from './select-option';
import { SelectOptionContainer } from './select-option-container';
import { StandardImage } from './standard-image';
import { WrongAlert } from './wrong-alert';

interface DetailedResponseProps {
  key: string;
  question: Question;
  questionNumber: number;
  numQuestions: number;

  selectedOption: OptionId | undefined;
  correct: boolean;
}

export default function DetailedResponse(props: DetailedResponseProps) {
  const { key, question, questionNumber, numQuestions } = props;
  const { selectedOption, correct } = props;

  return (
    <div key={key}>
      <QuestionTitle
        questionNumber={questionNumber}
        numQuestions={numQuestions}
        title={question.text}
      />

      {question.image && (
        <StandardImage
          src={question.image}
          alt="Question illustration"
          layout="fill"
          objectFit="contain"
          // objectFit="scale-down"
        />
      )}

      <SelectOptionContainer>
        <SelectOption
          id="A"
          content={question.option1}
          selected={selectedOption === 'option1'}
          disabled
          wrong={!correct && selectedOption === 'option1'}
        />
      </SelectOptionContainer>

      <SelectOptionContainer>
        <SelectOption
          id="B"
          content={question.option2}
          selected={selectedOption === 'option2'}
          disabled
          wrong={!correct && selectedOption === 'option2'}
        />
      </SelectOptionContainer>

      <SelectOptionContainer>
        <SelectOption
          id="C"
          content={question.option3}
          selected={selectedOption === 'option3'}
          disabled
          wrong={!correct && selectedOption === 'option3'}
        />
      </SelectOptionContainer>

      {correct && selectedOption && (
        <div className="flex flex-col justify-center items-stretch py-4">
          <CorrectAlert />
          <div className="flex flex-col justify-center items-stretch p-4 border border-solid rounded border-teal-600">
            <AnswerExplanation question={question} />
          </div>
        </div>
      )}

      {!correct && selectedOption && (
        <div className="flex flex-col justify-center items-stretch py-4">
          <WrongAlert selectedOption={selectedOption} question={question} />
          <div className="flex flex-col justify-center items-stretch p-4 border border-solid rounded border-teal-600">
            <Correction question={question} />
          </div>
        </div>
      )}
    </div>
  );
}
