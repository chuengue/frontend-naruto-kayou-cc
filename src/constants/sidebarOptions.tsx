import {
  AddBoxOutlined,
  AddToPhotosOutlined,
  AutoAwesomeMotionOutlined,
  FavoriteBorderOutlined,
  HomeOutlined,
  LockOutlined,
  PaddingOutlined
} from '@mui/icons-material';
import { ReactNode } from 'react';
export interface submenuOptions {
  title: string;
  icon?: ReactNode;
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
    icon: <HomeOutlined />
  },
  {
    title: 'Coleções',
    icon: <PaddingOutlined />,
    children: [
      {
        title: 'Nova coleção',
        path: '/new-collection',
        icon: <AddToPhotosOutlined />
      },
      {
        title: 'Minhas coleções',
        path: '/collections',
        icon: <AutoAwesomeMotionOutlined />
      }
    ]
  },
  {
    title: 'Lista de desejos',
    path: '/wishList',
    icon: <FavoriteBorderOutlined />
  },
  {
    title: 'Cadastro de Cards',
    path: '/card-registration',
    onlyFor: ['admin'],
    icon: <AddBoxOutlined />
  },
  {
    title: 'Permissões',
    path: '/permissions',
    onlyFor: ['super_admin'],
    icon: <LockOutlined />
  }
];
