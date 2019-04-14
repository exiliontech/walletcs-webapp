import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles";
import {FileTransactionGenerator, BitcoinTransaction} from 'walletcs';
import InputWCS from "../../components/InputWCS";

import { checkBitcoinAddress } from "walletcs"

const styles = theme => ({
  input: {
    width: 624,
    height: 64,
  },
});

const GroupInputsBitcoin = ({className, ...props}) => {
  const {classes, state, dispatch} = props;
  
  const validateAmount = (amount) => {
    if(!!amount && amount<540){
      return 'amount should be more than 540 satoshi'
    }
    return null
  };
  
  const validateAddress = (address) => {
    if(!!address && !checkBitcoinAddress(address)){
      return 'Not correct address format'
   }
   return null
  };
  
  return (
      <React.Fragment>
          <InputWCS
              className={classes.input}
              label="from"
              value={state.from_address}
              validator={validateAddress}
              onChange={e =>{
                dispatch({type: 'set_from', payload: e.target.value})
              }
              }/>
          <InputWCS
              className={classes.input}
              label="to"
              value={state.to_address}
              validator={validateAddress}
              onChange={e =>
                  dispatch({type: 'set_to', payload: e.target.value})
              }/>
          <InputWCS
              className={classes.input}
              label="amount"
              value={state.amount}
              validator={validateAmount}
              textTip='satoshi'
              onChange={e =>
                  dispatch({type: 'set_amount', payload: e.target.value})
              }/>
      </React.Fragment>
  )
};

GroupInputsBitcoin.propTypes = {
  classes: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired,
  dispatch: PropTypes.object.isRequired
};

export default withStyles(styles)(GroupInputsBitcoin);
