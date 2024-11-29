import { PASSWORD_REGEX } from '@src/shared/constants/regex';
import { z } from 'zod';

const PasswordChangeSchema = z
  .object({
    password: z
      .string({
        required_error: 'La contraseña es requerida'
      })
      .min(1, 'La contraseña es requerida')
      .regex(PASSWORD_REGEX, 'La contraseña no cumple con el formato solicitado'),

    confirmed_password: z
      .string({
        required_error: 'La confirmación de la contraseña es requerida'
      })
      .min(1, 'La confirmación de la contraseña es requerida')
      .regex(PASSWORD_REGEX, 'La contraseña no cumple con el formato solicitado')
  })
  .refine((data) => data.password === data.confirmed_password, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmedPassword']
  });

export default PasswordChangeSchema;
