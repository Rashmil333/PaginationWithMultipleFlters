import styles from './tableitem.module.scss';
import { PokemonDataInterface } from '../../../../modules/Pagination';
import Image from 'next/image';


function TableItem(props: PokemonDataInterface): JSX.Element {
  const {
    base_experience,
    height,
    image,
    name,
    weight,
    index } = props
  console.log('>><', props);
  function GraphCMSImageLoader({ src, width }) {
    const relativeSrc = (src) => src.split("/").pop();

    return `https://media.graphcms.com/resize=width:${width}/${relativeSrc(src)}`;
  }
  return (
    <div className={`${styles.itemWrapper} ${index % 2 === 0 && styles.evenColor || styles.oddColor}`}>
      <p>{name}</p>
      <p>{base_experience} </p>
      <p>{height}</p>
      <p>{weight}</p>
      <Image loader={GraphCMSImageLoader} src={image} alt='pokemonpic' className={styles.pic} width={20} height={20} />
    </div>
  )
}
export default TableItem;