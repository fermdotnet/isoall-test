import Link from 'next/link';
import type { Game } from '@/types/game';
import styles from './styles.module.scss';

type Props = {
  data: Game;
};

const GameCard = ({ data }: Props) => {
  return (
    <Link href={`/games/${data.id}`}>
      <div className={styles.card}>
        <div
          style={{
            backgroundImage: `url(/images/categories/${data.category}.jpg)`
          }}
        >
          <div className={styles.name}>{data.name}</div>
        </div>
      </div>
    </Link>
  );
};

export default GameCard;
