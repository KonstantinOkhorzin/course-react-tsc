import { Component, FormEventHandler, ChangeEventHandler } from 'react';
import { Box, TextField, Button } from '@mui/material';

interface IPokemonFormProps {
  getPokemonName: (name: string) => void;
}

interface IPokemonFormState {
  query: string;
}

class PokemonForm extends Component<IPokemonFormProps, IPokemonFormState> {
  state = {
    query: '',
  };

  onFormSubmit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    this.props.getPokemonName(this.state.query.toLocaleLowerCase());
    this.setState({ query: '' });
  };

  onInputChange: ChangeEventHandler<HTMLInputElement> = e => {
    this.setState({ query: e.target.value.trimStart() });
  };

  render() {
    const { query } = this.state;

    return (
      <Box component='form' sx={{ display: 'flex' }} onSubmit={this.onFormSubmit}>
        <TextField
          placeholder='Enter pokemon name'
          type='search'
          value={query}
          onChange={this.onInputChange}
        />
        <Button variant='contained' disabled={query === ''} type='submit'>
          Search
        </Button>
      </Box>
    );
  }
}

export default PokemonForm;
