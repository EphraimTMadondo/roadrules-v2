import { prisma } from './db';
import questions from '../data-model/questions2.json';

export async function getQuestions(limit: number) {
  // const questions = await prisma.question.findMany();

  const randomQuestions = questions
    .sort(() => Math.random() - 0.5)
    .splice(0, limit);

  return randomQuestions;
}
