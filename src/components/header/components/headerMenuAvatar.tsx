'use client';
import { IconDropdown } from '@/components';
import { UseAuth } from '@/contexts/authContext/authContext';
import { LogoutRounded, Person } from '@mui/icons-material';
import { Avatar, Divider, Tooltip } from '@mui/material';
import { useTranslations } from 'next-intl';
import { HeaderMenuOptionProps } from '../header.types';
import SwitchLocale from './switchLocale';

const UserMenuHeader = () => {
  const { signOut, userData } = UseAuth();

  const t = useTranslations('header');

  const profileMenuOptions: HeaderMenuOptionProps[] = [
    {
      title: t('myProfile'),
      icon: <Person />,
      onClick: () => {}
    },
    {
      title: t('logout'),
      icon: <LogoutRounded />,
      onClick: signOut
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
      <SwitchLocale />
      <Divider
        orientation="vertical"
        variant="middle"
        sx={{ marginRight: '8px', marginLeft: '4px' }}
        flexItem
      />
      <Tooltip title={t('myProfileTooltip')}>
        <div>
          <IconDropdown
            options={profileMenuOptions}
            icon={
              <Avatar
                sx={{
                  backgroundColor: 'primary.light'
                }}
              >
                {getInitials(userData?.firstName + ' ' + userData?.lastName)}
              </Avatar>
            }
          />
        </div>
      </Tooltip>
    </>
  );
};

export default UserMenuHeader;
