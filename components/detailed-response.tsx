import { Question } from '@prisma/client';
import { SelectOption } from './select-option';
import { OptionId } from '../lib/questions-client-logic';
import { CorrectAnswerAlert } from './correct-answer-alert';
import { QuestionTitle } from './question-title';
import { SelectOptionContainer } from './select-option-container';
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
          objectFit="scale-down"
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

      {correct && <CorrectAnswerAlert />}

      {!correct && <WrongAnswerAlert question={question} correct />}
    </div>
  );
}
