import { createTheme, responsiveFontSizes } from '@mui/material/styles'
import SatoshiBlack from '@/assets/fonts/Satoshi-Black.woff2'
import SatoshiBold from '@/assets/fonts/Satoshi-Bold.woff2'
import SatoshiLight from '@/assets/fonts/Satoshi-Light.woff2'
import SatoshiMedium from '@/assets/fonts/Satoshi-Medium.woff2'
import SatoshiRegular from '@/assets/fonts/Satoshi-Regular.woff2'

const baseTheme = createTheme({
  palette: {
    mode: 'light', // light theme only
    primary: {
      main: '#823329',
    },
    info: {
      main: '#2757A5',
    },
    error: {
      main: '#991B1B',
    },
    success: {
      main: '#10B981',
    },
    background: {
      default: '#EADEDA', // base color
      paper: '#FFFFFF', // white background for cards, etc.
    },
    text: {
      primary: '#000000',
      secondary: '#6B7280', // gray
    },
  },
  typography: {
    fontFamily: '"Satoshi", "Inter", "Arial", sans-serif',
    h1: { fontWeight: 700, fontSize: '2.5rem', lineHeight: 1.2 },
    h2: { fontWeight: 600, fontSize: '2rem' },
    body1: { fontWeight: 400, fontSize: '1rem', lineHeight: 1.6 },
    button: { fontWeight: 600, textTransform: 'none' },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Satoshi';
          font-style: normal;
          font-display: swap;
          font-weight: 300;
          src: url(${SatoshiLight}) format('woff2');
        }
        @font-face {
          font-family: 'Satoshi';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: url(${SatoshiRegular}) format('woff2');
        }
        @font-face {
          font-family: 'Satoshi';
          font-style: normal;
          font-display: swap;
          font-weight: 500;
          src: url(${SatoshiMedium}) format('woff2');
        }
        @font-face {
          font-family: 'Satoshi';
          font-style: normal;
          font-display: swap;
          font-weight: 700;
          src: url(${SatoshiBold}) format('woff2');
        }
        @font-face {
          font-family: 'Satoshi';
          font-style: normal;
          font-display: swap;
          font-weight: 900;
          src: url(${SatoshiBlack}) format('woff2');
        }
      `,
    },

    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // disable uppercase
          borderRadius: 12,
          fontWeight: 600,
          padding: '0.5rem 1rem',
        },
      },
    },
  },
  shape: {
    borderRadius: 12,
  },
})

const theme = responsiveFontSizes(baseTheme)
export default theme
