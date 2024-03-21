import { api } from '@/services/api';
import { allCards } from '@/services/requests/cards/get';
import { CardsParams } from '@/services/requests/cards/types';
import { useMutation } from '@tanstack/react-query';

export const useCardsQuery = (searchParams?: CardsParams) => {
  const { data, refetch, isLoading, isError, isFetching } = useMutation({
    mutationKey: ['all_cards'],
    mutationFn: () => allCards(api, searchParams)
  });

  return { data, refetch, isLoading, isError, isFetching };
};
