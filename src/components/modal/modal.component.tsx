'use client';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Modal, Stack, Typography } from '@mui/material';
import { modalStyle } from './modal.styles';
import { ModalComponentProps } from './modal.types';

const ModalComponent = ({
  children,
  handleClose,
  hasCloseIcon = true,
  title = '',
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
            <Stack direction="row" justifyContent="space-between">
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                pl={1}
              >
                {title}
              </Typography>
              <CloseIcon
                onClick={handleClose}
                sx={{ cursor: 'pointer' }}
                fontSize="12px"
              />
            </Stack>
          )}
          <Box p={1}>{children}</Box>
        </Box>
      </>
    </Modal>
  );
};

export default ModalComponent;
