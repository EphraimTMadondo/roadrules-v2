import type { NextApiRequest, NextApiResponse } from 'next';
import * as trpcNext from '@trpc/server/adapters/next';
import { IronSession } from 'iron-session';
import { appRoutes } from '../../../server/routers/app';
import { withSessionRoute } from '../../../lib/with-session';
import { BaseContext } from '../../../server/create-router';

export type AppRouter = typeof appRoutes;

export function getCurrentUser(session: IronSession) {
  return session?.user || undefined;
}

const trpcHandler = trpcNext.createNextApiHandler({
  router: appRoutes,
  createContext: ({ req }: trpcNext.CreateNextContextOptions) => {
    const context: BaseContext = {
      user: getCurrentUser(req.session),
      req,
    };
    return context;
  },
});

export default withSessionRoute((req: NextApiRequest, res: NextApiResponse) => {
  // do whatever you want here
  // Set CORS headers
  // res.setHeader('Access-Control-Allow-Origin', '*');
  // res.setHeader('Access-Control-Request-Method', '*');
  // res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
  // res.setHeader('Access-Control-Allow-Headers', '*');
  // if (req.method === 'OPTIONS') {
  //   res.writeHead(200);
  //   res.end();
  //   return;
  // }
  trpcHandler(req, res);
});

// export default trpcNext.createNextApiHandler({
//   router: appRoutes,
//   createContext: () => null,
// });
