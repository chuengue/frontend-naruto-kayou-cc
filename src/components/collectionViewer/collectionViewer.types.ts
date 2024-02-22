import { CollectionData } from '@/types/collection.types';

export interface CollectionViewerProps
  extends Pick<CollectionData, 'id' | 'title' | 'userData' | 'isPublic'> {}
