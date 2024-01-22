import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout from './layout';
const Home = lazy(() => import('./pages/Home'));
const Pokemon = lazy(() => import('./pages/Pokemon'));
const Todos = lazy(() => import('./pages/Todos'));
const Clock = lazy(() => import('./pages/Clock'));
const SingleTodo = lazy(() => import('./pages/SingleTodo'));
const Products = lazy(() => import('./pages/Products'));

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='pokemon' element={<Pokemon />} />
        <Route path='clock' element={<Clock />} />
        <Route path='todos' element={<Todos />} />
        <Route path='todos/:todoId' element={<SingleTodo />} />
        <Route path='products' element={<Products />} />
      </Route>
    </Routes>
  );
}

export default App;
