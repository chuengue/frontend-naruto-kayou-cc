'use client';
import { useSidebarStore } from '@/stores/auth/sidebarStore';
import { Search } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Avatar,
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  MenuProps,
  Stack,
  Toolbar,
  Typography,
  alpha,
  styled
} from '@mui/material';
import React, { useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import Input from '../input';

const Header = () => {
  const { toggleClosed } = useSidebarStore(
    useShallow(state => ({
      toggled: state.state.isClosed,
      toggleClosed: state.actions.toggleClosed
    }))
  );
  const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const StyledMenu = styled((props: MenuProps) => (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      anchorEl={anchorElUser}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      {...props}
    />
  ))(({ theme }) => ({
    '& .MuiPaper-root': {
      borderRadius: '16px',
      backgroundColor: theme.palette.offWhite.light,
      marginTop: '45px',
      minWidth: 180,
      color: theme.palette.primary.main,
      boxShadow:
        'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
      '& .MuiMenu-list': {
        padding: '6px',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        '& .MuiMenuItem-root': {
          borderRadius: '8px'
        }
      },
      '& .MuiMenuItem-root': {
        '& .MuiSvgIcon-root': {
          fontSize: 18,
          color: theme.palette.text.secondary,
          marginRight: theme.spacing(1.5)
        },
        '&:active': {
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.action.selectedOpacity
          )
        }
      }
    }
  }));
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
            gridTemplateColumns="1fr 2fr 1fr"
            gridTemplateRows="auto"
            spacing={2}
            justifyContent="space-between"
            alignItems="center"
            width="100%"
          >
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
              >
                <MenuIcon />
              </IconButton>
            </Stack>
            <Stack
              gridColumn={{
                xs: 'a-start / c-end',
                md: 'a-end',
                lg: 'a-end'
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
            <Stack
              gridRow={1}
              gridColumn="c-end"
              direction="row"
              alignItems="center"
              bgcolor="offWhite.main"
              px={2}
              py={0.8}
              borderRadius="25px"
            >
              <IconButton onClick={handleOpenUserMenu} size="small">
                <MenuIcon color="secondary" style={{ fontSize: '28px' }} />
              </IconButton>
              <Divider
                orientation="vertical"
                variant="middle"
                sx={{ marginRight: '8px', marginLeft: '4px' }}
                flexItem
              />

              <Avatar
                sx={{
                  backgroundColor: 'primary.light'
                }}
              >
                US
              </Avatar>

              <StyledMenu
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting, index) => (
                  <div key={setting}>
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography
                        textAlign="center"
                        variant="button"
                        fontWeight="bold"
                        color="primary.light"
                      >
                        {setting}
                      </Typography>
                    </MenuItem>
                    {index < settings.length - 1 && (
                      <Divider orientation="horizontal" variant="fullWidth" />
                    )}
                  </div>
                ))}
              </StyledMenu>
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
