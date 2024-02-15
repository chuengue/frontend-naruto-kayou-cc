import { Stack } from '@mui/material';

const SidebarHeader = () => {
  return (
    <Stack px={2} py={6} alignItems="center">
      <img
        src="assets/logo.png"
        alt="Logo"
        style={{ maxWidth: '120px', height: 'auto' }}
      />
    </Stack>
  );
};
export default SidebarHeader;
