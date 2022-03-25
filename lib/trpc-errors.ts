import * as trpc from '@trpc/server';

export function createAuthError() {
  return new trpc.TRPCError({ code: 'UNAUTHORIZED' });
}
