import PageInfo from '@/components/pageInfo';
import GameForm from '@/components/gameForm';
import { getGame } from '@/app/actions/games';

type Props = {
  params: {
    id: string;
  };
};

export default async function EditGamePage({ params }: Props) {
  const game = await getGame(params.id);

  return (
    <>
      <PageInfo title={`Edit game: ${game.name}`} />
      <GameForm data={game} />
    </>
  );
}
