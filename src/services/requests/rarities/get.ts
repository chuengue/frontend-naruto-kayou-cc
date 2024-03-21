import { ApiType } from '../signIn/signInService';
import { raritiesResponse } from './types';

export const getRarities = async (api: ApiType) => {
  const response = await api.get<raritiesResponse>(`/rarities`);
  return response?.data;
};
