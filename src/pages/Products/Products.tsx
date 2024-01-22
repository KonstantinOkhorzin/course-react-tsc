import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Box, CircularProgress, Typography } from '@mui/material';

import { Container } from './Products.styled';
import ProductList from './components/ProductList';
import FormCreateProduct from './components/FormCreateProduct';
import { useAppDispatch } from '../../redux/hooks';
import { getAllProductsThunk, selectProducts } from '../../redux/products';

const Products = () => {
  const dispatch = useAppDispatch();
  const { products, loading, error } = useSelector(selectProducts);

  useEffect(() => {
    dispatch(getAllProductsThunk());
  }, [dispatch]);

  return (
    <Container>
      <FormCreateProduct />
      
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      )}
      {products.length > 0 && <ProductList products={products} />}
      {error && (
        <Typography variant='h5' color='error'>
          {error}
        </Typography>
      )}
    </Container>
  );
};

export default Products;
