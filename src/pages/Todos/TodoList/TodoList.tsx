import { FC } from 'react';

import Todo from '../Todo';
import { ITodo } from '../../../types';

import { List } from './TodoList.styled';

interface ITodoListProps {
  todos: ITodo[];
  onDelete: (id: string) => void;
  onToggleCompleted: (id: string) => void;
}

const TodoList: FC<ITodoListProps> = ({ todos, onDelete, onToggleCompleted }) => {
  return (
    <List>
      {todos.map(todo => (
        <Todo
          key={todo.id}
          {...todo}
          onDelete={onDelete}
          onToggleCompleted={onToggleCompleted}
        />
      ))}
    </List>
  );
};

export default TodoList;
