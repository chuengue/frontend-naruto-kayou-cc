'use client';
import { Person } from '@mui/icons-material';
import { Box, Skeleton, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

export interface ItemListProps {
  id: string;
  title: string;
  subtitle?: string;
  imgSrc?: string;
  author?: string;
  onClick?: (id: string) => void;
  isLoading: boolean;
}

function ItemList({
  title,
  subtitle,
  imgSrc,
  id,
  onClick,
  author,
  isLoading
}: ItemListProps) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [coverImage, setCoverImage] = useState('');

  useEffect(() => {
    if (imgSrc) {
      const preloadedImage = new Image();
      preloadedImage.onload = () => {
        setCoverImage(preloadedImage.src);
        setIsImageLoaded(true);
      };
      preloadedImage.onerror = () => {
        setIsImageLoaded(true);
        setCoverImage('/assets/error_image.png');
      };
      preloadedImage.src = imgSrc;
    }
  }, [imgSrc]);
  return (
    <>
      {isLoading ? (
        <Stack direction="row" alignItems="center" p="12px">
          <Skeleton
            animation="wave"
            variant="rectangular"
            sx={{
              borderRadius: '12px',

              p: '12px'
            }}
            width="100%"
            height="50px"
          />
        </Stack>
      ) : (
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          onClick={() => onClick?.(id)}
          p="12px"
          sx={{
            cursor: 'pointer',
            borderRadius: '12px',
            '&:hover': {
              backgroundColor: 'offWhite.dark'
            }
          }}
        >
          <Stack direction="row">
            {!!imgSrc && (
              <Box ml="16px" mr="24px" width="50px">
                {!isImageLoaded ? (
                  <Skeleton
                    animation="wave"
                    variant="rectangular"
                    width="50px"
                    height="auto"
                  />
                ) : (
                  <img
                    src={coverImage.toString()}
                    width="100%"
                    height="100%"
                    alt={title} // Adicionei o atributo alt para acessibilidade
                  />
                )}
              </Box>
            )}
            <Stack>
              <Typography color="primary">{title}</Typography>
              <Typography color="primary" fontStyle="italic" variant="caption">
                {subtitle}
              </Typography>
            </Stack>
          </Stack>
          {!!author && (
            <Stack direction="row">
              <Person fontSize="small" color="primary" sx={{ mr: '4px' }} />
              <Typography color="primary" variant="caption">
                {author}
              </Typography>
            </Stack>
          )}
        </Stack>
      )}
    </>
  );
}

export default ItemList;
