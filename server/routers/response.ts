import { z } from 'zod';
import { prisma } from '../../lib/db';
import { optionIdSchema } from '../../lib/questions-client-logic';
import { createProtectedRouter } from '../protected-router';

export const responseRoutes = createProtectedRouter().mutation('create', {
  input: z.object({
    questionId: z.number().int().min(1),
    choice: optionIdSchema,
    batchIdentifier: z.string(),
  }),
  resolve: async ({ input, ctx }) => {
    const question = await prisma.question.findUnique({
      where: {
        id: input.questionId,
      },
    });

    const currentUser = ctx.req.session.user;

    if (!currentUser) {
      throw new Error('please sign in first');
    }

    if (!question) throw new Error('question not found!');

    await prisma.response.create({
      data: {
        questionId: input.questionId,
        userId: currentUser.id,
        choice: input.choice,
        correct: input.choice === question.correctOption,
        batchIdentifier: input.batchIdentifier,
        createdAt: new Date().getTime(),
        updatedAt: new Date().getTime(),
      },
    });

    return {};
  },
});
