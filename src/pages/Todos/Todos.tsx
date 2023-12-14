import { useState, ChangeEvent, useEffect, useMemo } from 'react';
import { SelectChangeEvent, IconButton } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useSearchParams } from 'react-router-dom';

import AddForm from './AddForm';
import TodoList from './TodoList';
import Filter from './Filter';
import Sort from './Sort';
import Modal from '../../components/Modal';

import { Container } from './Todos.styled';

import { ITodo } from '../../types';
import { Typography } from '@mui/material';

const Todos = () => {
  const [todos, setTodos] = useState<ITodo[]>(() => {
    const localTodos = localStorage.getItem('todos');
    return localTodos ? JSON.parse(localTodos) : [];
  });
  const [showModal, setShowModal] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();
  // const filter = searchParams.get('filter') ?? '';
  // const sort = searchParams.get('sort') ?? '';
  const params = useMemo(() => Object.fromEntries([...searchParams]), [searchParams]);
  const { filter = '', sort = '' } = params;

  useEffect(() => {
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
    const filterText = e.target.value;
    const params = Object.fromEntries([...searchParams]);

    if (filterText === '') {
      delete params.filter;
    } else {
      params.filter = filterText;
    }

    setSearchParams(params);
    // OR
    //const filterText = e.target.value;
    // const currentSearchParams = new URLSearchParams(searchParams);

    // if (filterText === '') {
    //   currentSearchParams.delete('filter');
    // } else {
    //   currentSearchParams.set('filter', filterText);
    // }

    // setSearchParams(currentSearchParams);
  };

  const filteredTodos = useMemo(() => {
    const normalizedFilter: string = filter.toLowerCase();

    return todos.filter(todo => todo.text.toLowerCase().includes(normalizedFilter));
  }, [filter, todos]);

  const calculateCompletedTodos = (todos: ITodo[]) =>
    todos.reduce((total, todo) => (todo.completed ? (total += 1) : total), 0);

  const selectChange = (e: SelectChangeEvent) => {
    const sortValue = e.target.value;
    const params = Object.fromEntries([...searchParams]);

    if (sortValue === '') {
      delete params.sort;
    } else {
      params.sort = sortValue;
    }

    setSearchParams(params);
    // OR
    // const sortValue = e.target.value;
    // const currentSearchParams = new URLSearchParams(searchParams);

    // if (sortValue === '') {
    //   currentSearchParams.delete('sort');
    // } else {
    //   currentSearchParams.set('sort', sortValue);
    // }

    // setSearchParams(currentSearchParams);
  };

  const visibleTodos = useMemo(() => {
    switch (sort) {
      case 'A-Z':
        return [...filteredTodos].sort((a, b) => a.text.localeCompare(b.text));

      case 'Z-A':
        return [...filteredTodos].sort((a, b) => b.text.localeCompare(a.text));

      default:
        return filteredTodos;
    }
  }, [filteredTodos, sort]);

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
