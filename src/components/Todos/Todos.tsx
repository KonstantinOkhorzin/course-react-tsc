import { Component } from 'react';

import AddForm from './AddForm';
import TodoList from './TodoList';

import { Container } from './Todos.styled';

import { ITodo } from '../types';

interface ITodosState {
  todos: ITodo[];
}

class Todos extends Component {
  state: ITodosState = {
    todos: [],
  };

  addTodo = (text: string) => {
    const newTodo: ITodo = {
      id: String(Date.now()),
      text,
      completed: false,
    };

    this.setState((prevState: ITodosState) => ({ todos: [...prevState.todos, newTodo] }));
  }

  deleteTodo = (id: string) => {
    this.setState((prevState: ITodosState) => ({
      todos: prevState.todos.filter(todo => todo.id !== id),
    }));
  }

  toggleCompleted = (id: string) => {
    this.setState((prevState: ITodosState) => ({
      todos: prevState.todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    }));
  }

  render() {
    const { todos } = this.state;

    return (
      <Container>
        <TodoList
          todos={todos}
          onDelete={this.deleteTodo}
          onToggleCompleted={this.toggleCompleted}
        />
        <AddForm addTodo={this.addTodo} />
      </Container>
    );
  }
}

export default Todos;
