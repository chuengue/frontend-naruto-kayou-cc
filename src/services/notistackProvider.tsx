'use client';
import { SnackbarProvider } from 'notistack';

export const NotiStackProvider = ({
  children
}: {
  children: React.ReactNode;
}) => (
  <SnackbarProvider anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
    {children}
  </SnackbarProvider>
);
