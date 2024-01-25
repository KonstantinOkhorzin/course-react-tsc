import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { IPokemon, IPokemonApiResponse } from '../../types';

const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: builder => ({
    getPokemonByName: builder.query<IPokemon, string>({
      query: name => `pokemon/${name}`,
      transformResponse: (response: IPokemonApiResponse) => ({
        name: response.name,
        src: response.sprites.other['official-artwork'].front_default,
        stats: response.stats,
      }),
    }),
  }),
});

export const { useGetPokemonByNameQuery } = pokemonApi;

export default pokemonApi;
