'use client';
import { useRouter } from '@/navigation';
import { Box, Grid, Stack, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import { CollectionViewer } from '..';
import Button from '../button';
import { boxStyled } from './collectionViewList.styles';
import { collectionViewListProps } from './collectionViewList.types';

function CollectionViewList({
  collections,
  onClick,
  title,
  isCollapsed = false
}: collectionViewListProps) {
  const displayedCollections = isCollapsed
    ? collections.slice(0, 6)
    : collections;
  const { push } = useRouter();
  const t = useTranslations('collectionViewer');
  return (
    <Box position="relative" maxWidth="1456px">
      {!!title && (
        <Typography ml="32px" variant="h6" color="primary">
          {title}
        </Typography>
      )}

      <Grid container spacing={2}>
        {displayedCollections.map((collection, index) => (
          <Grid item key={index}>
            <CollectionViewer
              cardQuantity={collection.cardQuantity}
              coverImgUrl={collection.coverImgUrl}
              id={collection.id}
              isPublic={collection.isPublic}
              title={collection.title}
              userData={collection.userData}
              onClick={onClick}
            />
          </Grid>
        ))}
      </Grid>
      {isCollapsed && (
        <Box sx={boxStyled}>
          <Stack justifyContent="end" alignItems="center" height="100%">
            <Button
              styled="containedStyle"
              onClick={() => push(`public-collections`)}
              rounded
              customStyles={{
                px: '20px',
                py: '0px',
                fontSize: '.9rem',
                backgroundColor: 'offWhite.main',
                color: 'primary.main'
              }}
              size="small"
            >
              {t('viewMoreButton')}
            </Button>
          </Stack>
        </Box>
      )}
    </Box>
  );
}

export default CollectionViewList;
