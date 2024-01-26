import { FC, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IconButton, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ReplyIcon from '@mui/icons-material/Reply';

import { useDeleteProductMutation } from '../../../../redux/products';
import Modal from '../../../../components/Modal';
import FormEditProduct from '../../../Products/components/FormEditProduct';
import { IProduct } from '../../../../types';

const ProductDetailsView: FC<IProduct> = ({ id, title, images, description, price }) => {
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();
  const [isShowFormEdit, setIsShowFormEdit] = useState<boolean>(false);
  const navigate = useNavigate();

  const onToggleModal = () => {
    setIsShowFormEdit(isShow => !isShow);
  };

  const onDeleteProduct = () => {
    deleteProduct(id).then(() => navigate('/products'));
  };

  return (
    <div>
      <div>
        <IconButton component={Link} to={'/products'} aria-label='link to back' color='info'>
          <ReplyIcon />
        </IconButton>

        <IconButton aria-label='delete' color='primary' onClick={onToggleModal}>
          <EditIcon />
        </IconButton>

        <IconButton
          aria-label='delete'
          color='error'
          disabled={isDeleting}
          onClick={onDeleteProduct}
        >
          <DeleteIcon />
        </IconButton>
      </div>
      <img src={images[0]} alt='' width={300} />
      <Typography variant='h4' component='h1' mt={2}>
        {title}
      </Typography>
      <Typography component='p' mt={2}>
        {description}
      </Typography>
      <Typography component='p' mt={2}>
        ${price}
      </Typography>

      {isShowFormEdit && (
        <Modal onCloseModal={onToggleModal}>
          <FormEditProduct closeModal={onToggleModal} id={id} title={title} price={price} />
        </Modal>
      )}
    </div>
  );
};

export default ProductDetailsView;
