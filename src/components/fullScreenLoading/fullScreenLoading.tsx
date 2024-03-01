import { Box, CircularProgress } from '@mui/material';

const style = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(255, 255, 255, 0.5)' // cor de fundo com transparência
};

const LoadingScreen = () => {
  return (
    <Box sx={style}>
      <CircularProgress color="primary" />
    </Box>
  );
};

export default LoadingScreen;
