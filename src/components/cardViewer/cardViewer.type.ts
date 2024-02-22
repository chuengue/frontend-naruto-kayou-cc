export interface CardViewerProps {
  card: narutoCardInterface;
  isAuthenticated: boolean;
  hasRemoveBtn?: boolean;
  hasFavBtn?: boolean;
  hasAddOrRemoveActions?: boolean;
  onClickFavBtn?: () => void;
  onAddCard?: (cardId: string) => void;
  onRemoveCard?: (cardId: string) => void;
  onDecrementCard?: (quantity: number) => void;
  onIncrementCard?: (quantity: number) => void;
}
