import { minusWeeksFromDate } from './dates';
import { prisma } from './db';

export async function getLastWeekResponses(
  currentDate: Date,
  includeQuestions?: 'includeQuestions'
) {
  const responses = await prisma.response.findMany({
    where: {
      // add user id
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

export async function getLastWeekResponseNumbers(currentDate: Date) {
  const responses = await getLastWeekResponses(currentDate);

  const numCorrect = responses.filter((response) => response.correct).length;

  const numWrong = responses.filter((response) => !response.correct).length;

  return { numCorrect, numWrong };
}
