'use client';
import { IconDropdown } from '@/components';
import { UseAuth } from '@/contexts/authContext/authContext';
import { usePathname, useRouter } from '@/navigation';
import { HdrWeak, LogoutRounded, Person, Translate } from '@mui/icons-material';
import { Avatar, CircularProgress, Divider, Tooltip } from '@mui/material';
import { useLocale, useTranslations } from 'next-intl';
import { useTransition } from 'react';
import { HeaderMenuOptionProps } from '../header.types';

const UserMenuHeader = () => {
  const { signOut, userData } = UseAuth();

  const t = useTranslations('header');

  const { replace } = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const locale = useLocale();
  function onSelectChange(nextLocale: string) {
    if (locale === nextLocale) return;
    startTransition(() => {
      replace(pathname, { locale: nextLocale });
    });
  }

  const translateMenuOptions: HeaderMenuOptionProps[] = [
    {
      title: 'Ingles',
      icon: <HdrWeak />,
      selected: locale === 'en',
      onClick: () => onSelectChange('en')
    },
    {
      title: 'Portuguese',
      onClick: () => onSelectChange('pt'),
      selected: locale === 'pt',
      icon: <HdrWeak />
    }
  ];
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
      {isPending ? (
        <CircularProgress size={20} color="secondary" sx={{ mr: 1 }} />
      ) : (
        <Tooltip title={t('changeTranslateTooltip')}>
          <div>
            <IconDropdown options={translateMenuOptions} icon={<Translate />} />
          </div>
        </Tooltip>
      )}

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
