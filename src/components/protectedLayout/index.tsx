'use client';

import React from 'react';
import { usePathname, redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { SessionStatus } from '@/types/session';
import LoadingAuth from '@/components/loadingAuth';

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const { status: sessionStatus } = useSession();

  if (sessionStatus === SessionStatus.LOADING) {
    return <LoadingAuth />;
  }

  if (
    sessionStatus === SessionStatus.UNAUTHENTICATED &&
    (pathname === '/games/create' || pathname.startsWith('/games/edit/'))
  ) {
    redirect('/');
    return null;
  }

  return children;
};

export default ProtectedLayout;
