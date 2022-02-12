import styles from './dropdown.module.scss';
import pokeball from '../../../../../../static/pokeball.png';
import pikachu from '../../../../../../static/pikachu.png';
import Image from 'next/image'
import { useEffect, useState } from 'react';

interface Props {
  label: string,
  data: number[],
  activeItem: number,
  handle: any,
  handleFilter: () => void
}
const enum STATES {
  Active = 'active',
  Inactive = 'inactive'
}

function DropDown(props: Props): JSX.Element {
  const { label, data, activeItem, handle, handleFilter } = props;
  const [showmap, setShowMap] = useState<Boolean>(false);

  useEffect(() => {
    handleFilter();
  }, [handleFilter])

  return (
    <div className={styles.dropdown} onMouseLeave={() => setShowMap(false)}>
      <div className={styles.labelDiv} onClick={() => setShowMap(!showmap)}>
        <p className={styles.label}>{label}</p>
        <div className={styles.pokeball} onClick={() => handle(0)}>
          <Image src={pokeball} alt='pic' />
        </div>
      </div>

      <div className={`${styles.dropdownmapContainer} ${showmap && styles[STATES.Active] || styles[STATES.Inactive]}`} onMouseLeave={() => setShowMap(false)}>
        {data.map((item: number, index: number) => {
          return (
            <div key={index} onClick={() => {
              handle(item);
              setShowMap(false);
              handleFilter();
            }}
              className={styles.mapdiv}>
              <p>{item} </p>
              <span className={`${styles.pikachu} ${item === activeItem && styles[STATES.Active] || styles[STATES.Inactive]}`}>
                <Image src={pikachu} alt='pic' />
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default DropDown;