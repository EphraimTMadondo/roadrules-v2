import * as trpc from '@trpc/server';
import type { NextApiRequest } from 'next';

export interface BaseContext {
  user?: { id: number };
  req: NextApiRequest;
}

export interface AuthorizedContext extends BaseContext {
  user: { id: number };
}

export const createRouter = <Context>() => trpc.router<Context>();
