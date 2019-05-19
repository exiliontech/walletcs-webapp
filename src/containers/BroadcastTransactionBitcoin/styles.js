export const styles = theme => ({
  content: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'start'
  },
  inputContainerContractInput:{
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'column',
    paddingTop: 46
  },
  inputContainer:{
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    paddingTop: 46,
    paddingLeft: 292,
    maxWidth: 624
  },
  inputContainerPublicKeyInput: {
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
    width: 624,
    height: 64
  },
  details:{
    height: 108
  },
  button: {
    fontWeight: 'bold',
    borderRadius: 8,
    marginTop: 35,
    marginBottom: 20
  },
  containerAddTransaction: {
    display: 'flex',
    justifyContent: 'start',
    alignSelf: 'center',
    width: 624,
    marginTop: 10
  },
  containerButtons: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  hiddenInput:{
    transform: 'translate(100, 0)'
  }
});
