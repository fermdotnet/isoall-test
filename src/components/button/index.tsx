import React from 'react';
import styles from './styles.module.scss';

type Props = {
  children: React.ReactNode;
  onClick: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
};

const Button = ({ children, onClick, disabled = false, type = 'button' }: Props) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={styles.button}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
