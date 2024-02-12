import { SignUpInterface } from '@/types/SignUp.types';
import { AxiosInstance } from 'axios';

export type ApiType = AxiosInstance;

export const SignUpService = async (api: ApiType, body: SignUpInterface) => {
  await api.post(`/register`, { ...body });
};
