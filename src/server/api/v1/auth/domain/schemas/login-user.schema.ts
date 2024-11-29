import { z } from 'zod';

const LoginUserSchema = z.object({
  email: z
    .string({
      required_error: 'El correo electrónico es requerido'
    })
    .min(1, 'El correo electrónico es requerido')
    .email({ message: 'Formato de correo electrónico incorrecto' }),
  password: z
    .string({
      required_error: 'La contraseña es requerida'
    })
    .min(1, 'La contraseña es requerida')
});

export default LoginUserSchema;
