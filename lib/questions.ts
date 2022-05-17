import { prisma } from './db';

export async function getQuestions(limit: number, paid: boolean) {
  const questions = await prisma.question.findMany();

  const randomQuestions = questions
    .sort((a, b) => {
      if (paid) {
        return Math.random() - 0.5;
      }

      return a.id - b.id;
    })
    .splice(0, limit);

  return randomQuestions;
}
