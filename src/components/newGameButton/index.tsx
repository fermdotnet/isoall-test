import React from 'react';
import Link from 'next/link';
import styles from './styles.module.scss';

const NewGameButton = () => {
  return (
    <Link href="/games/create">
      <div className={styles.container}>
        <div>Add game</div>
      </div>
    </Link>
  );
};

export default NewGameButton;
