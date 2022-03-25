import { Response } from '@prisma/client';
import { minusWeeksFromDate } from './dates';
import { prisma } from './db';

export interface ResponseNumbers {
  numCorrect: number;
  numWrong: number;
}

export interface BatchIdentifier {
  batchIdentifier: string;
}

export async function getLastWeekResponses(
  userId: number,
  currentDate: Date,
  includeQuestions?: 'includeQuestions'
) {
  const responses = await prisma.response.findMany({
    where: {
      userId,
      createdAt: {
        gt: minusWeeksFromDate(currentDate, 1).getTime(),
      },
    },
    include: {
      question: Boolean(includeQuestions),
    },
  });

  return responses;
}

function getResponseNumbers(responses: Response[]) {
  const numCorrect = responses.filter((response) => response.correct).length;

  const numWrong = responses.filter((response) => !response.correct).length;

  return { numCorrect, numWrong };
}

export async function getBatchResponses(batchIdentifier: string) {
  const responses = await prisma.response.findMany({
    where: {
      batchIdentifier,
    },
    include: {
      question: true,
    },
  });

  return responses;
}

export async function getLastBatchResponseNumbers(
  userId: number
): Promise<ResponseNumbers & BatchIdentifier> {
  const responses = await prisma.response.findMany({
    where: {
      userId,
    },
  });

  if (!responses.length) {
    return {
      ...getResponseNumbers([]),
      batchIdentifier: '',
    };
  }

  const first = responses.sort(
    (a, b) => Number(b.createdAt) - Number(a.createdAt)
  )[0];

  const relevantResponses = responses.filter(
    (response) =>
      response.batchIdentifier &&
      response.batchIdentifier === first.batchIdentifier
  );

  return {
    ...getResponseNumbers(relevantResponses),
    batchIdentifier: first.batchIdentifier || '',
  };
}

export async function getLastWeekResponseNumbers(
  userId: number,
  currentDate: Date
) {
  const responses = await getLastWeekResponses(userId, currentDate);

  return getResponseNumbers(responses);
}
