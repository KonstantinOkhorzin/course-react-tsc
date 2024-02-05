import { useState, FormEvent, ChangeEvent, FC } from 'react';
import { TextField, Button, Box } from '@mui/material';

import { useCreateTaskMutation } from '../../../redux/tasks/api';

interface Props {
  onCloseModal: () => void;
}

const AddForm: FC<Props> = ({ onCloseModal }) => {
  const [text, setText] = useState<string>('');
  const [createTask] = useCreateTaskMutation();

  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    createTask(text)
      .unwrap()
      .then(() => {
        setText('');
        onCloseModal();
      });
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
