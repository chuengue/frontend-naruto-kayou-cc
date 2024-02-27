import {
  AddToPhotosOutlined,
  AdminPanelSettingsOutlined,
  AutoAwesomeMotionOutlined,
  ContentCopy,
  FavoriteBorderOutlined,
  HomeOutlined,
  LockOutlined,
  PaddingOutlined,
  StorageRounded,
  WorkspacePremium
} from '@mui/icons-material';
import { useTranslations } from 'next-intl';

export interface SubmenuOption {
  title: string;
  icon?: React.ReactNode;
  onlyFor?: string[];
  path: string;
}

export interface SidebarOption {
  title: string;
  counter?: number;
  path?: string;
  icon?: React.ReactNode;
  onlyFor?: string[];
  children?: SubmenuOption[] | null;
}

export const useSidebarOptions = () => {
  const t = useTranslations('sidebar');

  const sidebarOptions: SidebarOption[] = [
    {
      title: t('homeLabel'),
      path: '/home',
      icon: <HomeOutlined />
    },
    {
      title: t('allCards'),
      path: '/all-cards',
      icon: <ContentCopy />
    },
    {
      title: t('collectionsLabel'),
      icon: <PaddingOutlined />,
      children: [
        {
          title: t('newCollectionLabel'),
          path: '/new-collection',
          icon: <AddToPhotosOutlined />
        },
        {
          title: t('myCollectionsLabel'),
          path: '/collections',
          icon: <AutoAwesomeMotionOutlined />
        }
      ]
    },
    {
      title: t('wishListLabel'),
      path: '/wishList',
      icon: <FavoriteBorderOutlined />
    },
    {
      title: t('adminOperations'),
      path: '/admin-panel',
      onlyFor: ['admin'],
      icon: <AdminPanelSettingsOutlined />,
      children: [
        {
          title: t('cardBaseManagement'),
          path: '/card-manager',

          icon: <StorageRounded />
        },
        {
          title: t('permissionsLabel'),
          path: '/permission',
          onlyFor: ['super_admin'],
          icon: <WorkspacePremium />
        }
      ]
    },
    {
      title: 'Permissões',
      path: '/permissions',
      onlyFor: ['super_admin'],
      icon: <LockOutlined />
    }
  ];

  return { sidebarOptions };
};
