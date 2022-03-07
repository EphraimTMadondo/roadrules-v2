import { z } from 'zod';
import { prisma } from '../../lib/db';
import { optionIdSchema } from '../../lib/questions-client-logic';
import { createRouter } from '../create-router';

export const responseRoutes = createRouter()
  .mutation('create', {
    input: z.object({
      questionId: z.number().int().min(1),
      choice: optionIdSchema,
    }),
    resolve: async ({ input }) => {
      const [user, question] = await Promise.all([
        prisma.user.findFirst({
          where: {
            username: 'Allan',
          },
        }),
        prisma.question.findUnique({
          where: {
            id: input.questionId,
          },
        }),
      ]);

      if (!user) throw new Error('user not found');

      if (!question) throw new Error('question not found');

      await prisma.response.create({
        data: {
          questionId: input.questionId,
          userId: user.id,
          choice: input.choice,
          correct: input.choice === question.correctOption,
          createdAt: new Date().getTime(),
          updatedAt: new Date().getTime(),
        },
      });

      return {};
    },
  })
  .query('list', {
    resolve() {
      return [];
    },
  });
