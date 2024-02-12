import { z } from 'zod';

export const registerSchema = z.object({
  email: z
    .string()
    .refine(
      value =>
        /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(
          value
        ),
      {
        message: 'E-mail inválido'
      }
    ),
  username: z
    .string()
    .min(4, { message: 'Campo inválido' })
    .refine(
      value => {
        if (value.includes('@')) {
          return false;
        } else {
          return true;
        }
      },
      { message: 'Não pode conter "@"' }
    ),
  firstName: z
    .string()
    .min(2)
    .refine(
      value => {
        return /[A-Za-z]/.test(value);
      },
      { message: 'Digite um nome válido' }
    ),
  lastName: z
    .string()
    .min(2)
    .refine(
      value => {
        return /[A-Za-z]/.test(value);
      },
      { message: 'Digite um nome válido' }
    ),
  phoneNumber: z.string(),

  password: z
    .string()
    .min(8, { message: 'A senha deve ter pelo menos 8 caracteres' })
    .refine(value => /[a-z]/.test(value), {
      message: 'A senha deve conter pelo menos uma letra minúscula'
    })
    .refine(value => /[A-Z]/.test(value), {
      message: 'A senha deve conter pelo menos uma letra maiúscula'
    })
    .refine(value => /[0-9]/.test(value), {
      message: 'A senha deve conter pelo menos um número'
    })
    .refine(value => /[!@#$%^&*(),.?":{}|<>]/.test(value), {
      message: 'A senha deve conter pelo menos um caractere especial'
    })
});
