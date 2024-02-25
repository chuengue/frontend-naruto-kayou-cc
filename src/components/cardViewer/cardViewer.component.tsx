'use client';
import { useRouter } from '@/navigation';
import { narutoCardInterface } from '@/types/card.types';
import {
  AddRounded,
  DeleteOutlineRounded,
  Favorite,
  FavoriteBorderOutlined,
  RemoveRounded
} from '@mui/icons-material';
import { Box, Chip, Divider, IconButton, Skeleton, Stack } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import DialogModal from '../dialogModal/dialogModal.component';
import Input from '../input';
import { BoxStyled, StyledIconButton } from './cardViewer.style';
import { CardViewerProps } from './cardViewer.type';

const CardViewer = ({
  cardProps,
  componentProps
}: {
  cardProps: narutoCardInterface;
  componentProps: CardViewerProps;
}) => {
  const t = useTranslations('cardViewer');
  const { push } = useRouter();
  const [openSignModal, setOpenSignModal] = useState(false);
  const [openRemoveModal, setOpenRemoveModal] = useState(false);
  const [cardQuantity, setCardQuantity] = useState<number>(0);

  const handleOpen = () => setOpenSignModal(true);
  const handleClose = () => setOpenSignModal(false);
  const handleOpenCardModal = () => setOpenRemoveModal(true);
  const handleCloseCardModal = () => setOpenRemoveModal(false);

  useEffect(() => {
    setCardQuantity(cardProps.quantity);
  }, [cardProps.quantity]);

  const incrementQuantity = (quantity: number) => {
    setCardQuantity(quantity + 1);
    cardProps.quantity++;
    componentProps.onIncrementCard?.(quantity + 1);
  };

  const decrementQuantity = (quantity: number) => {
    if (quantity === 1) {
      return handleOpenCardModal();
    }
    if (quantity === 0) return;
    setCardQuantity(quantity - 1);
    cardProps.quantity--;
    componentProps.onDecrementCard?.(quantity - 1);
  };

  const handleAddCard = (cardId: string) => {
    componentProps.onAddCard?.(cardId);
  };

  const handleRemoveCard = (cardId: string) => {
    componentProps.onRemoveCard?.(cardId);
    handleCloseCardModal();
  };
  return (
    <>
      <DialogModal
        title={t('dialogModalNotSign')}
        description={t('dialogModalDesc')}
        open={openSignModal}
        handleClose={handleClose}
        confirmAction={() => push('/login')}
        confirmLabel={t('dialogModalBtnConfirm')}
        cancelLabel={t('dialogModalBtnCancel')}
      />
      <DialogModal
        title={t('dialogModalRemoveCard')}
        description={t('dialogModalRemoveCardDesc')}
        open={openRemoveModal}
        handleClose={handleCloseCardModal}
        confirmAction={() => handleRemoveCard(cardProps.id)}
        confirmLabel={t('dialogModalRemoveCardConfirm')}
        cancelLabel={t('dialogModalBtnCancel')}
      />
      <Box sx={BoxStyled}>
        <Stack direction="row">
          <Stack direction="column">
            <img
              src={cardProps.imgSrc}
              style={{ maxWidth: '200px', width: '100%', height: 'auto' }}
            />

            <Stack direction="row" justifyContent="space-between" mt={1}>
              <Chip
                variant="outlined"
                label={cardProps?.code}
                sx={{ fontWeight: 500 }}
              />
              <Box>
                {componentProps.hasFavBtn && (
                  <IconButton
                    size="small"
                    color={cardProps?.hasFavorite ? 'red' : 'primary'}
                    onClick={
                      componentProps.isAuthenticated
                        ? componentProps.onClickFavBtn
                        : handleOpen
                    }
                  >
                    {componentProps.isAuthenticated ? (
                      cardProps?.hasFavorite ? (
                        <Favorite fontSize="small" color="error" />
                      ) : (
                        <FavoriteBorderOutlined fontSize="small" />
                      )
                    ) : (
                      <FavoriteBorderOutlined fontSize="small" />
                    )}
                  </IconButton>
                )}
                {componentProps.hasRemoveBtn && (
                  <IconButton
                    size="small"
                    onClick={handleOpenCardModal}
                    color="primary"
                  >
                    <DeleteOutlineRounded />
                  </IconButton>
                )}
              </Box>
            </Stack>

            {componentProps.hasAddOrRemoveActions && (
              <>
                <Divider
                  variant="fullWidth"
                  orientation="horizontal"
                  sx={{ my: 1 }}
                />
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignContent="center"
                >
                  {cardProps.quantity === cardQuantity ? (
                    <>
                      <StyledIconButton
                        aria-label="decrement"
                        onClick={() => decrementQuantity(cardQuantity)}
                      >
                        <RemoveRounded />
                      </StyledIconButton>
                      <Input
                        variant="filled"
                        textAlign="center"
                        sx={{ width: '64px', mx: '4px' }}
                        value={cardQuantity}
                        inputProps={{ readOnly: true }}
                      ></Input>
                      <StyledIconButton
                        aria-label="increment"
                        onClick={
                          cardProps.quantity === 0
                            ? () => handleAddCard(cardProps.id)
                            : () => incrementQuantity(cardQuantity)
                        }
                      >
                        <AddRounded />
                      </StyledIconButton>
                    </>
                  ) : (
                    <Skeleton
                      variant="rectangular"
                      animation="wave"
                      width="200px"
                      height="43px"
                      sx={{ borderRadius: '12px' }}
                    />
                  )}
                </Stack>
              </>
            )}
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

export default CardViewer;
