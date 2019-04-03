export const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.primary.main,
    color: '#9198A0',
    minHeight: 72
  },
  tabsSecondary: {
    borderBottom: '1px solid #e8e8e8',
  },
  tabsIndicator: {
    backgroundColor: theme.palette.primary.main,
  },
  rowHeader: {
    display: 'flex',
    maxHeight: 72
  },
  tabRoot: {
    display: 'flex',
    textTransform: 'initial',
    minWidth: 39,
    fontSize: 16,
    fontWeight: 'bold',
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
      color: '#FFFFFF',
      opacity: 1,
    },
    '&tabSelected': {
      color: '#FFFFFF',
      fontWeight: 'bold',
      fontSize: 16,

    },
    '&:focus': {
      color: '#FFFFFF',
      fontWeight: 'bold',
    },
    '& button': {
      display: 'flex',
      marginTop: 12,
    }
  },
  tabSelected: {
    fontWeight: 'bold',
    color: '#FFFFFF',
    backgroundColor: theme.palette.primary.main
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
    width: 292,
    height: 72,
    '& svg:first-child': {
      fontSize: 24
    },
    display: 'flex'
  },
  menu: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  secondary: {
    marginLeft: 292,
    minHeight: 64,
    display: 'flex',
    '& a + a':{
      marginLeft: 22
    }
  },
  
  link: {
    cursor: 'pointer',
    height: 60,
    '&:hover':{
      '& div': {
        color: theme.palette.primary.main,
      }
    },
    '& div':{
      color: '#9198A0',
      fontSize: 16,
      fontWeight: 'bold'
    },
    paddingBottom: '0 !important'
  },
  
  linkSelected: {
    borderBottom: '4px solid #26CD58',
    color: theme.palette.primary.main,
    
    '& div':{
      color: theme.palette.primary.main,
      fontSize: 16,
      fontWeight: 'bold'
    }
  },
  
  textWallet: {
    fontSize: '220px !important',
    alignSelf: 'start'
  },
  primaryLabel: {
    alignSelf: 'start',
    padding: 0
  }
});
