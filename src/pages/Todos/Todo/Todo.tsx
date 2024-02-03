import { ChangeEvent, FC } from 'react';
import { Checkbox, IconButton, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link, useLocation } from 'react-router-dom';

import { Wrapper } from './Todo.styled';
import { ITask } from '../../../types';
import { useAppDispatch } from '../../../redux/hooks';
import { deleteTaskThunk, toggleCompletedThunk } from '../../../redux/tasks/slice';

const Todo: FC<ITask> = ({ id, text, completed }) => {
  const location = useLocation();
  const dispatch = useAppDispatch();

  const onDeleteTask = (id: string) => {
    dispatch(deleteTaskThunk(id));
  };

  const onToggleComleted = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(toggleCompletedThunk({ id, completed: e.target.checked }));
  };

  return (
    <Wrapper completed={completed}>
      <Checkbox checked={completed} onChange={onToggleComleted} />
      <Button component={Link} to={`${id}`} state={{ from: location }}>
        {text}
      </Button>
      <IconButton color='error' aria-label='delete' onClick={() => onDeleteTask(id)}>
        <DeleteIcon />
      </IconButton>
    </Wrapper>
  );
};

export default Todo;
