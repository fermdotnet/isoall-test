'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Button from '@/components/button';
import { SessionStatus } from '@/types/session';
import { deleteGame } from '@/app/actions/games/mutations';

type Props = {
  id: string;
};

export default function GameActions({ id }: Props) {
  const { status: sessionStatus } = useSession();
  const router = useRouter();

  const handleEdit = () => {
    router.push(`/games/edit/${id}`);
  };

  const handleDelete = () => {
    deleteGame(id).catch(err => {
      alert(err.message || 'An error occurred deleting the game');
    });
  };

  if (sessionStatus !== SessionStatus.AUTHENTICATED) {
    return null;
  }

  return (
    <>
      <Button onClick={handleEdit}>Edit</Button>
      <Button onClick={handleDelete}>Delete</Button>
    </>
  );
}
