'use client';
import { SidebarOption, useSidebarOptions } from '@/constants/sidebarOptions';
import { UseAuth } from '@/contexts/authContext/authContext';
import { useSidebarStore } from '@/stores/auth/sidebarStore';
import { Box, Divider, Typography } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
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
  const { sidebarOptions } = useSidebarOptions();
  const { isCollapsed, toggled, setClosed } = useSidebarStore(
    useShallow(state => ({
      isCollapsed: state.state.isCollapsed,
      toggled: state.state.isClosed,
      setClosed: state.actions.setClosed
    }))
  );
  const { userData, getUserFetchLoading } = UseAuth();
  function filterSidebarOption(option: SidebarOption) {
    if (option.onlyFor && option.onlyFor.length > 0) {
      if (userData?.roles.some(role => option.onlyFor?.includes(role))) {
        return option;
      }
      return null;
    }
    return option;
  }
  console.log({ getUserFetchLoading });
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
        <SidebarHeader />
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
                <React.Fragment>
                  {option.children.map(
                    subOption =>
                      filterSidebarOption(subOption) && (
                        <MenuItem
                          key={subOption.title} // Corrigido: a chave deve ser definida no MenuItem
                          onClick={() => push(subOption.path)}
                          icon={subOption.icon}
                        >
                          <Typography
                            fontWeight="400"
                            variant="body2"
                            textOverflow={'clip'}
                          >
                            {subOption.title}
                          </Typography>
                        </MenuItem>
                      )
                  )}
                </React.Fragment>
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
