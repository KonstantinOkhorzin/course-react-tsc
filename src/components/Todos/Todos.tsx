import { Component, ChangeEvent } from 'react';
import { SelectChangeEvent } from '@mui/material/Select';

import AddForm from './AddForm';
import TodoList from './TodoList';
import Filter from './Filter';
import Sort from './Sort';

import { Container } from './Todos.styled';

import { ITodo } from '../../types';
import { Typography } from '@mui/material';

interface ITodosState {
  todos: ITodo[];
  filter: string;
  sort: '' | 'A-Z' | 'Z-A';
}

class Todos extends Component {
  state: ITodosState = {
    todos: [],
    filter: '',
    sort: '',
  };

  componentDidMount() {
    const todos = localStorage.getItem('todos');

    if (todos) {
      const parsedTodos: ITodo = JSON.parse(todos);
      this.setState({ todos: parsedTodos });
    }
  }

  componentDidUpdate(_prevProps: unknown, prevState: ITodosState) {
    if (this.state.todos !== prevState.todos) {
      localStorage.setItem('todos', JSON.stringify(this.state.todos));
    }
  }

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

  filterTodos = () => {
    const { todos, filter } = this.state;

    const normalizedFilter: string = filter.toLowerCase();

    return todos.filter(todo => todo.text.toLowerCase().includes(normalizedFilter));
  };

  calculateCompletedTodos = () => {
    return this.state.todos.reduce((total, todo) => (todo.completed ? (total += 1) : total), 0);
  };

  selectChange = (e: SelectChangeEvent) => {
    this.setState({ sort: e.target.value });
  };

  sortTodos = () => {
    const { sort } = this.state;
    const filteredTodos: ITodo[] = this.filterTodos();

    switch (sort) {
      case 'A-Z':
        return [...filteredTodos].sort((a, b) => a.text.localeCompare(b.text));

      case 'Z-A':
        return [...filteredTodos].sort((a, b) => b.text.localeCompare(a.text));

      default:
        return filteredTodos;
    }
  };

  render() {
    const { todos, filter, sort } = this.state;
    const visibleTodos: ITodo[] = this.sortTodos();
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
        {todos.length > 1 && (
          <div>
            <Filter filter={filter} onFilterChange={this.filterChange} />
            <Sort sort={sort} onSelectChange={this.selectChange} />
          </div>
        )}
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