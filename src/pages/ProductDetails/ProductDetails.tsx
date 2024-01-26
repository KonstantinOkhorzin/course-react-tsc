import { useParams } from 'react-router-dom';
import { Box, CircularProgress, Typography } from '@mui/material';

import { Container } from '../Products/Products.styled';
import ProductDetailsView from './components/ProductDetailsView';
import { useGetProductByIdQuery } from '../../redux/products';
import { errorHandler } from '../../redux/helpers';

const ProductDetails = () => {
  const { id } = useParams();
  const { data, isLoading, isSuccess, isError, error } = useGetProductByIdQuery(id);

  return (
    <>
      {isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      )}
      {isError && (
        <Typography variant='h5' color='error'>
          {errorHandler(error)}
        </Typography>
      )}
      {isSuccess && data && (
        <Container>
          <ProductDetailsView {...data} />
        </Container>
      )}
    </>
  );
};

export default ProductDetails;
