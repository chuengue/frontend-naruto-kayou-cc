'use client';
import { CardViewerList, CollectionViewerList } from '@/components';
import { useCardsQuery } from '@/hooks/useCardQuery';
import { usePublicCollectionsQuery } from '@/hooks/usePublicCollectionQuery';

export default function Home() {
  const { data, isLoading, isError } = useCardsQuery({});
  const { data: publicCollectionsData } = usePublicCollectionsQuery({});

  const parseCollectionsForList = () => {
    return publicCollectionsData?.results.collections.map(collection => {
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
    });
  };

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (isError || !data) {
    return <div>Erro ao carregar os dados</div>;
  }
  console.log(publicCollectionsData?.results.collections);
  return (
    <>
      <CardViewerList
        cards={data?.results}
        cardViewerProps={{
          isAuthenticated: true,
          hasAddOrRemoveActions: false,
          hasFavBtn: true,
          hasRemoveBtn: false,
          onClickFavBtn: () => {
            console.log('onClickFavBtn');
          },
          onAddCard: e => {
            console.log(e);
          },
          onRemoveCard: e => {
            console.log(e);
          },
          onDecrementCard: e => {
            console.log(e);
          },
          onIncrementCard: e => {
            console.log(e);
          }
        }}
      />
      <CollectionViewerList
        collections={parseCollectionsForList()}
        onClick={() => {}}
      />
    </>
  );
}
