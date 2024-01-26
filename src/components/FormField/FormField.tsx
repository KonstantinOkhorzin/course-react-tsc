import { FC } from 'react';
import { ErrorMessage, Field } from 'formik';
import { TextField } from '@mui/material';

import { FormError } from './FormField.styled';

interface Props {
  name: string;
  label: string;
  type?: string;
  [key: string]: number | string | boolean | undefined;
}

const FormField: FC<Props> = ({ name, label, type = 'text', ...restProps }) => {
  return (
    <div>
      <Field as={TextField} name={name} label={label} type={type} {...restProps} fullWidth />
      <ErrorMessage name={name} component={FormError} />
    </div>
  );
};

export default FormField;
