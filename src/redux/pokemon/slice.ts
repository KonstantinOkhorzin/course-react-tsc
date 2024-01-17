import { createSlice } from '@reduxjs/toolkit';

import { fetchPokemonByName } from './operations';
import { IPokemon, Status } from '../../types';

interface InitialState {
  pokemon: IPokemon | null;
  status: Status;
  error: string | null;
}

const initialState: InitialState = {
  pokemon: null,
  status: Status.IDLE,
  error: null,
};

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchPokemonByName.pending, state => {
        state.status = Status.PENDING;
      })
      .addCase(fetchPokemonByName.fulfilled, (state, action) => {
        state.pokemon = action.payload;
        state.status = Status.RESOLVED;
        state.error = null;
      })
      .addCase(fetchPokemonByName.rejected, (state, { payload }) => {
        if (typeof payload === 'string') {
          state.error = payload;
        }
        state.status = Status.REJECTED;
      });
  },
  selectors: {
    selectPokemon: state => state,
  },
});

export const { selectPokemon } = pokemonSlice.selectors;

export default pokemonSlice.reducer;
