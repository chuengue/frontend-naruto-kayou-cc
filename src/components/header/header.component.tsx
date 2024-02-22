'use client';
import { UseAuth } from '@/contexts/authContext/authContext';
import { useSidebarStore } from '@/stores/auth/sidebarStore';
import { MenuOpen, Search } from '@mui/icons-material';
import {
  AppBar,
  Box,
  Divider,
  IconButton,
  Skeleton,
  Stack,
  Toolbar
} from '@mui/material';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import Button from '../button';
import Input from '../input';
import UserMenuHeader from './components/headerMenuAvatar';
import SwitchLocale from './components/switchLocale';
const Header = () => {
  const [isLoading, setIsLoading] = useState(true);
  const t = useTranslations('header');
  const { toggleClosed } = useSidebarStore(
    useShallow(state => ({
      toggled: state.state.isClosed,
      toggleClosed: state.actions.toggleClosed
    }))
  );
  const { isAuthenticated, getUserFetchLoading } = UseAuth();
  const { push } = useRouter();
  useEffect(() => {
    setIsLoading(getUserFetchLoading);
  }, [getUserFetchLoading, isAuthenticated]);
  return (
    <Box mx={3}>
      <AppBar
        position="static"
        sx={{ flex: '0 0 auto', bgcolor: 'transparent', boxShadow: 'none' }}
      >
        <Toolbar disableGutters>
          <Stack
            display="grid"
            direction="row"
            gridTemplateAreas={"'a b c' 'a b c'"}
            gridTemplateColumns="2fr 1fr 1fr"
            gridTemplateRows="auto"
            rowGap={{ xs: '12px', sm: '12px', md: 0 }}
            columnGap={1}
            spacing={2}
            justifyContent="space-between"
            alignItems="center"
            width="100%"
            my={2}
          >
            <Stack
              gridColumn={{
                xs: 'a-start / c-end',
                md: 'a-start',
                lg: 'a-start'
              }}
              style={{ marginLeft: '0px' }}
              gridRow={{ xs: 2, sm: 2, md: 1, lg: 1 }}
            >
              <Input
                placeholder="Buscar"
                variant="filled"
                endContent={<Search />}
              />
            </Stack>
            {isLoading ? (
              <Stack
                gridRow={1}
                gridColumn={{
                  sm: 'a-start/c-end',
                  xs: 'a-start/c-end',
                  md: 'b-start/c-end',
                  lg: 'c-start'
                }}
                justifySelf="end"
              >
                <Skeleton
                  variant="rectangular"
                  width="123px"
                  height="53px"
                  animation="wave"
                  sx={{
                    borderRadius: '25px'
                  }}
                />
              </Stack>
            ) : (
              <>
                <Stack
                  direction="row"
                  spacing={2}
                  gridRow={1}
                  alignItems="center"
                  gridColumn="a-start"
                  sx={{ display: { sm: 'flex', md: 'none', lg: 'none' } }}
                >
                  <IconButton
                    size="large"
                    aria-haspopup="true"
                    color="secondary"
                    onClick={() => toggleClosed()}
                    sx={{ rotate: '180deg' }}
                  >
                    <MenuOpen />
                  </IconButton>
                </Stack>

                <Stack
                  gridRow={1}
                  gridColumn={{
                    sm: 'a-start/c-end',
                    xs: 'a-start/c-end',
                    md: 'b-start/c-end',
                    lg: 'c-start'
                  }}
                  direction="row"
                  alignItems="center"
                  bgcolor="offWhite.main"
                  px={2}
                  py={1}
                  borderRadius="25px"
                  justifySelf="end"
                >
                  {isAuthenticated ? (
                    <UserMenuHeader />
                  ) : (
                    <>
                      <Button
                        variant="text"
                        size="small"
                        styled="textButtonStyle"
                        titleSize="1.1em"
                        rounded
                        onClick={() => {
                          push('/register');
                        }}
                      >
                        {t('signUpBtn')}
                      </Button>
                      <Divider
                        orientation="vertical"
                        variant="middle"
                        sx={{ mx: '8px' }}
                        flexItem
                      />
                      <Button
                        variant="text"
                        size="small"
                        styled="textButtonStyle"
                        titleSize="1.1em"
                        rounded
                        onClick={() => {
                          push('/login');
                        }}
                      >
                        {t('signInBtn')}
                      </Button>
                      <Divider
                        orientation="vertical"
                        variant="middle"
                        sx={{ mx: '8px' }}
                        flexItem
                      />
                      <SwitchLocale />
                    </>
                  )}
                </Stack>
              </>
            )}
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
