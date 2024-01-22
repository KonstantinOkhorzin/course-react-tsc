import { FC } from 'react';

import { IProduct } from '../../../../types';
import { List } from './ProductList.styled';
import ProductCard from './components/ProductCard';

interface Props {
  products: IProduct[];
}

const ProductList: FC<Props> = ({ products }) => {
  return (
    <List>
      {products.map(product => (
        <ProductCard key={product.id} {...product} />
      ))}
    </List>
  );
};

export default ProductList;
