import { prisma } from '../../lib/db';
import { createHashedPassword, passwordMatchesHash } from '../../lib/hashing';
import { authVerCode, sendVerCode } from '../../lib/twilio';
import {
  AuthCodeSchema,
  CreateUserSchema,
  SendCodeSchema,
  SignInSchema,
} from '../../lib/user-schemas';
import { BaseContext, createRouter } from '../create-router';

export const userRoutes = createRouter<BaseContext>()
  .mutation('sendCode', {
    input: SendCodeSchema,
    resolve: async ({ input }) => {
      await sendVerCode(input.phoneNumber);
      return {};
    },
  })
  .mutation('authCode', {
    input: AuthCodeSchema,
    resolve: async ({ input }) => {
      const verified = await authVerCode(input.phoneNumber, input.code);
      return { verified };
    },
  })
  .mutation('create', {
    // check for validity
    input: CreateUserSchema,
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

      if (input.pin !== input.reEnterPin) {
        throw new Error('please make sure the pins match');
      }

      // record in db
      const newUser = await prisma.user.create({
        data: {
          username: '',
          pin: await createHashedPassword(input.pin),
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
    input: SignInSchema,
    resolve: async ({ input, ctx }) => {
      const user = await prisma.user.findFirst({
        where: {
          phoneNumber: input.phoneNumber,
        },
      });

      if (!user) {
        throw new Error('phone number not found');
      }

      const authorized = await passwordMatchesHash(input.pin, user.pin);

      if (!authorized) {
        throw new Error('incorrect credentials');
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
