'use client';

import { useRouter } from 'next/navigation';
import Button from '@/components/button';
import { deleteGame } from '@/app/actions/games';

type Props = {
  id: string;
};

export default function GameActions({ id }: Props) {
  const router = useRouter();

  const handleEdit = () => {
    router.push(`/games/edit/${id}`);
  };

  const handleDelete = async () => {
    deleteGame(id);
  };

  return (
    <>
      <Button onClick={handleEdit}>Edit</Button>
      <Button onClick={handleDelete}>Delete</Button>
    </>
  );
}
