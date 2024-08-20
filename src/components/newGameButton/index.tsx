'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { SessionStatus } from '@/types/session';
import styles from './styles.module.scss';

const NewGameButton = () => {
  const { status: sessionStatus } = useSession();

  if (sessionStatus !== SessionStatus.AUTHENTICATED) {
    return null;
  }

  return (
    <Link href="/games/create">
      <div className={styles.container}>
        <div>Add game</div>
      </div>
    </Link>
  );
};

export default NewGameButton;
