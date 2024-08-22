import { Metadata } from 'next';
import PageInfo from '@/components/pageInfo';
import GameForm from '@/components/gameForm';
import { getGame } from '@/app/actions/games/queries';
import { getTitle } from '@/utils/seo';

type Props = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const game = await getGame(params.id);

  return {
    title: getTitle(`Edit ${game.name}`),
    description: `Edit the game ${game.name}`
  };
}

export default async function EditGamePage({ params }: Props) {
  const game = await getGame(params.id);

  return (
    <>
      <PageInfo title={`Edit game: ${game.name}`} />
      <GameForm data={game} />
    </>
  );
}
