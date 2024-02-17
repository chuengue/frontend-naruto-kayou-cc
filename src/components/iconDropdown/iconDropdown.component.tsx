'use client';
import {
  Divider,
  IconButton,
  Menu,
  MenuItem,
  MenuProps,
  SvgIconOwnProps,
  Typography,
  alpha,
  styled
} from '@mui/material';
import React, { ReactElement, useState } from 'react';
import { HeaderMenuOptionProps } from '../header/header.types';

export interface IconDropdownProps {
  options: HeaderMenuOptionProps[];
  icon: ReactElement;
  iconColor?: SvgIconOwnProps['color'];
}

const IconDropdown = ({
  options,
  icon,
  iconColor = 'secondary'
}: IconDropdownProps) => {
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
    <div>
      <IconButton onClick={handleOpenUserMenu} size="small" sx={{ padding: 0 }}>
        {React.cloneElement(icon, {
          color: iconColor
        })}
      </IconButton>
      <StyledMenu open={Boolean(anchorElUser)} onClose={handleCloseUserMenu}>
        {options.map((item, index) => (
          <div key={item.title}>
            <MenuItem
              key={item.title}
              onClick={item.onClick}
              selected={item.selected}
            >
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
            {index < options.length - 1 && (
              <Divider orientation="horizontal" variant="fullWidth" />
            )}
          </div>
        ))}
      </StyledMenu>
    </div>
  );
};

export default IconDropdown;
