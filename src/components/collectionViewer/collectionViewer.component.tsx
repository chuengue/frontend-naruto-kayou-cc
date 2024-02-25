'use client';
import { Person } from '@mui/icons-material';
import { Box, Paper, Skeleton, Stack, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import {
  boxStyle,
  coverImgBoxStyle,
  imgStyle
} from './collectionViewer.styles';
import { CollectionViewerProps } from './collectionViewer.types';

const CollectionViewer = ({
  id,
  isPublic,
  title,
  userData,
  cardQuantity,
  coverImgUrl = 'https://s3.amazonaws.com/naruto-kayou-cards/cards-image/R-001.jpg',
  onClick
}: CollectionViewerProps) => {
  const t = useTranslations('collectionViewer');
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [coverImage, setCoverImage] = useState<unknown>(null);

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
    preloadedImage.src = coverImgUrl;
  }, [coverImgUrl]);

  return (
    <Box sx={boxStyle} onClick={() => onClick(id)}>
      <Paper elevation={3} sx={{ padding: 1, borderRadius: '16px' }}>
        <Stack>
          <Box sx={coverImgBoxStyle}>
            {isImageLoaded ? (
              !!coverImage && (
                <img src={coverImage.toString()} id="img" style={imgStyle} />
              )
            ) : (
              <Skeleton
                variant="rectangular"
                width="320px"
                height="150px"
                animation="wave"
              />
            )}
          </Box>
          <Stack
            id="description"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="start"
            sx={{
              borderRadius: '12px',
              backgroundColor: 'white',
              padding: '8px'
            }}
          >
            <Stack direction="column" justifyContent="start">
              <Typography
                fontWeight={500}
                color="primary.main"
                sx={{
                  mr: '2px'
                }}
              >
                {title}
              </Typography>
              <Typography
                variant="caption"
                fontStyle="italic"
                color="primary.main"
              >
                {isPublic ? t('public') : t('private')}
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="center">
              <Typography
                variant="caption"
                fontStyle="italic"
                color="primary.light"
                sx={{
                  mr: 1
                }}
              >
                {t('cardQuantity')}
              </Typography>
              <Typography variant="caption" color="primary.main">
                {cardQuantity}
              </Typography>
            </Stack>
          </Stack>
          <Stack
            flexDirection="row"
            alignContent="start"
            justifyContent="end"
            mr={1}
          >
            <Person fontSize="small" />
            <Typography variant="caption">{userData?.username}</Typography>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
};
export default CollectionViewer;
