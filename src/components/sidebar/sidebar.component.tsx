'use client';
import { SidebarOption, useSidebarOptions } from '@/constants/sidebarOptions';
import { UseAuth } from '@/contexts/authContext/authContext';
import { usePathname, useRouter } from '@/navigation';
import { useSidebarStore } from '@/stores/auth/sidebarStore';
import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
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

function SidebarNav() {
  const { push } = useRouter();
  const pathname = usePathname();
  const { sidebarOptions } = useSidebarOptions();
  const { isCollapsed, toggled, setClosed, toggleCollapsed } = useSidebarStore(
    useShallow(state => ({
      isCollapsed: state.state.isCollapsed,
      toggled: state.state.isClosed,
      setClosed: state.actions.setClosed,
      toggleCollapsed: state.actions.toggleCollapsed
    }))
  );
  const { userData } = UseAuth();
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
      fontWeight: 400,
      marginTop: '10px'
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
      backgroundColor: '#fff'
    },
    button: ({ active }) => ({
      marginLeft: '10px',
      marginRight: '10px',
      [`&.${menuClasses.disabled}`]: {
        color: theme.palette.grey[400]
      },
      '&:hover': {
        backgroundColor: theme.palette.offWhite.main,
        borderRadius: '16px'
      },
      backgroundColor: active ? theme.palette.offWhite.main : 'inherit',
      borderRadius: '16px'
    }),
    label: ({ open }) => ({
      fontWeight: open ? 600 : undefined
    })
  };
  const [classNameBar, setClassNameBar] = useState<string | null>(null);

  useEffect(() => {
    if (isCollapsed === true) {
      setClassNameBar('ps-collapsed');
    }
    if (isMobile === true) {
      return setClassNameBar('ps-sidebar-root ps-broken');
    }
    if (isMobile === false) {
      return setClassNameBar('ps-sidebar-root');
    }
  }, [isCollapsed]);
  if (!classNameBar) {
    return null;
  }
  return (
    <Box display="flex" height="100vh">
      <Sidebar
        className={classNameBar}
        style={{ flex: '0 0 auto' }}
        toggled={toggled}
        onBackdropClick={() => setClosed(false)}
        collapsed={isCollapsed}
        backgroundColor="#fff"
        breakPoint="md"
        rootStyles={{
          color: theme.palette.secondary.main,
          border: 'none'
        }}
      >
        <Menu menuItemStyles={menuItemStyles}>
          {sidebarOptions.map(option => {
            return option.children ? (
              <SubMenu
                label={<Typography fontWeight="400">{option.title}</Typography>}
                active={pathname === option.path}
                key={option.title}
                icon={option.icon}
              >
                <React.Fragment>
                  {option.children.map(
                    subOption =>
                      filterSidebarOption(subOption) && (
                        <MenuItem
                          active={pathname === option.path}
                          key={subOption.title}
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
                    <Typography fontWeight="400">{option.title}</Typography>
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
