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
    htmlFontSize: 16,

    h1: {
      fontWeight: 700,
      fontSize: '3.5rem',
      lineHeight: 1.1,
      letterSpacing: '-0.015em',
    },
    h2: {
      fontWeight: 700,
      fontSize: '2.5rem',
      lineHeight: 1.2,
      letterSpacing: '-0.001em',
    },
    h3: {
      fontWeight: 600,
      fontSize: '2rem',
      lineHeight: 1.3,
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.4,
    },
    h5: {
      fontWeight: 500,
      fontSize: '1.25rem',
      lineHeight: 1.5,
    },
    h6: {
      fontWeight: 500,
      fontSize: '1.1rem',
      lineHeight: 1.6,
    },

    body1: {
      fontWeight: 400,
      fontSize: '1rem',
      lineHeight: 1.65,
    },
    body2: {
      fontWeight: 400,
      fontSize: '0.9rem',
      lineHeight: 1.5,
      color: '#6B7280',
    },

    subtitle1: {
      fontWeight: 500,
      fontSize: '1rem',
      lineHeight: 1.75,
    },
    subtitle2: {
      fontWeight: 500,
      fontSize: '0.875rem',
      lineHeight: 1.57,
    },
    button: {
      fontWeight: 700,
      fontSize: '0.95rem',
      textTransform: 'none',
    },
    caption: {
      fontWeight: 400,
      fontSize: '0.75rem',
      lineHeight: 1.66,
      color: '#6B7280',
    },
    overline: {
      fontWeight: 500,
      fontSize: '0.75rem',
      lineHeight: 2.66,
      textTransform: 'uppercase',
    },
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
