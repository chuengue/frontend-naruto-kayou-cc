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
import {
  Box,
  Chip,
  Divider,
  IconButton,
  Skeleton,
  Stack,
  Typography
} from '@mui/material';
import { useTranslations } from 'next-intl';
import { forwardRef, useEffect, useState } from 'react';
import { BrowserView, MobileView, isMobile } from 'react-device-detect';
import DialogModal from '../dialogModal/dialogModal.component';
import Input from '../input';
import { BoxStyled, StyledIconButton } from './cardViewer.style';
import { CardViewerProps } from './cardViewer.type';

const CardViewer = forwardRef(
  (
    {
      cardProps,
      componentProps
    }: {
      cardProps: narutoCardInterface;
      componentProps: CardViewerProps;
    },
    ref
  ) => {
    const t = useTranslations('cardViewer');
    const { push } = useRouter();
    const [openSignModal, setOpenSignModal] = useState(false);
    const [openRemoveModal, setOpenRemoveModal] = useState(false);
    const [cardQuantity, setCardQuantity] = useState<number>(0);

    const handleOpen = () => setOpenSignModal(true);
    const handleClose = () => setOpenSignModal(false);
    const handleOpenCardModal = () => setOpenRemoveModal(true);
    const handleCloseCardModal = () => setOpenRemoveModal(false);
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const [coverImage, setCoverImage] = useState<unknown>(null);
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

    useEffect(() => {
      const preloadedImage = new Image();
      preloadedImage.onload = () => {
        setCoverImage(preloadedImage.src);
        setIsImageLoaded(true);
      };
      preloadedImage.onerror = () => {
        setIsImageLoaded(true);
        setCoverImage('/assets/error_image.png');
      };
      preloadedImage.src = cardProps.imgSrc;
    }, [cardProps.imgSrc]);
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
        <Box sx={BoxStyled} ref={ref}>
          <Stack direction="row">
            <Stack direction="column">
              {isImageLoaded ? (
                !!coverImage && (
                  <img
                    src={coverImage.toString()}
                    style={{
                      maxWidth: isMobile ? '140px' : '200px',
                      height: 'auto'
                    }}
                  />
                )
              ) : (
                <Skeleton
                  variant="rectangular"
                  width={isMobile ? '140px' : '200px'}
                  height={isMobile ? '155px' : '282px'}
                  animation="wave"
                  sx={{
                    borderRadius: '12px'
                  }}
                />
              )}

              <Stack direction="row" justifyContent="space-between" mt={1}>
                <MobileView
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginLeft: '4px'
                  }}
                >
                  <Typography
                    fontWeight={400}
                    variant="body2"
                    textAlign="center"
                  >
                    {cardProps?.code}
                  </Typography>
                </MobileView>
                <BrowserView>
                  <Chip
                    variant="outlined"
                    label={cardProps?.code}
                    sx={{ fontWeight: 500 }}
                  />
                </BrowserView>

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
  }
);
CardViewer.displayName = 'CardViewer';
export default CardViewer;
