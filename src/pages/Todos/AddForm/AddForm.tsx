import { useState, FormEvent, ChangeEvent, FC } from 'react';
import { TextField, Button, Box } from '@mui/material';

import { useAppDispatch } from '../../../redux/hooks';
import { createTaskThunk } from '../../../redux/tasks/slice';

interface Props {
  onCloseModal: () => void;
}

const AddForm: FC<Props> = ({ onCloseModal }) => {
  const [text, setText] = useState<string>('');
  const dispatch = useAppDispatch();

  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(createTaskThunk(text));
    setText('');
    onCloseModal();
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
