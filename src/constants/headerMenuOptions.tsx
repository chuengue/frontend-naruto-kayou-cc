import { Logout, Person } from '@mui/icons-material';
import { ReactNode } from 'react';

export interface HeaderMenuOptionProps {
  title: string;
  onClick?: () => void;
  icon?: ReactNode;
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
