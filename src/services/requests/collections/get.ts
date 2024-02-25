import { ApiType } from '../signIn/signInService';
import { CollectionsParams, PublicCollectionsResponse } from './types';

export const getPublicCollections = async (
  api: ApiType,
  params: CollectionsParams
) => {
  const response = await api.get<PublicCollectionsResponse>(
    `/public-collections`,
    {
      params: { ...params }
    }
  );
  return response?.data;
};
