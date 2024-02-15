'use client';
import { SidebarOption, sidebarOptions } from '@/constants/sidebarOptions';
import { AuthContext } from '@/contexts/authContext/authContext';
import { useSidebarStore } from '@/stores/auth/sidebarStore';
import { Box, Divider, Typography } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import React, { useContext } from 'react';
import {
  Menu,
  MenuItem,
  MenuItemStyles,
  Sidebar,
  SubMenu,
  menuClasses
} from 'react-pro-sidebar';
import { useShallow } from 'zustand/react/shallow';
import theme from '../../../theme/theme';
import SidebarHeader from './components/sidebarHeader.component';
function SidebarNav() {
  const { push } = useRouter();
  const pathname = usePathname();

  const { isCollapsed, toggled, setClosed } = useSidebarStore(
    useShallow(state => ({
      isCollapsed: state.state.isCollapsed,
      toggled: state.state.isClosed,
      setClosed: state.actions.setClosed
    }))
  );
  const { userData } = useContext(AuthContext);
  function filterSidebarOption(option: SidebarOption) {
    if (option.onlyFor && option.onlyFor.length > 0) {
      if (userData?.roles.some(role => option.onlyFor?.includes(role))) {
        return option;
      }
      return null;
    }
    return option;
  }
  const menuItemStyles: MenuItemStyles = {
    root: {
      fontSize: '13px',
      fontWeight: 400
    },
    icon: {
      color: theme.palette.secondary.main,
      [`&.${menuClasses.disabled}`]: {
        color: theme.palette.grey[400]
      }
    },
    SubMenuExpandIcon: {
      color: '#b6b7b9'
    },
    subMenuContent: {
      backgroundColor: theme.palette.primary.main
    },
    button: {
      marginLeft: '10px',
      marginRight: '10px',
      [`&.${menuClasses.disabled}`]: {
        color: theme.palette.grey[400]
      },
      '&:hover': {
        backgroundColor: theme.palette.primary.light,
        borderRadius: '16px'
        // color: theme.palette.primary.main,
        // fontWeight: 'medium',
        // '& .ps-menu-icon': {
        //   color: theme.palette.primary.main
        // }
      }
    },
    label: ({ open }) => ({
      fontWeight: open ? 600 : undefined
    })
  };
  return (
    <Box display="flex" height="100vh">
      <Sidebar
        style={{ flex: '0 0 auto' }}
        toggled={toggled}
        onBackdropClick={() => setClosed(false)}
        collapsed={isCollapsed}
        breakPoint="md"
        backgroundColor={theme.palette.primary.main}
        rootStyles={{
          color: theme.palette.secondary.main
        }}
      >
        <SidebarHeader></SidebarHeader>
        <Divider
          flexItem
          variant="middle"
          sx={{ backgroundColor: 'primary.light', mb: '16px' }}
        />
        <Menu menuItemStyles={menuItemStyles}>
          {sidebarOptions.map(option => {
            return option.children ? (
              <SubMenu
                label={<Typography fontWeight="500">{option.title}</Typography>}
                key={option.title}
                icon={option.icon}
              >
                {option.children.map(subOption => (
                  <MenuItem
                    icon={subOption.icon}
                    key={subOption.title}
                    onClick={() => push(subOption.path)}
                  >
                    <Typography fontWeight="400" variant="body2">
                      {subOption.title}
                    </Typography>
                  </MenuItem>
                ))}
              </SubMenu>
            ) : (
              <React.Fragment key={option.title}>
                {filterSidebarOption(option) && (
                  <MenuItem
                    active={pathname === option.path}
                    key={option.title}
                    onClick={() => {
                      option.path ? push(option.path) : null;
                    }}
                    icon={option.icon}
                  >
                    <Typography fontWeight="500">{option.title}</Typography>
                  </MenuItem>
                )}
              </React.Fragment>
            );
          })}
        </Menu>
      </Sidebar>
    </Box>
  );
}

export default SidebarNav;
