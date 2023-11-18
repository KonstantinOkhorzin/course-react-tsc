import { useState } from 'react';

import PokemonForm from './PokemonForm';
import PokemonInfo from './PokemonInfo';
import { Wrapper } from './Pokemon.styled';

const Pokemon = () => {
  const [pokemonName, setPokemonName] = useState<string>('');

  const getPokemonName = (name: string) => {
    setPokemonName(name);
  };

  return (
    <Wrapper>
      <PokemonForm getPokemonName={getPokemonName} />
      <PokemonInfo pokemonName={pokemonName} />
    </Wrapper>
  );
};

export default Pokemon;
