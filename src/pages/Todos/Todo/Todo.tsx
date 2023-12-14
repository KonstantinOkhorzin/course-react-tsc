import { FC } from 'react';
import { Checkbox, IconButton, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link, useLocation } from 'react-router-dom';

import { Wrapper } from './Todo.styled';
import { ITodo } from '../../../types';

interface ITodoProps extends ITodo {
  onDelete: (id: string) => void;
  onToggleCompleted: (id: string) => void;
}

const Todo: FC<ITodoProps> = ({ id, text, completed, onDelete, onToggleCompleted }) => {
  const location = useLocation();

  return (
    <Wrapper completed={completed}>
      <Checkbox checked={completed} onChange={() => onToggleCompleted(id)} />
      <Button component={Link} to={`${id}`} state={{from: location}}>
        {text}
      </Button>
      <IconButton color='error' aria-label='delete' onClick={() => onDelete(id)}>
        <DeleteIcon />
      </IconButton>
    </Wrapper>
  );
};

export default Todo;
