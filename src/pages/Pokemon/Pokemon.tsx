import PokemonForm from './PokemonForm';
import PokemonInfo from './PokemonInfo';
import { Wrapper } from './Pokemon.styled';

const Pokemon = () => {
  return (
    <Wrapper>
      <PokemonForm />
      <PokemonInfo />
    </Wrapper>
  );
};

export default Pokemon;
