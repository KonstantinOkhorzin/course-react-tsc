import { useState, FormEventHandler, ChangeEventHandler, FC } from 'react';
import { Box, TextField, Button } from '@mui/material';

interface IPokemonFormProps {
  getPokemonName: (name: string) => void;
}

const PokemonForm: FC<IPokemonFormProps> = ({ getPokemonName }) => {
  const [query, setQuery] = useState<string>('');

  const onFormSubmit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    getPokemonName(query.toLocaleLowerCase());
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
