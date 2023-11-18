import { FC, useState, useEffect } from 'react';
import { Typography, CircularProgress, Box } from '@mui/material';

import { IPokemon, Status } from '../../../types';
import pokemonApi from '../../../services/pokemon-api';
import PokemonDataView from '../PokemonDataView';

interface IPokemonInfoProps {
  pokemonName: string;
}

const PokemonInfo: FC<IPokemonInfoProps> = ({ pokemonName }) => {
  const [pokemon, setPokemon] = useState<IPokemon | null>(null);
  const [status, setStatus] = useState<Status>(Status.IDLE);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (pokemonName === '') return;

    setStatus(Status.PENDING);

    pokemonApi
      .fetchPokemon(pokemonName)
      .then(pokemon => {
        setPokemon(pokemon);
        setStatus(Status.RESOLVED);
      })
      .catch(error => {
        setError(error);
        setStatus(Status.REJECTED);
      });
  }, [pokemonName]);

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
};

export default PokemonInfo;
