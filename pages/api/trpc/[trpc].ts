import * as trpcNext from '@trpc/server/adapters/next';
import { appRoutes } from '../../../server/routers/app';

// export type definition of API
export type AppRouter = typeof appRoutes;

// export API handler
export default trpcNext.createNextApiHandler( {
  router: appRoutes,
  createContext: () => null,
} );