import { createMuiTheme } from '@material-ui/core/styles';
import blueGrey from '@material-ui/core/colors/blueGrey';

const WalletCSTheme = createMuiTheme({
  palette: {
    primary: { main: '#010D17' },
    secondary: { main: '#26CD58' },
    error: { main: '#F95721' },
  },
  typography: { useNextVariants: true },
  props: {
    // Name of the component ⚛️
    MuiButtonBase: {
      // The properties to apply
      disableRipple: true, // No more ripple, on the whole application!
    },
  },
});

export default WalletCSTheme;
