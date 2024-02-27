'use client';
import { CollectionViewerList, EmptyList } from '@/components';
import { collectionViewListProps } from '@/components/collectionViewList/collectionViewList.types';
import { usePublicCollectionsQuery } from '@/hooks/usePublicCollectionQuery';
import { Box, Skeleton, Stack } from '@mui/material';
import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations('home');
  const { data, isLoading } = usePublicCollectionsQuery({
    limit: 99
  });

  const parseCollectionsForList =
    (): collectionViewListProps['collections'] => {
      return (
        data?.results.collections.map(collection => {
          return {
            id: collection.id,
            title: collection.title,
            // coverImgUrl: collection.coverImgUrl,
            cardQuantity: collection.cardQuantity,
            isPublic: collection.isPublic,
            userData: collection.userData
            // createdAt: collection.createdAt,
            // updatedAt: collection.updatedAt
          };
        }) ?? []
      );
    };
  const parseCollections: collectionViewListProps['collections'] =
    parseCollectionsForList();

  return (
    <>
      <Stack
        width="100%"
        height="auto"
        justifyContent="center"
        alignItems="center"
        pb="32px"
      >
        <img src="/assets/banner.png" alt="" />
      </Stack>
      {isLoading ? (
        <Box>
          <Skeleton
            variant="rectangular"
            animation="wave"
            height="300px"
            sx={{ borderRadius: '16px' }}
          />
        </Box>
      ) : parseCollections?.length === 0 ? (
        <EmptyList message="No items found." />
      ) : (
        <Stack width="100%" alignItems="center">
          <Stack justifyContent="center">
            <CollectionViewerList
              isCollapsed
              title={t('collectionsBoxTitle')}
              collections={parseCollections}
              onClick={e => console.log(e)}
            />
          </Stack>
        </Stack>
      )}
    </>
  );
}
