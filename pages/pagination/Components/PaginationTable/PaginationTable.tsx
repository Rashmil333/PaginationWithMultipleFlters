import styles from './pagination.module.scss';
import { getPokemon, PokemonDataInterface } from '../../../../modules/Pagination';
import { useCallback, useEffect, useState } from 'react';
import TableItem from '../TableItem/TableItem';
import Header from './Components/Header/Header';
import Filter from './Components/Filter/Filter';
import PageComponent from './PagesComponent/PageComponent';



interface Props {
  header: string,
}


function PaginationTable(props: Props): JSX.Element {
  const { header } = props;
  const [pokemonData, setPokemonData] = useState<Array<PokemonDataInterface>>([]);
  const [filteredData, setFilteredData] = useState<Array<PokemonDataInterface>>([]);
  const [pokemonName, setpokemonName] = useState<string>('');
  const [pages, setPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);

  const gettingApiData = useCallback(async () => {
    const datacomingfromapi = await getPokemon();
    console.log('<<', datacomingfromapi);
    setPokemonData(datacomingfromapi);
    setFilteredData(datacomingfromapi);
  }, [])

  useEffect(() => {
    gettingApiData();
  }, [gettingApiData])

  const filterRows = useCallback((expereince?: number, height?: number, weight?: number) => {
    console.log('>>>>', pokemonName, expereince, height, weight);

    const firstFilteredData = pokemonData.filter((row) => {
      if (pokemonName === '') {
        return row;
      }
      else {
        return row.name.toLowerCase().includes(pokemonName.toLowerCase());
      }

    });
    console.log('>>>>', firstFilteredData);
    const seconFilteredData = firstFilteredData.filter((row) => {
      if (expereince != undefined) {
        return row.base_experience > expereince;
      }
      else {
        return row;
      }

    });

    const thirdFilteredData = seconFilteredData.filter((row) => {
      if (height !== undefined) {
        return row.height > height;
      }
      else {
        return row;
      }

    });

    const fourthfilteredData = thirdFilteredData.filter((row) => {
      if (weight !== undefined) {
        return row.weight > weight;
      }
      else {
        return row;
      }

    })
    console.log('>>>>', fourthfilteredData);
    setFilteredData(fourthfilteredData);
    setPages(Math.floor(fourthfilteredData.length / 10));
    console.log('>>>>', typeof (fourthfilteredData.length / 10));
  }, [pokemonData, pokemonName, setPages])

  const handlePagination = useCallback((pagenumber: number) => {
    setCurrentPage(pagenumber);
    console.log('>>>>', pagenumber);
  }, [setCurrentPage])

  return (
    <div className={styles.tableWrapper}>
      <h1 className={styles.header}>{header}</h1>
      <div className={styles.filterandinputWrapper}>
        <div className={styles.inputWrapper}>
          <p className={`${styles.label} ${pokemonName.length > 0 && styles.active || styles.inactive}`}>How Dare you Search me</p>
          <input
            type="text"
            value={pokemonName}
            onChange={(e) => {
              setpokemonName(e.target.value);
              filterRows();
            }}
            className={styles.input}
            placeholder='Dare to Search me'
          />
        </div>
        <Filter handleFilter={filterRows} />
      </div>

      <Header />
      <div className={styles.tableContainer}>
        {filteredData.map((item: PokemonDataInterface, index: number) => {
          if (index >= currentPage && index <= (currentPage + 10)) {
            return (
              // eslint-disable-next-line react/jsx-key
              <TableItem
                base_experience={item.base_experience}
                height={item.height}
                image={item.image}
                name={item.name}
                weight={item.weight}
                index={index}
              />
            );
          }
        })}
      </div>
      <PageComponent totalPages={pages} handlePagination={handlePagination} activePagenumber={currentPage} />
    </div>
  )
}

export default PaginationTable