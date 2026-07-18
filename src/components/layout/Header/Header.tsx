import * as React from 'react';
import { auth } from '@/lib/auth';
import { HeaderClient } from './HeaderClient';

export async function Header() {
  const session = await auth();
  const isAdmin = session?.user && (session.user as any).role === 'ADMIN';

  return <HeaderClient session={session} isAdmin={!!isAdmin} />;
}
