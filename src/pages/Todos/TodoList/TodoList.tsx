import { FC } from 'react';

import Todo from '../Todo';
import { ITask } from '../../../types';

import { List } from './TodoList.styled';

interface ITodoListProps {
  todos: ITask[];
}

const TodoList: FC<ITodoListProps> = ({ todos }) => {
  return (
    <List>
      {todos.map(todo => (
        <Todo key={todo._id} {...todo} />
      ))}
    </List>
  );
};

export default TodoList;
