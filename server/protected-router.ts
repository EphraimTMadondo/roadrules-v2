import * as trpc from '@trpc/server';
import { BaseContext } from './create-router';

export function createProtectedRouter() {
  return trpc.router<BaseContext>().middleware(({ ctx, next }) => {
    if (!ctx.user) {
      console.log(`Unauthenticated attempt to access ${ctx.req.url || ''}`);
      throw new trpc.TRPCError({ code: 'UNAUTHORIZED' });
    }
    return next({
      ctx: {
        ...ctx,
        user: ctx.user,
      },
    });
  });
}
