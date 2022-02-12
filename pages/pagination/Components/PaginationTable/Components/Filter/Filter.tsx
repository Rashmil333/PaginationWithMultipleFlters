import styles from './filter.module.scss';
import DropDown from '../DropDown/Dropdown';
import { DROPDOWN_EXPEREINCE, DROPDOWN_HEIGHT, DROPDOWN_WEIGHT } from '../../../../../../modules/Pagination';
import { useCallback, useState } from 'react';

interface Props {
  handleFilter: (...string) => void;
}

function Filter(props: Props): JSX.Element {

  const { handleFilter } = props;
  const [experience, setExperience] = useState<number>(0);
  const [height, setheight] = useState<number>(0);
  const [weight, setweight] = useState<number>(0);

  const callPaginationFilter = useCallback(() => {
    handleFilter(experience, height, weight);
  }, [experience, handleFilter, height, weight])

  return (
    <div className={styles.dropdownWrapper}>
      <DropDown
        label='Experience'
        data={DROPDOWN_EXPEREINCE}
        activeItem={experience}
        handle={setExperience}
        handleFilter={callPaginationFilter}
      />
      <DropDown
        label='Height'
        data={DROPDOWN_HEIGHT}
        activeItem={height}
        handle={setheight}
        handleFilter={callPaginationFilter}
      />
      <DropDown
        label='Weight'
        data={DROPDOWN_WEIGHT}
        activeItem={weight}
        handle={setweight}
        handleFilter={callPaginationFilter}
      />
    </div>
  );
}

export default Filter;