import { ModalOwnProps } from '@mui/material';

export interface ModalComponentProps extends ModalOwnProps {
  hasCloseIcon?: boolean;
  open: boolean;
  handleClose: () => void;
}
