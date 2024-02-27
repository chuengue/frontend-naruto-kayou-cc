import { CollectionViewerProps } from '../collectionViewer/collectionViewer.types';

export interface collectionViewListProps {
  collections: Omit<CollectionViewerProps, 'onClick'>[];
  isCollapsed?: boolean;
  title?: string;
  onClick: (id: string) => void;
}
