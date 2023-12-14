import { useRef } from 'react';
import { Button } from '@mui/material';
import { useParams, useLocation, Link } from 'react-router-dom';

const SingleTodo = () => {
  const params = useParams();
  const location = useLocation();
  const backLinkLocationRef = useRef(location.state?.from ?? '/todos');

  return (
    <div>
      <h1>SingleTodo</h1>
      <p>todoId: {params.todoId}</p>
      <Button variant='outlined' component={Link} to={location.state?.from ?? '/todos'}>
        to back
      </Button>
      <Button variant='contained' component={Link} to={backLinkLocationRef.current}>
        to back if this page have nested routes
      </Button>
    </div>
  );
};

export default SingleTodo;
