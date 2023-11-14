import { Component } from 'react';

import PokemonForm from './PokemonForm';
import PokemonInfo from './PokemonInfo';
import { Wrapper } from './Pokemon.styled';

interface IPokemonState {
  pokemonName: string;
}

class Pokemon extends Component {
  state: IPokemonState = {
    pokemonName: '',
  };

  getPokemonName = (name: string) => {
    this.setState({ pokemonName: name });
  };

  render() {
    return (
      <Wrapper>
        <PokemonForm getPokemonName={this.getPokemonName} />
        <PokemonInfo pokemonName={this.state.pokemonName} />
      </Wrapper>
    );
  }
}

export default Pokemon;
