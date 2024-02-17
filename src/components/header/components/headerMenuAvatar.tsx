'use client';
import { IconDropdown } from '@/components';
import { UseAuth } from '@/contexts/authContext/authContext';
import { Logout, Menu, Person } from '@mui/icons-material';
import { Avatar, Divider } from '@mui/material';
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

  function getInitials(name: string) {
    const words = name.split(' ');

    let initials = '';

    for (let i = 0; i < words.length && i < 2; i++) {
      initials += words[i][0].toUpperCase();
    }

    return initials;
  }

  return (
    <>
      <IconDropdown options={headerMenuOptions} icon={<Menu />} />
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
    </>
  );
};

export default UserMenuHeader;
