import { Box, Button, Typography } from '@mui/material';
import { Formik, Form, FormikHelpers } from 'formik';

import { loginSchema } from '../../schemas/loginSchema';
import FormField from '../../components/FormField';
import { UserLoginType } from '../../types';
import { useAppDispatch } from '../../redux/hooks';
import { logInThunk } from '../../redux/auth/slice';

const initialValues = {
  email: '',
  password: '',
};

const Login = () => {
  const dispatch = useAppDispatch();

  const onFormSubmit = (values: UserLoginType, actions: FormikHelpers<UserLoginType>) => {
    dispatch(logInThunk(values)).then(console.log);

    actions.resetForm();
  };

  return (
    <div>
      <Typography variant='h3' component='h1' mb={2} align='center'>
        Login
      </Typography>
      <Formik initialValues={initialValues} onSubmit={onFormSubmit} validationSchema={loginSchema}>
        <Box component={Form} sx={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <FormField name='email' label='Email' type='email' />
          <FormField name='password' label='Password' type='password' />
          <Button variant='contained' type='submit'>
            submit
          </Button>
        </Box>
      </Formik>
    </div>
  );
};

export default Login;
