import { ApiType } from '../signIn/signInService';
import { CardPayload, CardsParams, NarutoCardsResponse } from './types';

export const allCards = async (
  api: ApiType,
  payload: CardPayload,
  params?: CardsParams | undefined
) => {
  const response = await api.post<NarutoCardsResponse>(
    `/naruto-cards`,
    payload,
    {
      params: { ...params }
    }
  );
  return response?.data;
};
