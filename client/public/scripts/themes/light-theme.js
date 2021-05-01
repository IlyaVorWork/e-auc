import { createMuiTheme } from '@material-ui/core/styles'
import { green, red, grey } from '@material-ui/core/colors'

const primaryRed = '#ea3547'
const accentRed = red.A200
const darkRed = red[900]

export default createMuiTheme({
  name: 'Light Theme',
  palette: {
    primary: {
      light: primaryRed,
      main: accentRed,
      dark: darkRed,
      contrastText: '#424242',
    },
    secondary: {
      light: primaryRed,
      main: accentRed,
      dark: darkRed,
      contrastText: '#fff',
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: [
      // 'Helvetica',
      // 'Nimbus Sans L',
      // '-apple-system',
      // 'BlinkMacSystemFont',
      // '"Segoe UI"',
      'Roboto',
      'Helvetica Neue',
      'Arial',
      'sans-serif',
      'Apple Color Emoji',
      'Segoe UI Emoji',
      'Segoe UI Symbol',
    ].join(','),
    body1: {
      fontSize: '0.875rem',
      lineHeight: '0.875rem',
      fontWeight: 300,
    },
    body2: {
      fontSize: '1rem',
      lineHeight: '1.5rem',
      fontWeight: 300,
      color: grey[800],
    },
    caption: {
      fontWeight: '700',
      fontSize: '2rem',
      color: grey[800],
      letterSpacing: '0.7px',
      textTransform: 'uppercase',
    },
    h1: {
      fontWeight: '700',
      fontSize: '1.5rem',
      color: grey[800],
    },
    h2: {
      fontWeight: '500',
      fontSize: '1.2rem',
      color: grey[800],
    },
    h3: {
      fontWeight: '500',
      fontSize: '1.1rem',
      color: grey[800],
    },
    h4: {
      fontWeight: '400',
      fontSize: '1.1rem',
      color: grey[800],
    },
    h5: {
      fontWeight: '300',
      fontSize: '1.1rem',
      color: grey[800],
    },
    h6: {
      fontSize: '0.875rem',
      fontWeight: 400,
      color: grey[800],
    },
  },
  breakpoints: {
    tb: 768,
  },
})
