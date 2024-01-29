import { FC, useState } from 'react';
import { ErrorMessage, Field } from 'formik';
import { TextField, TextFieldProps } from '@mui/material';

import InputAdornmentButton from './components/InputAdornmentButton';
import { FormError } from './FormField.styled';

type Props = Partial<TextFieldProps> & {
  name: string;
  label: string;
  type?: string;
};

const FormField: FC<Props> = ({ name, label, type = 'text', ...restProps }) => {
  const [isVisiblePassword, setIsVisiblePassword] = useState<boolean>(false);

  const toggleVisiblePassword = () => setIsVisiblePassword(state => !state);

  return (
    <div>
      <Field
        as={TextField}
        name={name}
        label={label}
        {...restProps}
        fullWidth
        type={isVisiblePassword ? 'text' : type}
        InputProps={{
          endAdornment:
            type === 'password' ? (
              <InputAdornmentButton
                isVisiblePassword={isVisiblePassword}
                onToggleVisiblePassword={toggleVisiblePassword}
              />
            ) : null,
        }}
      />
      <ErrorMessage name={name} component={FormError} />
    </div>
  );
};

export default FormField;
