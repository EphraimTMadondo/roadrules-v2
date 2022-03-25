import { Question } from '@prisma/client';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import { ErrorAlert } from '../components/error-alert';
import Layout from '../components/layout';
import QuestionComponent from '../components/question';
import { Toolbar } from '../components/toolbar';
import { FALLBACK_ERROR_MESSAGE } from '../lib/errors';
import { createKey } from '../lib/keys';
import {
  createSSRPageProps,
  getDataFromPageProps,
  PageProps,
} from '../lib/props';
import { getQuestions } from '../lib/questions';
import { OptionId } from '../lib/questions-client-logic';
import { withSessionSsr } from '../lib/with-session';
import { trpc } from '../utils/trpc';
import { getCurrentUser } from './api/trpc/[trpc]';

interface Data {
  initialQuestions: Question[];
  batchIdentifier: string;
  loadingError?: string;
}

interface CustomQuestion extends Question {
  questionNumber: number;
}

export default function Questions(props: PageProps) {
  const data: Data = getDataFromPageProps(props, {
    initialQuestions: [],
    batchIdentifier: '',
    loadingError: FALLBACK_ERROR_MESSAGE,
  });

  const { initialQuestions, batchIdentifier, loadingError } = data;

  const router = useRouter();

  const [questions, setQuestions] = useState<CustomQuestion[]>(
    initialQuestions.map((initialQuestion) => ({
      ...initialQuestion,
      questionNumber: initialQuestions.indexOf(initialQuestion) + 1,
    }))
  );

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

  const back = useCallback(() => {
    router.push('/driving-lessons-menu');
  }, [router]);

  return (
    <>
      {loadingError && (
        <Layout className="relative" title="Practice">
          <Toolbar
            title="Practice"
            leftIcon="arrow_back"
            leftIconAction={back}
          />

          <div className="flex flex-col justify-start items-stretch pt-4">
            <ErrorAlert error={loadingError} />
          </div>
        </Layout>
      )}
      {question && (
        <QuestionComponent
          key={question.id}
          title="Practice"
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

const LIMIT = 25;

export const getServerSideProps: GetServerSideProps = withSessionSsr<PageProps>(
  async ({ req }) => {
    try {
      const currentUser = getCurrentUser(req.session);

      if (!currentUser) {
        return {
          redirect: {
            destination: '/sign-in',
            permanent: false,
          },
        };
      }

      const questions = await getQuestions(LIMIT);

      return createSSRPageProps<Data>({
        initialQuestions: questions,
        batchIdentifier: createKey(),
      });
    } catch (error: any) {
      return createSSRPageProps<Data>({
        initialQuestions: [],
        batchIdentifier: '',
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        loadingError: (error?.message as string) || FALLBACK_ERROR_MESSAGE,
      });
    }
  }
);
