import { NextApiRequest } from 'next';
import { getSession } from 'next-auth/react';
import prismadb from '@/lib/prismadb';

const serverAuth = async (req: NextApiRequest) => {
  const session = await getSession({ req });

  if (!session?.user?.email) {
    console.log(`🍔%cserverAuth.ts:9 - Error`, 'font-weight:bold; background:#2fd000;color:#fff;'); //DELETEME
    console.log('error'); // DELETEME
    throw new Error('Could not sign in ⚠️  ')
  }

  const user_query = { where: { email: session.user.email } }
  const currentUser = await prismadb.user.findUnique(user_query)

  if (!currentUser) {
    throw new Error('Not signed in');
  }
  return { currentUser };
}

export default serverAuth;
