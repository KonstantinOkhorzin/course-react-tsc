import { useState, FormEvent, ChangeEvent, FC } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { useDispatch } from 'react-redux';

import { addTodo } from '../../../redux/todos/slice';

interface Props {
  onToggleModal: () => void;
}

const AddForm: FC<Props> = ({ onToggleModal }) => {
  const [text, setText] = useState<string>('');
  const dispatch = useDispatch();

  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(addTodo(text));
    setText('');
    onToggleModal();
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
