import { AuthProvider } from '@/contexts/authContext/authContext';
import { ReactQueryClientProvider } from '@/services/queryClient';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material/styles';

import CustomNextIntlClientProvider from '@/providers/NextIntlClientProvider';
import { NotiStackProvider } from '@/services/notistackProvider';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { useMessages } from 'next-intl';
import theme from '../../../theme/theme';
import './globals.css';
// export const metadata: Metadata = {
//   title: 'Create Next App',
//   description: 'Generated by create next app'
// };

interface RootLayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}

export default function RootLayout({
  children,
  params: { locale }
}: Readonly<RootLayoutProps>) {
  const messages = useMessages();
  return (
    <html lang={locale}>
      <body>
        <ReactQueryClientProvider>
          <CustomNextIntlClientProvider locale={locale} messages={messages}>
            <NotiStackProvider>
              <ThemeProvider theme={theme}>
                <AuthProvider>
                  <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
                </AuthProvider>
              </ThemeProvider>
            </NotiStackProvider>
          </CustomNextIntlClientProvider>
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}