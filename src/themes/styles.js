export const styles = theme => ({
  content: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'start'
  },
  inputContainer:{
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    paddingTop: 46,
    paddingLeft: 292,
    maxWidth: 624
  },
  informationContainer:{
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 46,
    width: '100%',
    height: '100%'
  },
  header: {
    display: 'flex',
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.palette.primary.main,
    marginLeft: 20,
    marginTop: 20
  },
  details:{
    height: 108
  },
  dropDown: {
    width: 956,
    height: 64,
  },
  button: {
    fontWeight: 'bold',
    borderRadius: 8,
    alignSelf: 'start',
    marginTop: 35,
    marginBottom: 20
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
  },
  result: {
    marginBottom: 40,
    maxWidth: 164,
  }
});
