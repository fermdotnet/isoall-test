'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { SessionStatus } from '@/types/session';
import Button from '@/components/button';
import Logo from '@/components/logo';

import styles from './styles.module.scss';

const Toolbar = () => {
  const { status: sessionStatus } = useSession();

  const handleLogin = () => {
    signIn();
  };

  const handleLogout = () => {
    signOut();
  };

  return (
    <header className={styles.toolbar}>
      <Link href="/">
        <Logo />
      </Link>

      {sessionStatus === SessionStatus.AUTHENTICATED && <Button onClick={handleLogout}>Logout</Button>}
      {sessionStatus === SessionStatus.UNAUTHENTICATED && <Button onClick={handleLogin}>Login</Button>}
    </header>
  );
};

export default Toolbar;
