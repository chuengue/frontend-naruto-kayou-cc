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
        message: 'invalidEmail'
      }
    ),
  username: z
    .string()
    .min(4, { message: 'invalidField' })
    .refine(
      value => {
        if (value.includes('@')) {
          return false;
        } else {
          return true;
        }
      },
      { message: 'cannotContainAtSign' }
    ),
  firstName: z
    .string()
    .min(2)
    .refine(
      value => {
        return /[A-Za-z]/.test(value);
      },
      { message: 'invalidName' }
    ),
  lastName: z
    .string()
    .min(2)
    .refine(
      value => {
        return /[A-Za-z]/.test(value);
      },
      { message: 'invalidName' }
    ),
  phoneNumber: z.string(),

  password: z
    .string()
    .min(8, { message: 'minLength' })
    .refine(value => /[a-z]/.test(value), {
      message: 'notHaveSmallage'
    })
    .refine(value => /[A-Z]/.test(value), {
      message: 'notHaveUppercase'
    })
    .refine(value => /[0-9]/.test(value), {
      message: 'notHaveNumber'
    })
});
