import { prisma } from "./db";

export async function getQuestions () {

  const questions = await prisma.question.findMany( {
    take: 25
  } );

  return questions;

}