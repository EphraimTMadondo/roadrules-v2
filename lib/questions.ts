import { prisma } from './db';

export async function getQuestions(limit: number) {
  const questions = await prisma.question.findMany();

  const randomQuestions = questions
    .sort(() => Math.random() - 0.5)
    .splice(0, limit);

  return randomQuestions;
}
