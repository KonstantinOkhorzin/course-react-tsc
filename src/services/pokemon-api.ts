import { IPokemon } from '../types';

export const fetchPokemon = (name: string): Promise<IPokemon> => {
  return fetch(`https://pokeapi.co/api/v2/pokemon/${name}`).then(response => {
    if (response.ok) {
      return response.json().then(data => {
        return {
          name: data.name,
          src: data.sprites.other['official-artwork'].front_default,
          stats: data.stats,
        };
      });
    }
    return Promise.reject(`Pokemon with the name "${name}" not found`);
  });
};

