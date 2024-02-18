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
import { Box, Chip, Divider, IconButton, Stack, styled } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import theme from '../../../theme/theme';
import DialogModal from '../dialogModal/dialogModal.component';
import Input from '../input';

export interface CardViewerProps {
  card: narutoCardInterface;
  isAuthenticated: boolean;
  onClickFavBtn?: () => void;
  hasRemoveBtn?: boolean;
  onRemove?: () => void;
  hasFavBtn?: boolean;
}
const CardViewer = ({
  isAuthenticated = true,
  card,
  hasFavBtn,
  hasRemoveBtn,
  onRemove,
  onClickFavBtn
}: CardViewerProps) => {
  const t = useTranslations('cardViewer');
  const { push } = useRouter();
  const [openSignModal, setOpenSignModal] = useState(false);
  const [openRemoveModal, setOpenRemoveModal] = useState(false);
  const [cardQuantity, setCardQuantity] = useState<number>(0);

  const handleOpen = () => setOpenSignModal(true);
  const handleClose = () => setOpenSignModal(false);
  const handleOpenCardModal = () => setOpenRemoveModal(true);
  const handleCloseCardModal = () => setOpenRemoveModal(false);
  const StyledIconButton = styled(IconButton)(() => ({
    '&:hover': {
      backgroundColor: 'transparent',
      color: theme.palette.secondary.main
    }
  }));
  useEffect(() => {
    setCardQuantity(cardQuantity);
  }, [cardQuantity]);

  const incrementQuantity = () => {
    setCardQuantity(prevQuantity => {
      if (prevQuantity === null) {
        return card.quantity + 1;
      } else {
        return prevQuantity + 1;
      }
    });
  };
  const onRemoveCard = () => {
    onRemove?.();
    handleCloseCardModal();
  };
  const decrementQuantity = () => {
    if (cardQuantity === 0) return;
    setCardQuantity(prevQuantity => {
      if (prevQuantity === null) {
        return card.quantity - 1;
      } else {
        return cardQuantity - 1;
      }
    });
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
      ></DialogModal>

      <DialogModal
        title={t('dialogModalRemoveCard')}
        description={t('dialogModalRemoveCardDesc')}
        open={openRemoveModal}
        handleClose={handleCloseCardModal}
        confirmAction={onRemoveCard}
        confirmLabel={t('dialogModalRemoveCardConfirm')}
        cancelLabel={t('dialogModalBtnCancel')}
      ></DialogModal>
      <Box
        sx={{
          display: 'inline-block',
          p: 1,
          borderRadius: '16px',
          border: '1px solid ',
          borderColor: 'offWhite.light'
        }}
      >
        <Stack direction="row">
          <Stack direction="column">
            <img
              src={card.imgSrc}
              style={{ maxWidth: '200px', width: '100%', height: 'auto' }}
            />

            <Stack direction="row" justifyContent="space-between" mt={1}>
              <Chip
                variant="outlined"
                label={card?.code}
                sx={{ fontWeight: 500 }}
              />
              {hasRemoveBtn && (
                <IconButton size="small" onClick={handleOpenCardModal}>
                  <DeleteOutlineRounded />
                </IconButton>
              )}
              {hasFavBtn && (
                <IconButton
                  size="small"
                  color={card?.hasFavorite ? 'red' : 'primary'}
                  onClick={isAuthenticated ? onClickFavBtn : handleOpen}
                >
                  {isAuthenticated ? (
                    card?.hasFavorite ? (
                      <Favorite fontSize="small" />
                    ) : (
                      <FavoriteBorderOutlined fontSize="small" />
                    )
                  ) : (
                    <Favorite fontSize="small" />
                  )}
                </IconButton>
              )}
            </Stack>
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
              <StyledIconButton
                aria-label="decrement"
                onClick={decrementQuantity}
              >
                <RemoveRounded />
              </StyledIconButton>
              <Input
                variant="filled"
                textAlign="center"
                sx={{ width: '64px', mx: '4px' }}
                value={cardQuantity !== null ? cardQuantity : card.quantity}
              ></Input>
              <StyledIconButton
                aria-label="increment"
                onClick={incrementQuantity}
              >
                <AddRounded />
              </StyledIconButton>
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

export default CardViewer;
