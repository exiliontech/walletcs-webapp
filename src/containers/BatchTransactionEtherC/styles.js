
export const styles = theme => ({
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'start',
  },
  inputContainerContractInput: {
    display: 'flex',
    justifyContent: 'space-around',
    paddingTop: 46,
  },
  inputContainerPublicKeyInput: {
    display: 'flex',
    justifyContent: 'space-around',
    paddingTop: 46,
  },
  header: {
    display: 'flex',
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.palette.primary.main,
    marginLeft: 20,
    marginTop: 20,
  },
  input: {
    width: 624,
    height: 64,
  },
  details:{
    height: 108
  },
  dropDown: {
    width: 956,
    height: 64,
    marginLeft: 20,
    marginTop: 80,
  },
  button: {
    fontWeight: 'bold',
    borderRadius: 8,
    marginTop: 35,
    marginBottom: 20,
  },
  result: {
    marginTop: 5
  },
  addTransaction: {
    '& a': {
      textDecoration: 'none',
      color: theme.palette.primary.main,
    }
  },
  containerAddTransaction: {
    display: 'flex',
    justifyContent: 'start',
    width: 624,
    marginTop: 10,
  },
  containerButtons: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  inputContainer:{
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    paddingTop: 46,
    paddingLeft: 292,
    maxWidth: 624,
  },
  informationContainer: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 46,
    width: '100%',
    height: '100%',
  },
});
