import { useState } from 'react';
import { Box, CircularProgress, IconButton, Typography } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import { Container } from './Products.styled';
import ProductList from './components/ProductList';
import FormCreateProduct from './components/FormCreateProduct';
import { useGetProductsQuery } from '../../redux/products';
import Modal from '../../components/Modal';
import { errorHandler } from '../../redux/helpers';

const Products = () => {
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const { currentData: products, error, isSuccess, isLoading, isError } = useGetProductsQuery();

  const onToggleModal = () => {
    setIsShowModal(isShow => !isShow);
  };

  return (
    <Container>
      {isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      )}
      {isSuccess && products && <ProductList products={products} />}
      {isError && (
        <Typography variant='h5' color='error'>
          {errorHandler(error)}
        </Typography>
      )}

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

      {isShowModal && (
        <Modal onCloseModal={onToggleModal}>
          <FormCreateProduct closeModal={onToggleModal} />
        </Modal>
      )}
    </Container>
  );
};

export default Products;
