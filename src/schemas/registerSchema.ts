import { object, string, ref, InferType } from 'yup';

import { loginSchema } from './loginSchema';

export const registerSchema = loginSchema.concat(
  object({
    name: string().min(2, 'Too Short!').max(50, 'Too Long!').required('Please enter your name'),
    confirmPassword: string()
      .oneOf([ref('password')], 'Passwords must match')
      .required('Please confirm password'),
  })
);

export type registerType = InferType<typeof registerSchema>;
