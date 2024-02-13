'use client';
import { AuthProvider } from '@/contexts/authContext/authContext';
import { ReactQueryClientProvider } from '@/services/queryClient';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material/styles';

import { NotiStackProvider } from '@/services/notistackProvider';
import theme from '../../theme/theme';
import './globals.css';

// export const metadata: Metadata = {
//   title: 'Create Next App',
//   description: 'Generated by create next app'
// };

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryClientProvider>
      <html lang="en">
        <body>
          <NotiStackProvider>
            <ThemeProvider theme={theme}>
              <AuthProvider>
                <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
              </AuthProvider>
            </ThemeProvider>
          </NotiStackProvider>
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}
