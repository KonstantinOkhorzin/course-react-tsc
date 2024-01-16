import { FC } from 'react';

import Todo from '../Todo';
import { ITodo } from '../../../types';

import { List } from './TodoList.styled';

interface ITodoListProps {
  todos: ITodo[];
}

const TodoList: FC<ITodoListProps> = ({ todos}) => {
  return (
    <List>
      {todos.map(todo => (
        <Todo
          key={todo.id}
          {...todo}
        />
      ))}
    </List>
  );
};

export default TodoList;
