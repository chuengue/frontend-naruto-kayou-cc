'use client';
import { Person } from '@mui/icons-material';
import { Box, Paper, Stack, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import { CollectionViewerProps } from './collectionViewer.types';

const CollectionViewer = ({
  id,
  isPublic,
  title,
  userData
}: CollectionViewerProps) => {
  const t = useTranslations('collectionViewer');
  return (
    <Box
      sx={{
        display: 'inline-block',
        borderColor: 'offWhite.light',
        cursor: 'pointer',
        transition: 'transform 0.3s ease',
        '&:hover': {
          transform: 'scale(1.01)'
        }
      }}
    >
      <Paper elevation={3} sx={{ padding: 1, borderRadius: '16px' }}>
        <Stack>
          <Box
            id="img"
            sx={{
              width: '320px',
              height: '150px',
              borderRadius: '16px',
              backgroundSize: 'cover',
              backgroundPosition: 'top',
              boxShadow: 1,
              backgroundImage:
                'url("https://s3.amazonaws.com/naruto-kayou-cards/cards-image/R-001.jpg")'
            }}
          ></Box>
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
                74
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
