import { api } from '@/services/api';
import { getPublicCollections } from '@/services/requests/collections/get';
import { CollectionsParams } from '@/services/requests/collections/types';
import { useQuery } from '@tanstack/react-query';

export const usePublicCollectionsQuery = (searchParams: CollectionsParams) => {
  const { data, refetch, isLoading, isError } = useQuery({
    queryKey: ['public_collection'],
    queryFn: () => getPublicCollections(api, searchParams),
    retry: false,
    refetchOnWindowFocus: false
  });

  return { data, refetch, isLoading, isError };
};
