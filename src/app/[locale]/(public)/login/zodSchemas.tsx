import { z } from 'zod';

export const loginSchema = z.object({
  identifier: z
    .string()
    .min(1, { message: 'invalidField' })
    .refine(
      value => {
        if (value.includes('@')) {
          return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i.test(
            value
          );
        } else {
          return true;
        }
      },
      { message: 'invalidEmail' }
    ),
  password: z.string().min(8, { message: 'invalidField' })
});
