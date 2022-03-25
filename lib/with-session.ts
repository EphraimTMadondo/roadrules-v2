/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
// eslint-disable-next-line @typescript-eslint/no-unsafe-return

import { IronSessionOptions } from 'iron-session';
import { withIronSessionApiRoute, withIronSessionSsr } from 'iron-session/next';
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextApiHandler,
} from 'next';

declare module 'iron-session' {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}

export type Indexable = {
  [key: string]: unknown;
};

const sessionOptions: IronSessionOptions = {
  password: process.env.SESSION_PASSWORD || '',
  cookieName: process.env.COOKIE_NAME || '',
  cookieOptions: {
    // secure: false,
    secure: process.env.NODE_ENV === 'production',
  },
};

export function withSessionRoute(handler: NextApiHandler) {
  return withIronSessionApiRoute(handler, sessionOptions);
}

type Handler<P> = (
  context: GetServerSidePropsContext
) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>;

export function withSessionSsr<P extends Indexable = Indexable>(
  handler: Handler<P>
) {
  return withIronSessionSsr(handler, sessionOptions);
}
