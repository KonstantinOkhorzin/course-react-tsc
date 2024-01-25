import { useState, FormEventHandler, ChangeEventHandler } from 'react';
import { Box, TextField, Button } from '@mui/material';

import { setPokemonName } from '../../../redux/pokemon/slice';
import { useAppDispatch } from '../../../redux/hooks';

const PokemonForm = () => {
  const [query, setQuery] = useState<string>('');
  const dispatch = useAppDispatch();

  const onFormSubmit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    dispatch(setPokemonName(query.toLocaleLowerCase()));
    setQuery('');
  };

  const onInputChange: ChangeEventHandler<HTMLInputElement> = e => {
    setQuery(e.target.value.trimStart());
  };

  return (
    <Box component='form' sx={{ display: 'flex' }} onSubmit={onFormSubmit}>
      <TextField
        placeholder='Enter pokemon name'
        type='search'
        value={query}
        onChange={onInputChange}
      />
      <Button variant='contained' disabled={query === ''} type='submit'>
        Search
      </Button>
    </Box>
  );
};

export default PokemonForm;
