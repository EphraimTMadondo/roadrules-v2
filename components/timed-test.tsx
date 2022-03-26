import { Question } from '@prisma/client';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import { OptionId } from '../lib/questions-client-logic';
import { trpc } from '../utils/trpc';
import { ErrorAlert } from './error-alert';
import TimedQuestion from './timed-question';

interface Props {
  initialQuestions: Question[];
  batchIdentifier: string;
  loadingError?: string;
}

interface CustomQuestion extends Question {
  questionNumber: number;
}

export default function TimedTestComponent(props: Props) {
  const { initialQuestions, batchIdentifier, loadingError } = props;

  const [questions, setQuestions] = useState<CustomQuestion[]>(
    initialQuestions.map((initialQuestion) => ({
      ...initialQuestion,
      questionNumber: initialQuestions.indexOf(initialQuestion) + 1,
    }))
  );

  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  console.log(isLoading);

  const mutation = trpc.useMutation('response.create', {
    onMutate: () => {
      setIsLoading(true);
      setError('');
    },
    onError: ({ message }: { message: string }) => {
      setError(message || '');
    },
    onSuccess: () => {},
    onSettled: () => {
      setIsLoading(false);
    },
  });

  const question = questions.length ? questions[0] : undefined;

  const processResponse = useCallback(
    (inputQuestion: Question, selectedOption: OptionId) => {
      mutation.mutate({
        questionId: inputQuestion.id,
        choice: selectedOption,
        batchIdentifier,
      });
    },
    [mutation, batchIdentifier]
  );

  const nextQuestion = useCallback(
    (inputQuestion: Question) => {
      if (questions.length === 1) {
        return router.push('/progress?lastBatch=lastBatch');
      }

      setQuestions((prevState) =>
        prevState.filter((el) => el.id !== inputQuestion.id)
      );
    },
    [questions, router, setQuestions]
  );

  return (
    <>
      {loadingError && (
        <div className="flex flex-col justify-start items-stretch pt-4">
          <ErrorAlert error={loadingError} />
        </div>
      )}
      {question && (
        <TimedQuestion
          key={question.id}
          question={question}
          questionNumber={question.questionNumber}
          numQuestions={initialQuestions.length}
          processResponse={processResponse}
          nextQuestion={nextQuestion}
          error={error}
        />
      )}
    </>
  );
}
