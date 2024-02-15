import { AddBox, Favorite, Home, Lock, ViewModule } from '@mui/icons-material';
import { ReactNode } from 'react';
export interface submenuOptions {
  title: string;
  path: string;
}
export interface SidebarOption {
  title: string;
  counter?: number;
  path?: string;
  icon?: ReactNode;
  onlyFor?: string[];
  children?: submenuOptions[] | null;
}

export const sidebarOptions: SidebarOption[] = [
  {
    title: 'Home',
    path: '/home',
    icon: <Home />
  },
  {
    title: 'Coleções',
    icon: <ViewModule />,
    children: [
      { title: 'Nova coleção', path: '/new-collection' },
      { title: 'Minhas coleções', path: '/collections' }
    ]
  },
  {
    title: 'Lista de desejos',
    path: '/wishList',
    icon: <Favorite />
  },
  {
    title: 'Cadastro de Cards',
    path: '/card-registration',
    onlyFor: ['admin'],
    icon: <AddBox />
  },
  {
    title: 'Permissões',
    path: '/permissions',
    onlyFor: ['super_admin'],
    icon: <Lock />
  }
];
