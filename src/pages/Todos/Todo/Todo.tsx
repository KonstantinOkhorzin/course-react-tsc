import { ChangeEvent, FC } from 'react';
import { Checkbox, IconButton, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link, useLocation } from 'react-router-dom';

import { Wrapper } from './Todo.styled';
import { ITask } from '../../../types';
import { useDeleteTaskMutation, useToggleCompletedMutation } from '../../../redux/tasks/api';

const Todo: FC<ITask> = ({ _id, text, completed }) => {
  const location = useLocation();
  const [toggleCompleted] = useToggleCompletedMutation();
  const [deleteTask] = useDeleteTaskMutation();

  const onToggleCompleted = (e: ChangeEvent<HTMLInputElement>) => {
    toggleCompleted({ _id, completed: e.target.checked });
  };

  return (
    <Wrapper completed={completed}>
      <Checkbox checked={completed} onChange={onToggleCompleted} />
      <Button component={Link} to={`${_id}`} state={{ from: location }}>
        {text}
      </Button>
      <IconButton color='error' aria-label='delete' onClick={() => deleteTask(_id)}>
        <DeleteIcon />
      </IconButton>
    </Wrapper>
  );
};

export default Todo;
