import { z } from 'zod';
import { loginSchema } from './zodSchemas';

export type LoginFormData = z.infer<typeof loginSchema>;
