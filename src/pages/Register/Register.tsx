import { Box, Button, Typography } from '@mui/material';
import { Formik, Form, FormikHelpers } from 'formik';

import { registerSchema } from '../../schemas/registerSchema';
import FormField from '../../components/FormField';
import { IRegistrationWithConfirm } from '../../types';
import { useAppDispatch } from '../../redux/hooks';
import { signUpThunk } from '../../redux/auth/slice';

const initialValues = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const Register = () => {
  const dispatch = useAppDispatch();

  const onFormSubmit = (
    values: IRegistrationWithConfirm,
    actions: FormikHelpers<IRegistrationWithConfirm>
  ) => {
    const { name, email, password } = values;

    dispatch(signUpThunk({ name, email, password }))
      .unwrap()
      .then(data => window.localStorage.setItem('token', data.token));

    actions.resetForm();
  };

  return (
    <div>
      <Typography variant='h3' component='h1' mb={2} align='center'>
        Register
      </Typography>
      <Formik
        initialValues={initialValues}
        onSubmit={onFormSubmit}
        validationSchema={registerSchema}
      >
        <Box component={Form} sx={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <FormField name='name' label='Name' />
          <FormField name='email' label='Email' type='email' />
          <FormField name='password' label='Password' type='password' />
          <FormField name='confirmPassword' label='Confirm password' type='password' />
          <Button variant='contained' type='submit'>
            submit
          </Button>
        </Box>
      </Formik>
    </div>
  );
};

export default Register;
