export interface DialogModalProps {
  title?: string;
  description?: string;
  open: boolean;
  handleClose: () => void;
  confirmAction: () => void;
  cancelAction?: () => void;
  cancelLabel?: string;
  confirmLabel: string;
}
