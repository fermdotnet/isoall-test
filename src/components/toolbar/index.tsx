"use client";
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import Button from '@/components/button';
import Logo from '@/components/logo';

import styles from './styles.module.scss';

const Toolbar = () => {
  const handleLogout = () => {
    signOut();
  };

  return (
    <header className={styles.toolbar}>
      <Link href="/">
        <Logo />
      </Link>
      <Button onClick={handleLogout}>Logout</Button>
    </header>
  )
}

export default Toolbar;
