import { styled } from '@mui/material';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';
import Button from '../button';
import { DialogModalProps } from './dialogModal.types';

function DialogModal({
  description,
  handleClose,
  cancelAction = handleClose,
  cancelLabel,
  confirmAction,
  confirmLabel,
  open,
  title
}: DialogModalProps) {
  const StyledDialog = styled((props: DialogProps) => <Dialog {...props} />)(
    () => ({
      '& .MuiDialog-paper': {
        borderRadius: '12px',
        padding: '8px'
      }
    })
  );
  return (
    <React.Fragment>
      <StyledDialog open={open} onClose={handleClose}>
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button styled="OutlinedStyle" onClick={cancelAction}>
            {cancelLabel}
          </Button>
          <Button color="secondary.main" onClick={confirmAction}>
            {confirmLabel}
          </Button>
        </DialogActions>
      </StyledDialog>
    </React.Fragment>
  );
}
export default DialogModal;
