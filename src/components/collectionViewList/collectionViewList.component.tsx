'use client';
import { Box, Grid, Stack, Typography } from '@mui/material';
import { CollectionViewer } from '..';
import Button from '../button';
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

  const handleToggleShowAll = () => {
    // setShowAll(prev => !prev);
  };
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
        <Box
          sx={{
            background:
              'linear-gradient(to bottom, rgba(255,255,255,0) 0%, #ffffff 100%)',
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '160px',
            textAlign: 'center',
            borderRadius: '0 0 16px 16px',
            py: 2
          }}
        >
          <Stack justifyContent="end" alignItems="center" height="100%">
            <Button
              onClick={handleToggleShowAll}
              styled="containedStyle"
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
              ver mais
            </Button>
          </Stack>
        </Box>
      )}
    </Box>
  );
}

export default CollectionViewList;
