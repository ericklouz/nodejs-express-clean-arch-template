import { z } from 'zod';

const SessionTokenSchema = z.object({
  user_id: z
    .bigint({
      required_error: 'El Id del usuario es requerido',
      invalid_type_error: 'El Id del usaurio debe ser de tipo BigInt'
    })
    .min(BigInt(1), 'El Id del usuario es requerido'),
  refresh_token: z
    .string({
      required_error: 'El refresh token es requerido'
    })
    .min(1, 'El refresh token es requerido'),
  refresh_token_expiration_date: z
    .string({
      required_error: 'La fehca de expiración del refresh token es requerida'
    })
    .datetime(),
  ip_address: z
    .string({
      required_error: 'La dirección IP es requerida'
    })
    .min(1, 'La dirección IP es requerida'),
  device_info: z
    .string({
      required_error: 'La información del dispositivo es requerida'
    })
    .min(1, 'La información del dispositivo es requerida'),
  city: z.string().optional(),
  region: z.string().optional(),
  country: z.string().optional()
});

export default SessionTokenSchema;
