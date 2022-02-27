import * as trpc from '@trpc/server';
import { responseRoutes } from './response';

const createRouter = () => {
  return trpc.router();
}

export const appRoutes = createRouter()
  .merge( "response.", responseRoutes );