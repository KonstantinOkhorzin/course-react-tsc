import { FC } from 'react';

import Todo from '../Todo';
import { ITodo } from '../../types';

import { List } from './TodoList.styled';

interface ITodoListProps {
  todos: ITodo[];
  onDelete: (id: string) => void;
  onToggleCompleted: (id: string) => void;
}

const TodoList: FC<ITodoListProps> = ({ todos, onDelete, onToggleCompleted }) => {
  return (
    <List>
      {todos.map(({ id, text, completed }) => (
        <Todo
          key={id}
          text={text}
          completed={completed}
          onDelete={() => onDelete(id)}
          onToggleCompleted={() => onToggleCompleted(id)}
        />
      ))}
    </List>
  );
};

export default TodoList;
