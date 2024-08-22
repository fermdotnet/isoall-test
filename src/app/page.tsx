import GameCard from '@/components/gameCard';
import NewGameButton from '@/components/newGameButton';
import PageInfo from '@/components/pageInfo';
import { listGames } from '@/app/actions/games/queries';
import styles from './styles.module.scss';

export default async function HomePage() {
  const games = await listGames();

  return (
    <>
      <PageInfo title="Games" back={false} />

      <div className={styles.games}>
        {games.map(game => (
          <GameCard key={game.id} data={game} />
        ))}

        <NewGameButton />
      </div>
    </>
  );
}
