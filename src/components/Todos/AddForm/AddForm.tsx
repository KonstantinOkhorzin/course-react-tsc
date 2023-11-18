import { FC, useState, FormEvent, ChangeEvent } from 'react';
import { TextField, Button, Box } from '@mui/material';

interface IAddFormProps {
  addTodo: (text: string) => void;
}

const AddForm: FC<IAddFormProps> = ({ addTodo }) => {
  const [text, setText] = useState<string>('');

  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    addTodo(text);
    setText('');
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  return (
    <Box component='form' sx={{ display: 'flex', gap: '15px' }} onSubmit={onFormSubmit}>
      <TextField variant='outlined' value={text} onChange={onInputChange} />
      <Button variant='contained' type='submit'>
        add
      </Button>
    </Box>
  );
};

export default AddForm;
