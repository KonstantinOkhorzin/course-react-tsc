import { useState, ChangeEvent, useMemo} from 'react';
import { SelectChangeEvent, IconButton, Typography } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectTodos } from '../../redux/todos/slice';

import AddForm from './AddForm';
import TodoList from './TodoList';
import Filter from './Filter';
import Sort from './Sort';
import Modal from '../../components/Modal';

import { Container } from './Todos.styled';

import { ITodo } from '../../types';

const Todos = () => {
  const todos = useSelector(selectTodos);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const params = useMemo(() => Object.fromEntries([...searchParams]), [searchParams]);
  const { filter = '', sort = '' } = params;

  const onToggleModal = () => {
    setShowModal(state => !state);
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
      <TodoList todos={visibleTodos} />
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
          <AddForm onToggleModal={onToggleModal} />
        </Modal>
      )}
    </Container>
  );
};

export default Todos;
