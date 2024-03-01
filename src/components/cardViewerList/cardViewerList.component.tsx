'use client';
import { narutoCardInterface } from '@/types/card.types';
import { Box, Skeleton } from '@mui/material';
import { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { CardViewer } from '..';
import { CardViewerProps } from '../cardViewer/cardViewer.type';

export interface CardViewerListProps {
  cards: narutoCardInterface[];
  cardViewerProps: CardViewerProps;
  isCollapsed?: boolean;
  isLoading?: boolean;
}

function CardViewerList({
  cards,
  isCollapsed = false,
  isLoading,
  cardViewerProps
}: CardViewerListProps) {
  const [cardsPerRow, setCardsPerRow] = useState(5);
  const [cardWidth, setCardWidth] = useState(218);
  const skeletonArray = Array.from({ length: 4 });

  useEffect(() => {
    if (isMobile) {
      setCardsPerRow(2);
      setCardWidth(158);
      return;
    }
    setCardsPerRow(5);
    setCardWidth(218);
  }, []);
  return (
    <Box sx={{ width: `${cardsPerRow * (cardWidth + 16)}px` }}>
      <Box>
        {isLoading ? (
          <>
            {skeletonArray.map((_, index) => (
              <Skeleton
                key={index}
                variant="rectangular"
                height="218px"
                sx={{
                  marginBottom: index === 3 ? '0px' : '22px',
                  marginTop: index === 0 ? '22px' : '0px',
                  borderRadius: '12px',
                  width: {
                    xs: '328px',
                    sm: '320px',
                    md: '1170px',
                    lg: '1170px'
                  }
                }}
              />
            ))}
          </>
        ) : (
          <>
            {cards?.map((card, index) => (
              <CardViewer
                key={index + card.code}
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
            ))}
          </>
        )}
      </Box>
    </Box>
  );
}
export default CardViewerList;
