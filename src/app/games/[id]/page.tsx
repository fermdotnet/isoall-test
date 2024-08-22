import { Metadata } from 'next';
import PageInfo from '@/components/pageInfo';
import GameActions from '@/components/gameActions';
import { getGame } from '@/app/actions/games/queries';
import { fullDateTimeOptions } from '@/constants/dates';
import { getTitle } from '@/utils/seo';
import styles from './styles.module.scss';

type Props = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const game = await getGame(params.id);

  return {
    title: getTitle(game.name),
    description: `${game.name} in the ${game.category} category`
  };
}

export default async function GamePage({ params }: Props) {
  const game = await getGame(params.id);

  return (
    <>
      <PageInfo title={game.name} />

      <div className={styles.hero}>
        <div
          style={{
            backgroundImage: `url(/images/categories/${game.category}.jpg)`
          }}
        ></div>
      </div>

      <div className={styles.buttons}>
        <GameActions id={params.id} />
      </div>

      <table className={styles.info}>
        <tbody>
          <tr>
            <td>ID</td>
            <td>{game.id}</td>
          </tr>
          <tr>
            <td>Name</td>
            <td>{game.name}</td>
          </tr>
          <tr>
            <td>Category</td>
            <td>{game.category}</td>
          </tr>
          <tr>
            <td>Created at</td>
            <td>{new Date(game.createdAt).toLocaleDateString('en-US', fullDateTimeOptions)}</td>
          </tr>
          <tr>
            <td>Updated at</td>
            <td>
              {game.createdAt !== game.updatedAt
                ? new Date(game.updatedAt).toLocaleDateString('en-US', fullDateTimeOptions)
                : '-'}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
