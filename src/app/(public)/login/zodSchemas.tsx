import { z } from 'zod';

export const loginSchema = z.object({
  identifier: z
    .string()
    .min(1, { message: 'Campo inválido' })
    .refine(
      value => {
        if (value.includes('@')) {
          return /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i.test(value);
        } else {
          return true;
        }
      },
      { message: 'Formato de e-mail inválido' }
    ),
  password: z.string().min(8, { message: 'Campo invalido' })
});
