import { ModalOwnProps } from '@mui/material';

export interface ModalComponentProps extends ModalOwnProps {
  hasCloseIcon?: boolean;
  open: boolean;
  title?: string;
  handleClose: () => void;
}
