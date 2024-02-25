import { api } from '@/services/api';
import { allCards } from '@/services/requests/cards/get';
import { CardsParams } from '@/services/requests/cards/types';
import { useQuery } from '@tanstack/react-query';

export const useCardsQuery = (searchParams: CardsParams) => {
  const { data, refetch, isLoading, isError } = useQuery({
    queryKey: ['all_cards'],
    queryFn: () => allCards(api, searchParams),
    retry: false,
    staleTime: 1,
    refetchOnWindowFocus: false
  });

  return { data, refetch, isLoading, isError };
};
