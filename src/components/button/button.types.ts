import { ButtonProps } from '@mui/material';
import { ReactNode } from 'react';

export interface ButtonComponentProps extends Omit<ButtonProps, 'color'> {
  children: ReactNode;
  isLoading?: boolean;
  titleSize?: number;
}
