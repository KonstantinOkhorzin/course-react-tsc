import { Routes, Route } from 'react-router-dom';

import Layout from './layout';
import Home from './pages/Home';
import Pokemon from './pages/Pokemon';
import Todos from './pages/Todos';
import Clock from './pages/Clock';
import SingleTodo from './pages/SingleTodo';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='pokemon' element={<Pokemon />} />
        <Route path='clock' element={<Clock />} />
        <Route path='todos' element={<Todos />} />
        <Route path='todos/:todoId' element={<SingleTodo />} />
      </Route>
    </Routes>
  );
}

export default App;
