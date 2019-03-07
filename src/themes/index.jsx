import { createMuiTheme } from '@material-ui/core/styles';
import blueGrey from '@material-ui/core/colors/blueGrey';

const WalletCSTheme = createMuiTheme({
  palette: {
    primary: { main: '#6894BC' }, // Purple and green play nicely together.
    secondary: { main: blueGrey[700]}, // This is just green.A700 as hex.
  },
  typography: { useNextVariants: true },
});

export default WalletCSTheme;
