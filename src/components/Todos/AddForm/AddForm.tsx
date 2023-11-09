import { Component, FormEvent, ChangeEvent } from 'react';
import { TextField, Button, Box } from '@mui/material';

interface IAddFormProps {
  addTodo: (text: string) => void;
}

interface IAddFormState {
  text: string;
}

class AddForm extends Component<IAddFormProps, IAddFormState> {
  state: IAddFormState = {
    text: '',
  };

  onFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    this.props.addTodo(this.state.text);
    this.setState({ text: '' });
  };

  onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ text: e.target.value });
  };

  render() {
    return (
      <Box component='form' sx={{ display: 'flex', gap: '15px' }} onSubmit={this.onFormSubmit}>
        <TextField variant='outlined' value={this.state.text} onChange={this.onInputChange} />
        <Button variant='contained' type='submit'>
          add
        </Button>
      </Box>
    );
  }
}

export default AddForm;
