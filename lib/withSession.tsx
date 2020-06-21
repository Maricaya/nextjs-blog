import {withIronSession} from 'next-iron-session';
import {NextApiHandler} from 'next';

export function withSession(handler: NextApiHandler) {
  return withIronSession(handler, {
    password: '170666392905979741706663929059797417066639290597974',
    cookieName: 'blog',
    cookieOptions: {secure: false}
  })
}