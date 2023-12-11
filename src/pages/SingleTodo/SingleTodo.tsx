import { useParams } from 'react-router-dom';

const SingleTodo = () => {
  const params = useParams();

  return (
    <div>
      <h1>SingleTodo</h1>
      <p>todoId: {params.todoId}</p>
    </div>
  );
};

export default SingleTodo;
