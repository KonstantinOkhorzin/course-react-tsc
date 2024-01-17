import { asyncThunkCreator, buildCreateSlice } from '@reduxjs/toolkit';

import { IPokemon, Status } from '../../types';
import { fetchPokemon } from '../../services/pokemon-api';

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

const createPokemonSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

const pokemonSlice = createPokemonSlice({
  name: 'pokemon',
  initialState,
  reducers: create => ({
    fetchPokemonByName: create.asyncThunk(
      async (name: string, thunkApi) => {
        try {
          return (await fetchPokemon(name));
        } catch (error) {
          return thunkApi.rejectWithValue(error);
        }
      },
      {
        pending: state => {
          state.status = Status.PENDING;
        },
        rejected: (state, { payload }) => {
          if (typeof payload === 'string') {
            state.error = payload;
          }
          state.status = Status.REJECTED;
        },
        fulfilled: (state, action) => {
          state.pokemon = action.payload;
          state.status = Status.RESOLVED;
          state.error = null;
        },
      }
    ),
  }),
  selectors: {
    selectPokemon: state => state,
  },
});

export const { fetchPokemonByName } = pokemonSlice.actions;
export const { selectPokemon } = pokemonSlice.selectors;

export default pokemonSlice.reducer;
