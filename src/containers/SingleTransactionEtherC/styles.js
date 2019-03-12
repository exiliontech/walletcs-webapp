export const styles = theme => ({
  content: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputContainer:{
    display: 'flex',
    justifyContent: 'space-around',
    paddingTop: 46
  },
  header: {
    display: 'flex',
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.palette.primary.main,
    marginLeft: 20,
    marginTop: 20
  },
  input: {
    width: 468,
    height: 64
  },
  details:{
    height: 108
  },
  dropDown: {
    width: 956,
    height: 64,
    marginLeft: 20,
    marginTop: 80
  },
  button: {
    fontWeight: 'bold',
    borderRadius: 8,
    alignSelf: 'center',
    marginTop: 35,
    marginBottom: 20
  },
  result: {
    marginTop: 5,
    maxWidth: 956
  },
  callMethodWrapper: {
    display: 'flex',
    justifyContent: 'space-around',
    alignSelf: 'center',
    width: 700,
    
  },
  buttonSecondary: {
    marginLeft: '20',
  },
  progress: {
    color: theme.palette.primary.main,
    alignSelf: 'center'
  },
  recalculateButton: {
    maxWidth: 100,
    maxHeight: 30,
    fontSize: 12,
    textTransform: 'none',
    alignSelf: 'center',
    boxShadow: 'none',
    marginTop: 20
  }
});
