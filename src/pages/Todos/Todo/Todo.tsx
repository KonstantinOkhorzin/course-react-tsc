import { FC } from 'react';
import { Checkbox, IconButton, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { deleteTodo, toggleCompleted } from '../../../redux/todos/slice';
import { Wrapper } from './Todo.styled';
import { ITodo } from '../../../types';

const Todo: FC<ITodo> = ({ id, text, completed }) => {
  const location = useLocation();
  const dispatch = useDispatch();

  return (
    <Wrapper completed={completed}>
      <Checkbox checked={completed} onChange={() => dispatch(toggleCompleted(id))} />
      <Button component={Link} to={`${id}`} state={{ from: location }}>
        {text}
      </Button>
      <IconButton color='error' aria-label='delete' onClick={() => dispatch(deleteTodo(id))}>
        <DeleteIcon />
      </IconButton>
    </Wrapper>
  );
};

export default Todo;
