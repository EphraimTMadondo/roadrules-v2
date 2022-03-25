import * as trpc from '@trpc/server';
import { createAuthError } from '../lib/trpc-errors';
import { BaseContext } from './create-router';

export function createProtectedRouter<Context extends BaseContext>() {
  return trpc.router<Context>().middleware(({ ctx, next }) => {
    if (!ctx.user) {
      console.log(`Unauthenticated attempt to access ${ctx.req.url || ''}`);
      throw createAuthError();
    }
    return next({
      ctx: {
        ...ctx,
        user: ctx.user,
      },
    });
  });
}
