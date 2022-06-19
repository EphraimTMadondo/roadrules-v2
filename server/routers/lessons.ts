import { prisma } from '../../lib/db';
import { getQuestions } from '../../lib/questions';
import { createRouter } from '../create-router';
import questions from '../../data-model/questions2.json';
import { GetQuestionsSchema } from '../../lib/user-schemas';

export const lessonsRoutes = createRouter().query('notes', {
  async resolve() {
    const notes = await prisma.note.findMany();
    return { notes };
  },
});

export const questionRoutes = createRouter().query('practice', {
  input: GetQuestionsSchema,
  resolve: async({input}) => {
    const randomQuestions = questions
      .sort(() => Math.random() - 0.5)
      .splice(0, input.limit);
    return { questions: randomQuestions };
  },
});