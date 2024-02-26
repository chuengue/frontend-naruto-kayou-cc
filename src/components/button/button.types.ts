import { ButtonOwnProps, ButtonProps } from '@mui/material/Button';
import { ReactNode } from 'react';

export interface ButtonComponentProps extends Omit<ButtonProps, 'color'> {
  children: ReactNode;
  color?: ButtonOwnProps['color'];
  isLoading?: boolean;
  titleSize?: number | string;
  rounded?: boolean;
  customStyles: any;
  styled?: 'OutlinedStyle' | 'containedStyle' | 'textButtonStyle';
}
