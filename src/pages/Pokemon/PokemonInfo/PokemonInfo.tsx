import { FC, useEffect } from 'react';
import { Typography, CircularProgress, Box } from '@mui/material';
import { useSelector } from 'react-redux';

import { Status } from '../../../types';
import PokemonDataView from '../PokemonDataView';
import { fetchPokemonByName } from '../../../redux/pokemon/operations';
import { useAppDispatch } from '../../../redux/hooks';
import { selectPokemon } from '../../../redux/pokemon/slice';

interface IPokemonInfoProps {
  pokemonName: string;
}

const PokemonInfo: FC<IPokemonInfoProps> = ({ pokemonName }) => {
  const { pokemon, error, status } = useSelector(selectPokemon);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (pokemonName === '') return;

    dispatch(fetchPokemonByName(pokemonName));
  }, [dispatch, pokemonName]);

  switch (status) {
    case Status.IDLE:
      return pokemon ? (
        <PokemonDataView pokemon={pokemon} />
      ) : (
        <Typography variant='h4'>Enter pokemon name</Typography>
      );

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
