'use client';
import { UseAuth } from '@/contexts/authContext/authContext';
import { Logout, Person } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import {
  Avatar,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  MenuProps,
  Typography,
  alpha,
  styled
} from '@mui/material';
import React, { useState } from 'react';
import { HeaderMenuOptionProps } from '../header.types';

const UserMenuHeader = () => {
  const { signOut, userData } = UseAuth();

  const headerMenuOptions: HeaderMenuOptionProps[] = [
    {
      title: 'Meu perfil',
      onClick: () => {},
      icon: <Person />
    },
    {
      title: 'Sair',
      onClick: signOut,
      icon: <Logout />
    }
  ];

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  function getInitials(name: string) {
    const words = name.split(' ');

    let initials = '';

    for (let i = 0; i < words.length && i < 2; i++) {
      initials += words[i][0].toUpperCase();
    }

    return initials;
  }

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
    <>
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
        {getInitials(userData?.firstName + ' ' + userData?.lastName)}
      </Avatar>

      <StyledMenu open={Boolean(anchorElUser)} onClose={handleCloseUserMenu}>
        {headerMenuOptions.map((item, index) => (
          <div key={item.title}>
            <MenuItem key={item.title} onClick={item.onClick}>
              {item.icon}
              <Typography
                textAlign="center"
                variant="button"
                fontWeight="bold"
                color="primary.light"
              >
                {item.title}
              </Typography>
            </MenuItem>
            {index < headerMenuOptions.length - 1 && (
              <Divider orientation="horizontal" variant="fullWidth" />
            )}
          </div>
        ))}
      </StyledMenu>
    </>
  );
};

export default UserMenuHeader;
