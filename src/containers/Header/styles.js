export const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    maxHeight: 50
  },
  tabsRoot: {
    borderBottom: '1px solid #e8e8e8',
  },
  tabsIndicator: {
    backgroundColor: theme.palette.primary.main,
    minHeight: 5
  },
  tabRoot: {
    textTransform: 'initial',
    minWidth: 39,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing.unit * 4,
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      color: theme.palette.primary.main,
      opacity: 1,
    },
    '&$tabSelected': {
      color: theme.palette.primary.main,
      fontWeight: 'bold',
      fontSize: 16,
      
    },
    '&:focus': {
      color: theme.palette.primary.main,
    },
  },
  tabSelected: {
    fontWeight: 'bold',
    color: '#9A9A9A',
  },
  typography: {
    padding: theme.spacing.unit * 3,
  },
  appBar: {
    flexGrow: 1,
    height: 138,
    backgroundColor: '#FFFFFF'
  },
  container: {
    height: 138,
    '& header':{
      display: 'flex',
      flexDirection: 'row'
    }
  },
  logo: {
    width: 330,
    height: 138,
    '& svg:first-child': {
      fontSize: 24
    }
  },
  menu: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  secondary: {
    minHeight: 90,
    display: 'flex',
  },
  link: {
    cursor: 'pointer',
    height: 83,
    '&:hover':{
      borderBottom: '7px solid rgba(104, 148, 188, 0.4)',
      color: theme.palette.primary.main,
      '& div': {
        color: theme.palette.primary.main,
      }
    },
    '& div':{
      color: '#9A9A9A',
      fontSize: 18,
    },
    paddingBottom: '0 !important',
  },
  wallet: {
    fontSize: '50px !important',
    color: '#5B9BD5 !important',
    paddingBottom: 45,
    marginRight: 10
  },
  textWallet: {
    fontSize: '142px !important'
  }
});
