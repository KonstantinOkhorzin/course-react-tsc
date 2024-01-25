import { Typography, CircularProgress, Box } from '@mui/material';
import { useSelector } from 'react-redux';

import PokemonDataView from '../PokemonDataView';
import { useGetPokemonByNameQuery } from '../../../redux/pokemon/api';
import { errorHandler } from '../../../redux/helpers';
import { selectPokemonName } from '../../../redux/pokemon/slice';

const PokemonInfo = () => {
  const pokemonName = useSelector(selectPokemonName);
  const {
    currentData: pokemon,
    error,
    isUninitialized,
    isFetching,
    isSuccess,
    isError,
  } = useGetPokemonByNameQuery(pokemonName, {
    skip: pokemonName === '',
  });

  return (
    <>
      {isUninitialized && <Typography variant='h4'>Enter pokemon name</Typography>}{' '}
      {isFetching && (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      )}
      {isSuccess && pokemon && <PokemonDataView pokemon={pokemon} />}
      {isError && (
        <Typography variant='h5' color='error' textAlign='center'>
          {errorHandler(error)}
        </Typography>
      )}
    </>
  );
};

export default PokemonInfo;
