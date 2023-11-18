import { useState, ChangeEvent, useEffect } from 'react';
import { SelectChangeEvent, IconButton } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import AddForm from './AddForm';
import TodoList from './TodoList';
import Filter from './Filter';
import Sort from './Sort';
import Modal from '../Modal';

import { Container } from './Todos.styled';

import { ITodo } from '../../types';
import { Typography } from '@mui/material';

const Todos = () => {
  // const [todos, setTodos] = useState<ITodo[]>(() => {
  //   const localTodos = localStorage.getItem('todos');
  //   return localTodos ? JSON.parse(localTodos) : [];
  // });
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [filter, setFilter] = useState<string>('');
  const [sort, setSort] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);

  // useEffect(() => {
  //   window.localStorage.setItem('todos', JSON.stringify(todos));
  // }, [todos]);

  useEffect(() => {
    const localTodos = window.localStorage.getItem('todos');
    if (localTodos) setTodos(JSON.parse(localTodos));
  }, []);

  useEffect(() => {
    if (!todos.length) return;

    window.localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const onToggleModal = () => {
    setShowModal(state => !state);
  };

  const addTodo = (text: string) => {
    const newTodo: ITodo = {
      id: String(Date.now()),
      text,
      completed: false,
    };

    setTodos(todos => [...todos, newTodo]);

    onToggleModal();
  };

  const deleteTodo = (id: string) => {
    setTodos(todos => todos.filter(todo => todo.id !== id));
  };

  const toggleCompleted = (id: string) => {
    setTodos(todos =>
      todos.map(todo => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
    );
  };

  const filterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const filterTodos = (todos: ITodo[], filter: string) => {
    const normalizedFilter: string = filter.toLowerCase();

    return todos.filter(todo => todo.text.toLowerCase().includes(normalizedFilter));
  };

  const calculateCompletedTodos = (todos: ITodo[]) =>
    todos.reduce((total, todo) => (todo.completed ? (total += 1) : total), 0);

  const selectChange = (e: SelectChangeEvent) => {
    setSort(e.target.value);
  };

  const sortTodos = (todos: ITodo[], sort: string) => {
    switch (sort) {
      case 'A-Z':
        return [...todos].sort((a, b) => a.text.localeCompare(b.text));

      case 'Z-A':
        return [...todos].sort((a, b) => b.text.localeCompare(a.text));

      default:
        return todos;
    }
  };

  const filteredTodos: ITodo[] = filterTodos(todos, filter);
  const visibleTodos: ITodo[] = sortTodos(filteredTodos, sort);
  const totalTodoCount: number = todos.length;
  const completedTodoCount: number = calculateCompletedTodos(todos);

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
          <Filter filter={filter} onFilterChange={filterChange} />
          <Sort sort={sort} onSelectChange={selectChange} />
        </div>
      )}
      <TodoList todos={visibleTodos} onDelete={deleteTodo} onToggleCompleted={toggleCompleted} />
      <IconButton
        onClick={onToggleModal}
        color='primary'
        aria-label='create todo'
        sx={{ position: 'fixed', bottom: '50px', right: '50px', width: '70px', height: '70px' }}
      >
        <AddCircleIcon
          sx={{
            width: '50px',
            height: '50px',
          }}
        />
      </IconButton>
      {showModal && (
        <Modal onToggleModal={onToggleModal}>
          <AddForm addTodo={addTodo} />
        </Modal>
      )}
    </Container>
  );
};

export default Todos;
