import { FC } from 'react';
import { Checkbox, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { Wrapper } from './Todo.styled';

interface ITodoProps {
  text: string;
  completed: boolean;
  onDelete: () => void;
  onToggleCompleted: () => void;
}

const Todo: FC<ITodoProps> = ({ text, completed, onDelete, onToggleCompleted }) => {
  return (
    <Wrapper completed={completed}>
      <Checkbox checked={completed} onChange={onToggleCompleted} />
      <p>{text}</p>
      <IconButton color='error' aria-label='delete' onClick={onDelete}>
        <DeleteIcon />
      </IconButton>
    </Wrapper>
  );
};

export default Todo;
