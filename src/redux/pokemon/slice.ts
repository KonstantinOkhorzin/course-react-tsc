import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitialState {
  pokemonName: string;
}

const initialState: InitialState = {
  pokemonName: '',
};

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    setPokemonName: (state, action: PayloadAction<string>) => {
      state.pokemonName = action.payload;
    },
  },
  selectors: {
    selectPokemonName: state => state.pokemonName,
  },
});

export const { setPokemonName } = pokemonSlice.actions;
export const { selectPokemonName } = pokemonSlice.selectors;

export default pokemonSlice.reducer;
