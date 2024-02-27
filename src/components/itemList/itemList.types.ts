import { ReactNode } from 'react';

export interface ItemListProps {
  id: string;
  title: string;
  subtitle?: string;
  imgSrc?: string;
  author?: string;
  onClick?: (id: string) => void;
  isLoading?: boolean;
  hasAction?: boolean;
  actionIcon?: ReactNode;
  onClickAction?: () => void;
}
