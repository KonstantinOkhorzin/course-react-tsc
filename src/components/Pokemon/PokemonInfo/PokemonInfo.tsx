import { Component } from 'react';
import { Typography, CircularProgress, Box } from '@mui/material';

import { IPokemon, Status } from '../../../types';
import pokemonApi from '../../../services/pokemon-api';
import PokemonDataView from '../PokemonDataView';

interface IPokemonInfoState {
  pokemon: IPokemon | null;
  status: Status;
  error: string;
}

interface IPokemonInfoProps {
  pokemonName: string;
}

class PokemonInfo extends Component<IPokemonInfoProps, IPokemonInfoState> {
  state = {
    pokemon: null,
    status: Status.IDLE,
    error: '',
  };

  componentDidUpdate(prevProps: IPokemonInfoProps) {
    const prevName = prevProps.pokemonName;
    const currName = this.props.pokemonName;

    if (prevName !== currName) {
      this.setState({ status: Status.PENDING });

      pokemonApi
        .fetchPokemon(currName)
        .then(pokemon => this.setState({ pokemon, status: Status.RESOLVED }))
        .catch(error => this.setState({ error, status: Status.REJECTED }));
    }
  }

  render() {
    const { pokemon, error, status } = this.state;

    switch (status) {
      case Status.IDLE:
        return <Typography variant='h4'>Enter pokemon name</Typography>;

      case Status.PENDING:
        return (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </Box>
        );

      case Status.RESOLVED:
        return pokemon ? <PokemonDataView pokemon={pokemon} /> : null;

      case Status.REJECTED:
        return (
          <Typography variant='h5' color='error'>
            {error}
          </Typography>
        );

      default:
        return null;
    }
  }
}

export default PokemonInfo;
