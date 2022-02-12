import styles from './pagecomponent.module.scss';
import snorlax from '../../../../../static/snorlax.png';
import zubat from '../../../../../static/zubat.png';
import Image from 'next/Image';

interface Props {
  totalPages: number,
  handlePagination: (number) => void;
  activePagenumber: number;
}
function PageComponent(props: Props): JSX.Element {
  const { totalPages, handlePagination, activePagenumber } = props;
  let PageArray: number[] = [];
  for (let i = 0; i <= totalPages; i++) {
    PageArray.push(i);
  }
  console.log('>>>>', PageArray)
  return (
    <div className={styles.pageDiv}>
      {PageArray.map((item: number, index: number) => {
        return (
          // <p key={index} className={styles.page}>{item + 1}</p>
          <span className={styles.pokeball} key={index} onClick={() => handlePagination(item)}>

            <Image src={item === activePagenumber && snorlax || zubat} key={index} alt='pokeball' />
          </span>
        )
      })}
    </div>
  );
}

export default PageComponent;