import { FC } from 'react';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { useAppDispatch } from '../../../../../../redux/hooks';
import { deleteProductThunk } from '../../../../../../redux/products';
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

const ProductCard: FC<IProduct> = ({ id, title, images, description, price }) => {
  const dispatch = useAppDispatch();
  const formattedPrice = price.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

  return (
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
        <IconButton aria-label='delete' color='primary'>
          <EditIcon />
        </IconButton>
        <IconButton
          aria-label='delete'
          color='error'
          onClick={() => dispatch(deleteProductThunk(id))}
        >
          <DeleteIcon />
        </IconButton>
      </Buttons>
    </WrapperCard>
  );
};

export default ProductCard;
