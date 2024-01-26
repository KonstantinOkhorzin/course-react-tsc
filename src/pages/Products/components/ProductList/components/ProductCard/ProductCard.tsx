import { FC, useState } from 'react';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import { Link } from 'react-router-dom';

import { IProduct } from '../../../../../../types';
import {
  WrapperCard,
  ImgContainer,
  Content,
  Title,
  Description,
  Buttons,
  Price,
} from './ProductCard.styled';
import { useDeleteProductMutation } from '../../../../../../redux/products';
import Modal from '../../../../../../components/Modal';
import FormEditProduct from '../../../FormEditProduct';

const ProductCard: FC<IProduct> = ({ id, title, images, description, price }) => {
  const [isShowFormEdit, setIsShowFormEdit] = useState<boolean>(false);
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();
  const formattedPrice = price.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

  const onToggleModal = () => {
    setIsShowFormEdit(isShow => !isShow);
  };

  return (
    <>
      <WrapperCard>
        <ImgContainer>
          <img src={images[0]} alt='' />
        </ImgContainer>
        <Content>
          <Title>{title}</Title>
          <Description>{description}</Description>
          <Price>{formattedPrice}</Price>
        </Content>
        <Buttons>
          <IconButton component={Link} to={`${id}`} aria-label='link to product page' color='info'>
            <ZoomInIcon />
          </IconButton>
          <IconButton aria-label='delete' color='primary' onClick={onToggleModal}>
            <EditIcon />
          </IconButton>
          <IconButton
            aria-label='delete'
            color='error'
            onClick={() => deleteProduct(id)}
            disabled={isDeleting}
          >
            <DeleteIcon />
          </IconButton>
        </Buttons>
      </WrapperCard>

      {isShowFormEdit && (
        <Modal onCloseModal={onToggleModal}>
          <FormEditProduct closeModal={onToggleModal} id={id} title={title} price={price} />
        </Modal>
      )}
    </>
  );
};

export default ProductCard;
