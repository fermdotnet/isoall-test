'use client';
import React, { useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react';
import LoadingAuth from '@/components/loadingAuth';

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  const { status: sessionStatus } = useSession();

  useEffect(() => {
    console.log({ sessionStatus });

    if (sessionStatus === 'unauthenticated') {
      signIn();
    }
  }, [sessionStatus]);

  if (sessionStatus === 'loading' || sessionStatus === 'unauthenticated') {
    return <LoadingAuth />;
  }

  return children;
};

export default ProtectedLayout;
