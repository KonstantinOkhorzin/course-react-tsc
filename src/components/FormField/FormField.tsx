import { FC } from 'react';
import { ErrorMessage, Field } from 'formik';
import { TextField, TextFieldProps } from '@mui/material';

import { FormError } from './FormField.styled';

type Props = Partial<TextFieldProps> & {
  name: string;
  label: string;
};

const FormField: FC<Props> = ({ name, label, ...restProps }) => {
  return (
    <div>
      <Field as={TextField} name={name} label={label} {...restProps} fullWidth />
      <ErrorMessage name={name} component={FormError} />
    </div>
  );
};

export default FormField;
