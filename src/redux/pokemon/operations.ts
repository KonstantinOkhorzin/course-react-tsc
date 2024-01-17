import { createAsyncThunk } from '@reduxjs/toolkit';

import { fetchPokemon } from '../../services/pokemon-api';
import { IPokemon } from '../../types';

export const fetchPokemonByName = createAsyncThunk(
  'pokemon/fetchPokemon ',
  async (name: string, thunkAPI) => {
    try {
      return (await fetchPokemon(name)) as IPokemon;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
