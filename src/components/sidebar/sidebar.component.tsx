'use client';
import { SidebarOption, sidebarOptions } from '@/constants/sidebarOptions';
import { AuthContext } from '@/contexts/authContext/authContext';
import { useSidebarStore } from '@/stores/auth/sidebarStore';
import { Box } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import React, { useContext } from 'react';
import { Menu, MenuItem, Sidebar, SubMenu } from 'react-pro-sidebar';
import { useShallow } from 'zustand/react/shallow';
function SidebarNav() {
  const { push } = useRouter();
  const pathname = usePathname();

  const { isCollapsed, toggled, toggleCollapsed, setClosed } = useSidebarStore(
    useShallow(state => ({
      isCollapsed: state.state.isCollapsed,
      toggled: state.state.isClosed,
      toggleCollapsed: state.actions.toggleCollapsed,
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
  return (
    <Box display="flex" height="100vh">
      <Sidebar
        style={{ flex: '0 0 auto' }}
        toggled={toggled}
        onBackdropClick={() => setClosed(false)}
        collapsed={isCollapsed}
        breakPoint="md"
      >
        <Menu
          menuItemStyles={{
            button: ({ level, active, disabled }) => {
              if (level === 1)
                return {
                  color: disabled ? '#f5d9ff' : '#d359ff',
                  backgroundColor: active ? '#eecef9' : undefined
                };
            }
          }}
        >
          {sidebarOptions.map(option => {
            return option.children ? (
              <SubMenu
                label={option.title}
                key={option.title}
                icon={option.icon}
              >
                {option.children.map(subOption => (
                  <MenuItem
                    key={subOption.title}
                    onClick={() => push(subOption.path)}
                  >
                    {subOption.title}
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
                    {option.title}
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
