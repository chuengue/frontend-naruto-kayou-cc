'use client';
import { createTheme } from '@mui/material/styles';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap'
});

declare module '@mui/material/styles' {
  interface Palette {
    offWhite: Palette['primary'];
  }
}
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    offWhite: true;
  }
}
let theme = createTheme({
  // Theme customization goes here as usual, including tonalOffset and/or
  // contrastThreshold as the augmentColor() function relies on these
});

theme = createTheme(theme, {
  typography: {
    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
    fontSize: 30,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500
  },
  palette: {
    primary: theme.palette.augmentColor({
      color: {
        main: '#2b2c30'
      },
      name: 'primary'
    }),
    secondary: theme.palette.augmentColor({
      color: {
        main: '#f85c1f'
        // main: '#cdf463'
      },
      name: 'secondary'
    }),
    offWhite: theme.palette.augmentColor({
      color: {
        main: '#f2f2f2'
      },
      name: 'offWhite'
    })
  }
});
export default theme;
