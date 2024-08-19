import Link from 'next/link';
import styles from './styles.module.scss';

type Props = {
  title: string;
  back?: boolean;
};

const PageInfo = ({ title, back = true }: Props) => {
  return (
    <div className={styles.container}>
      {back && (
        <Link href="/">
          <span className="material-icons">arrow_back</span>
        </Link>
      )}
      <div>{title}</div>
    </div>
  );
};

export default PageInfo;
