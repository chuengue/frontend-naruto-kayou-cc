import { ReactNode } from 'react';

export interface HeaderMenuOptionProps {
  title: string;
  onClick?: () => void;
  icon?: ReactNode;
}
