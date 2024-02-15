import {
  SignData,
  WhoamiResponse
} from '@/contexts/authContext/authContext.types';
import { AxiosInstance } from 'axios';
import { UserResponse } from '../../../contexts/authContext/authContext.types';

export type ApiType = AxiosInstance;

export const SignInService = async (api: ApiType, body: SignData) => {
  const response = await api.post<UserResponse>(`/login`, { ...body });
  return response?.data;
};
export const whoamiService = async (api: ApiType) => {
  const response = await api.get<WhoamiResponse>(`/whoami`);
  return response?.data;
};
