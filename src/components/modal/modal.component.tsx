'use client';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Modal, Stack } from '@mui/material';
import { modalStyle } from './modal.styles';
import { ModalComponentProps } from './modal.types';
const ModalComponent = ({
  children,
  handleClose,
  hasCloseIcon = true,
  open
}: ModalComponentProps) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <>
        <Box sx={modalStyle}>
          {hasCloseIcon && (
            <Stack direction="row-reverse">
              <CloseIcon onClick={handleClose} sx={{ cursor: 'pointer' }} />
            </Stack>
          )}
          <Box p={1}>{children}</Box>
        </Box>
      </>
    </Modal>
  );
};

export default ModalComponent;
