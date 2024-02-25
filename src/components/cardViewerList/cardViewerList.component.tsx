import { Box } from '@mui/material';

import { narutoCardInterface } from '@/types/card.types';
import { CardViewer } from '..';
import { CardViewerProps } from '../cardViewer/cardViewer.type';

export interface CardViewerListProps {
  cards: narutoCardInterface[];
  cardViewerProps: CardViewerProps;
  isCollapsed?: boolean;
}

function CardViewerList({
  cards,
  isCollapsed = false,
  cardViewerProps
}: CardViewerListProps) {
  console.log(cards);
  return (
    <>
      <Box>
        {cards?.map((card, index) => {
          return (
            <CardViewer
              key={index}
              componentProps={{
                isAuthenticated: cardViewerProps.isAuthenticated,
                onClickFavBtn: cardViewerProps.onClickFavBtn,
                hasAddOrRemoveActions: cardViewerProps.hasAddOrRemoveActions,
                hasFavBtn: cardViewerProps.hasFavBtn,
                hasRemoveBtn: cardViewerProps.hasRemoveBtn,
                onAddCard: cardViewerProps.onAddCard,
                onRemoveCard: cardViewerProps.onRemoveCard,
                onDecrementCard: cardViewerProps.onDecrementCard,
                onIncrementCard: cardViewerProps.onIncrementCard
              }}
              cardProps={{
                id: card.id,
                box: card.box,
                rarity: card.rarity,
                name: card.name,
                code: card.code,
                quantity: card.quantity,
                hasFavorite: card.hasFavorite,
                imgSrc: card.imgSrc
              }}
            />
          );
        })}
      </Box>
    </>
  );
}
export default CardViewerList;
