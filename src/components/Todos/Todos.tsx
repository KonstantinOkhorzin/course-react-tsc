import { Component, ChangeEvent } from 'react';

import AddForm from './AddForm';
import TodoList from './TodoList';
import Filter from './Filter';

import { Container } from './Todos.styled';

import { ITodo } from '../types';
import { Typography } from '@mui/material';

interface ITodosState {
  todos: ITodo[];
  filter: string;
}

class Todos extends Component {
  state: ITodosState = {
    todos: [],
    filter: '',
  };

  addTodo = (text: string) => {
    const newTodo: ITodo = {
      id: String(Date.now()),
      text,
      completed: false,
    };

    this.setState((prevState: ITodosState) => ({ todos: [...prevState.todos, newTodo] }));
  };

  deleteTodo = (id: string) => {
    this.setState((prevState: ITodosState) => ({
      todos: prevState.todos.filter(todo => todo.id !== id),
    }));
  };

  toggleCompleted = (id: string) => {
    this.setState((prevState: ITodosState) => ({
      todos: prevState.todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    }));
  };

  filterChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ filter: e.target.value });
  };

  getVisibleTodos = () => {
    const { todos, filter } = this.state;

    const normalizedFilter: string = filter.toLowerCase();

    return todos.filter(todo => todo.text.toLowerCase().includes(normalizedFilter));
  };

  calculateCompletedTodos = () => {
    return this.state.todos.reduce((total, todo) => (todo.completed ? (total += 1) : total), 0);
  };

  render() {
    const { todos, filter } = this.state;
    const visibleTodos: ITodo[] = this.getVisibleTodos();
    const totalTodoCount: number = todos.length;
    const completedTodoCount: number = this.calculateCompletedTodos();

    return (
      <Container>
        <div>
          <Typography variant='h5' component='p'>
            Total todos: {totalTodoCount}
          </Typography>
          <Typography variant='h5' component='p'>
            Copleted: {completedTodoCount}
          </Typography>
        </div>
        {todos.length > 1 && <Filter filter={filter} onFilterChange={this.filterChange} />}
        <TodoList
          todos={visibleTodos}
          onDelete={this.deleteTodo}
          onToggleCompleted={this.toggleCompleted}
        />
        <AddForm addTodo={this.addTodo} />
      </Container>
    );
  }
}

export default Todos;
