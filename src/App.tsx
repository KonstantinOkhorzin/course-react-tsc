import { lazy, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Layout from './layout';
import { useAppDispatch } from './redux/hooks';
import { refreshUserThunk, selectIsRefreshing } from './redux/auth/slice';

const Home = lazy(() => import('./pages/Home'));
const Pokemon = lazy(() => import('./pages/Pokemon'));
const Todos = lazy(() => import('./pages/Todos'));
const Clock = lazy(() => import('./pages/Clock'));
const SingleTodo = lazy(() => import('./pages/SingleTodo'));
const Products = lazy(() => import('./pages/Products'));
const ProductDetails = lazy(() => import('./pages/ProductDetails'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));

function App() {
  const dispatch = useAppDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUserThunk());
  }, [dispatch]);

  return isRefreshing ? (
    <b>Refreshing user...</b>
  ) : (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='pokemon' element={<Pokemon />} />
        <Route path='clock' element={<Clock />} />
        <Route path='todos' element={<Todos />} />
        <Route path='todos/:todoId' element={<SingleTodo />} />
        <Route path='products' element={<Products />} />
        <Route path='products/:id' element={<ProductDetails />} />
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
      </Route>
    </Routes>
  );
}

export default App;
