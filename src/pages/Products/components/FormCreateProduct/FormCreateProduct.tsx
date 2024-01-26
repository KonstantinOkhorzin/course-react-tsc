import { FC } from 'react';
import { Box, Button } from '@mui/material';
import { Formik, Form, FormikHelpers } from 'formik';
import { object, string, number, InferType } from 'yup';

import { useCreateProductMutation } from '../../../../redux/products';
import FormField from '../../../../components/FormField';

const validationSchema = object({
  title: string().required('This field is required'),
  price: number().positive().required('This field is required'),
  description: string().required('This field is required'),
  categoryId: number().positive().required('This field is required'),
  image: string().url().required('This field is required'),
});

type ValuesType = InferType<typeof validationSchema>;

const initialValues = {
  title: '',
  price: 0,
  description: '',
  categoryId: 0,
  image: '',
};

interface Props {
  closeModal: () => void;
}

const FormCreateProduct: FC<Props> = ({ closeModal }) => {
  const [createProduct, { isLoading }] = useCreateProductMutation();

  const onFormSubmit = (values: ValuesType, actions: FormikHelpers<ValuesType>) => {
    createProduct({ ...values, images: [values.image] }).then(closeModal);
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onFormSubmit}
      validationSchema={validationSchema}
    >
      <Box component={Form} sx={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <FormField name='title' label='Title' />
        <FormField name='image' label='Image url' type='url' />
        <Box sx={{ display: 'flex', gap: '15px' }}>
          <FormField name='price' label='Price' type='number'/>
          <FormField name='categoryId' label='Сategory number' type='number' />
        </Box>
        <FormField name='description' label='Description' multiline rows={4} />
        <Button variant='contained' type='submit' disabled={isLoading}>
          {isLoading ? 'created...' : 'create product'}
        </Button>
      </Box>
    </Formik>
  );
};

export default FormCreateProduct;
