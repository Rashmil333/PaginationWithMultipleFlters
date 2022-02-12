import axios from "axios"
export const getPokemon = async () => {
  try {
    const data = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
    const res = await data.json();
    const parsedData = PokemonDataParser(res.results);
    console.log(res.results);
    return parsedData;
  }

  catch (error) {
    console.log(error);
  }
  return [];
}

export const getSinglePokemonDataByUrl = async (url: string) => {
  try {
    const data = await fetch(url);
    const res = await data.json();
    console.log(res);
    return res;
  }

  catch (error) {
    console.log(error);
  }
  return [];
}


export const PokemonDataParser = async (data) => {
  console.log(data);
  // const datas = await getSinglePokemonDataByUrl(data[0].url)
  // console.log(datas)
  let ParsedPokemonData = [];
  // data.map(async (item) => {
  //   const singleData = await getSinglePokemonDataByUrl(item.url);
  //   ParsedPokemonData.push({
  //     name: item.name,
  //     height: singleData.height,
  //     base_experience: singleData.base_experience,
  //     weight: singleData.weight,
  //     image: singleData.sprites.back_default
  //   })
  // });
  for (let i = 0; i < data.length; i++) {
    const singleData = await getSinglePokemonDataByUrl(data[i].url);
    ParsedPokemonData.push({
      name: data[i].name,
      height: singleData.height,
      base_experience: singleData.base_experience,
      weight: singleData.weight,
      image: singleData.sprites.back_default
    })
  }
  console.log('>>>>>', ParsedPokemonData);
  return ParsedPokemonData

}


export interface PokemonDataInterface {
  base_experience: number,
  height: number,
  image: string,
  name: string,
  weight: number,
  index: number
}

export const HEADER_DATA = [
  'name',
  'base_experience',
  'height',
  'weight',
  'Image',
]

export const DROPDOWN_EXPEREINCE = [
  64, 100, 200, 1000
]

export const DROPDOWN_HEIGHT = [
  2, 30, 20, 10
]

export const DROPDOWN_WEIGHT = [
  100, 200, 300, 500, 1000
]