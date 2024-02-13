import { Typography } from '@mui/material';
import { useSnackbar } from 'notistack';

const useSnackbarHandler = () => {
  const { enqueueSnackbar } = useSnackbar();

  const showSnackbar = (message: string, options = {}) => {
    enqueueSnackbar(<Typography>{message}</Typography>, {
      variant: 'default',
      ...options
    });
  };

  const showSuccessSnackbar = (message: string, options = {}) => {
    enqueueSnackbar(<Typography>{message}</Typography>, {
      variant: 'success',
      ...options
    });
  };

  const showErrorSnackbar = (message: string, options = {}) => {
    enqueueSnackbar(<Typography>{message}</Typography>, {
      variant: 'error',
      ...options
    });
  };

  return {
    showSnackbar,
    showSuccessSnackbar,
    showErrorSnackbar
  };
};

export default useSnackbarHandler;
