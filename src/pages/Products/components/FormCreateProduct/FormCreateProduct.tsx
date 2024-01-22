import { Button } from '@mui/material';

import { useAppDispatch } from '../../../../redux/hooks';
import { createProductThunk } from '../../../../redux/products';

const newProduct = {
  title: 'New Product',
  price: 10,
  description: 'A description',
  categoryId: 1,
  images: ['https://media.ultra-shop.com/images/86/9c/4cd72252e141ce45188750ec8da4.jpg'],
};

const FormCreateProduct = () => {
  const dispatch = useAppDispatch();

  return (
    <div>
      <Button variant='contained' onClick={() => dispatch(createProductThunk(newProduct))}>
        Create product
      </Button>
    </div>
  );
};

export default FormCreateProduct;
