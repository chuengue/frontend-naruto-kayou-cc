import { Logout, Person } from '@mui/icons-material';
import { ReactNode } from 'react';
import { MenuItemProps } from 'react-pro-sidebar';

export interface HeaderMenuOptionProps {
  title: string;
  onClick?: () => void;
  icon?: ReactNode;
  children?: MenuItemProps[];
}

export const headerMenuOptions: HeaderMenuOptionProps[] = [
  {
    title: 'Meu perfil',
    onClick: () => {},
    icon: <Person />
  },
  {
    title: 'Sair',
    icon: <Logout />
  }
];
