import PageInfo from '@/components/pageInfo';
import GameActions from '@/components/gameActions';
import { getGame } from '@/app/actions/games';
import styles from './styles.module.scss';

type Props = {
  params: {
    id: string;
  };
};

export default async function GamePage({ params }: Props) {
  const game = await getGame(params.id);

  console.log({ game });

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
            <td>{game.created_at}</td>
          </tr>
          <tr>
            <td>Updated at</td>
            <td>{game.updated_at}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
