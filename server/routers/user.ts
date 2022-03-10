import { z } from 'zod';
import { prisma } from '../../lib/db';
import { genderSchema } from '../../lib/gender';
import { phoneNumberSchema } from '../../lib/phone-numbers';
import { BaseContext, createRouter } from '../create-router';

export const userRoutes = createRouter<BaseContext>()
  .mutation('create', {
    // check for validity
    input: z.object({
      firstName: z.string().min(1).max(50),
      lastName: z.string().min(1).max(50),
      gender: genderSchema,
      phoneNumber: phoneNumberSchema,
      provinceId: z.number().int().min(1),
    }),
    resolve: async ({ input, ctx }) => {
      // check for duplication
      const duplicate = await prisma.user.findFirst({
        where: {
          phoneNumber: input.phoneNumber,
        },
      });

      if (duplicate) {
        throw new Error('phone number already used');
      }

      // record in db
      const newUser = await prisma.user.create({
        data: {
          username: '',
          pin: '',
          kind: 'Learner',
          firstName: input.firstName,
          lastName: input.lastName,
          gender: input.gender,
          phoneNumber: input.phoneNumber,
          provinceId: input.provinceId,
          createdAt: new Date().getTime(),
          updatedAt: new Date().getTime(),
        },
      });

      // create session and sign in
      ctx.req.session.user = {
        id: newUser.id,
      };
      await ctx.req.session.save();

      // return result to front-end.
      return { newUser };
    },
  })
  .mutation('signIn', {
    // check for validity
    input: z.object({
      phoneNumber: phoneNumberSchema,
    }),
    resolve: async ({ input, ctx }) => {
      const user = await prisma.user.findFirst({
        where: {
          phoneNumber: input.phoneNumber,
        },
      });

      if (!user) {
        throw new Error('phone number not found');
      }

      // create session and sign in
      ctx.req.session.user = {
        id: user.id,
      };
      await ctx.req.session.save();

      // return result to front-end.
      return { user };
    },
  });
