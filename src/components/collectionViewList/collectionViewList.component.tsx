import { Box } from '@mui/material';
import { CollectionViewer } from '..';
import { CollectionViewerProps } from '../collectionViewer/collectionViewer.types';

export interface collectionViewListProps {
  collections: Omit<CollectionViewerProps, 'onClick'>[];
  onClick: (id: string) => void;
}

function collectionViewList({ collections, onClick }: collectionViewListProps) {
  return (
    <Box>
      {collections.map((collection, index) => {
        return (
          <CollectionViewer
            key={index}
            cardQuantity={collection.cardQuantity}
            coverImgUrl={collection.coverImgUrl}
            id={collection.id}
            isPublic={collection.isPublic}
            title={collection.title}
            userData={collection.userData}
            onClick={onClick}
          />
        );
      })}
    </Box>
  );
}

export default collectionViewList;
