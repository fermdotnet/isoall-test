import { Metadata } from 'next';
import PageInfo from '@/components/pageInfo';
import GameForm from '@/components/gameForm';
import { getTitle } from '@/utils/seo';

export const metadata: Metadata = {
  title: getTitle('Add a new game'),
  description: 'Add a new game to the list'
};

export default function CreateGamePage() {
  return (
    <>
      <PageInfo title="Add a new game" />
      <GameForm />
    </>
  );
}
