import { FC } from 'react';
import { Box, Button } from '@mui/material';
import { Formik, Form } from 'formik';
import { object, string, number, InferType } from 'yup';

import { useUpdateProductMutation } from '../../../../redux/products';
import FormField from '../../../../components/FormField';
import { IProduct } from '../../../../types';

const validationSchema = object({
  title: string().required('This field is required'),
  price: number().positive().required('This field is required'),
});

type ValuesType = InferType<typeof validationSchema>;

interface Props extends Pick<IProduct, 'id' | 'price' | 'title'> {
  closeModal: () => void;
}

const FormCreateProduct: FC<Props> = ({ id, price, title, closeModal }) => {
  const [updateProduct, { isLoading }] = useUpdateProductMutation();

  const onFormSubmit = (values: ValuesType) => {
    updateProduct({ ...values, id }).then(closeModal);
  };

  const initialValues = { title, price };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onFormSubmit}
      validationSchema={validationSchema}
    >
      <Box component={Form} sx={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <FormField name='title' label='Title' />
        <FormField name='price' label='Price' type='number' />
        <Button variant='contained' type='submit' disabled={isLoading}>
          {isLoading ? 'updated...' : 'update product'}
        </Button>
      </Box>
    </Formik>
  );
};

export default FormCreateProduct;
