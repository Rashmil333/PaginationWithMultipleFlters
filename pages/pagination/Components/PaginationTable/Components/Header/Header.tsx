import styles from './header.module.scss';
import { HEADER_DATA } from '../../../../../../modules/Pagination';

interface Items {
  id: string,
  title: string,
}
function Header(): JSX.Element {
  return (
    <div className={styles.headerContainer}>
      {HEADER_DATA.map((item: string, index: number) => {
        return (
          <p key={index} className={styles.headerText}>{item}</p>
        );
      })}
    </div>
  );
}

export default Header;