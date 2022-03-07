import * as trpcNext from '@trpc/server/adapters/next';
import { appRoutes } from '../../../server/routers/app';

export type AppRouter = typeof appRoutes;

export default trpcNext.createNextApiHandler({
  router: appRoutes,
  createContext: () => null,
});
