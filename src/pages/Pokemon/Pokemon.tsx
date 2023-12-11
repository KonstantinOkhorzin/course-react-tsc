import { useState } from 'react';

import PokemonForm from './PokemonForm';
import PokemonInfo from './PokemonInfo';
import { Wrapper } from './Pokemon.styled';

const Pokemon = () => {
  const [pokemonName, setPokemonName] = useState<string>('');

  return (
    <Wrapper>
      <PokemonForm setPokemonName={setPokemonName} />
      <PokemonInfo pokemonName={pokemonName} />
    </Wrapper>
  );
};

export default Pokemon;
