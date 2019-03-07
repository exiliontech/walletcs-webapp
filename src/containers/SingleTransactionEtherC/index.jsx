import React, {useContext, useEffect, useReducer, useState} from 'react';
import cx from 'classnames';
import ContentCardWCS from "../../components/ContentCardWCS";
import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles";
import {Typography, Snackbar} from "@material-ui/core";
import {checkAddress} from "walletcs";
import InputWCS from "../../components/InputWCS";
import Details from "../../components/DetailsWCS";
import DropDownWCS from "../../components/DropDownWCS";
import ButtonWCS from "../../components/ButtonWCS";
import SnackbarWCS from "../../components/SnackbarWCS";
import {useContractInfo, useMethodInfo, downloadOneTransaction} from './getContractData'
import ParamsAreaWCS from "../../components/ParamsAreaWCS";
import Web3Context from '../../contexts/Web3Context'

const styles = theme => ({
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
    marginTop: 5
  }
});

const SingleTransaction = ({className, ...props}) => {
  const {classes} = props;
  const [state, dispatch] = useContractInfo();
  const {web3} = useContext(Web3Context);
  
  useMethodInfo(state, dispatch);
  
  const onInput = (val, name) => {
    let params = state.methodParams;
    for(let key in params){
      if(params[key].name === name){
        params[key].value = val;
      }
    }
    dispatch({type: 'set_params', payload: params});
  };

  return (
      <>
        <ContentCardWCS
            className={cx(
                classes.content,
                className
            )}>
          <Typography
              className={classes.header}>
            Smart Contract Transaction
          </Typography>
          <div className={classes.inputContainer}>
            <InputWCS
                className={classes.input}
                isQuestion={true}
                label='Public key of a signatory *'
                value={state.publicKey}
                error={state.publicKey ? !checkAddress(state.publicKey): false}
                helperText={state.publicKey && !checkAddress(state.publicKey) ? 'Not correct address format': ''}
                onChange={e => {
                  dispatch({type: 'set_public_key', payload: e.target.value})}
                }/>
            <InputWCS
                className={classes.input}
                label="Contract *"
                value={state.contractAddress}
                error={state.contractAddress ? !checkAddress(state.contractAddress): false}
                helperText={state.contractAddress && !checkAddress(state.contractAddress) ? 'Not correct address format': ''}
                onChange={e =>
                    dispatch({type: 'set_contract_address', payload: e.target.value})
                }/>
          </div>
          <Details
              className={classes.details}
              header="Details"
              details={state.contractName ? [{'key': 'Name:', 'value': state.contractName}]: []}/>
          <DropDownWCS
              className={classes.dropDown}
              defaultInput="Choose contract method *"
              value={state.methodName}
              items={state.abi.filter((val) => val.type === 'function')}
              onChange={e => dispatch({type: 'set_method_name', payload: e.target.value})}/>
          {state.methodName && !state.methodCallResult ?
              <ParamsAreaWCS
                  onChange={onInput}
                  additionalInputs={state.methodParams.filter((val) =>{
                    return ['nonce', 'gasLimit', 'value', 'gasPrice'].includes(val.name)
                  })}
                  mainInputs={state.methodParams.filter((val) =>{
                    return !['nonce', 'gasLimit', 'value', 'gasPrice'].includes(val.name)
                  })} />: ''}
          {state.methodCallResult ?
              <Details
                  className={classes.result}
                  details={[{'key': state.methodName, 'value': state.methodCallResult}]}/>: ''}
          <ButtonWCS
              className={classes.button}
              disabled={!(!!state.publicKey && !!state.contractAddress && !!state.methodName && !!state.methodParams.length)}
              onClick={e => downloadOneTransaction(state, web3)}>
            Download Transaction
          </ButtonWCS>
          {state.error ?
              <SnackbarWCS
                  message={state.error}
                  variant='error'
                  isOpen={true}
                  onClose={e => dispatch({type: 'set_global_error', payload: undefined})}/> : ''}
        </ContentCardWCS>
      </>
  )
};

SingleTransaction.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SingleTransaction);
