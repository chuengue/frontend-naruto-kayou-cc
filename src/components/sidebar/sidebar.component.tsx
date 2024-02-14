'use client';
import { SidebarOption, sidebarOptions } from '@/constants/sidebarOptions';
import { AuthContext } from '@/contexts/authContext/authContext';
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react';
import { Menu, MenuItem, Sidebar, SubMenu } from 'react-pro-sidebar';
function SidebarNav() {
  const { push } = useRouter();
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
    <div
      style={{
        display: 'flex',
        height: '100vh'
      }}
    >
      <Sidebar style={{ flex: '0 0 auto' }}>
        <Menu>
          {sidebarOptions.map(option => {
            return option.children ? (
              <SubMenu
                label={option.title}
                key={option.title}
                onClick={() => push(option.path)}
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
                    key={option.title}
                    onClick={() => push(option.path)}
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
    </div>
  );
}

export default SidebarNav;
