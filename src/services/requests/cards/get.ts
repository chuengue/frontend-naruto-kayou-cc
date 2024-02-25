import { ApiType } from '../signIn/signInService';
import { CardsParams, NarutoCardsResponse } from './types';

export const allCards = async (api: ApiType, params: CardsParams) => {
  const response = await api.get<NarutoCardsResponse>(`/naruto-cards`, {
    params: { ...params }
  });
  return response?.data;
};
