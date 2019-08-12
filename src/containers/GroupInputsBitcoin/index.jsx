import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { checkBitcoinAddress, addressIsMainNet } from 'walletcs';
import { Button } from '@material-ui/core';
import InputWCS from '../../components/InputWCS';
import { MINIMUM_AMOUNT_IN_BITCOIN, COF_BTC_SATOSHI, NETWORKS } from '../../consts/bitcoin';
import PairedInputWCS from '../../components/PairedInputsWCS';
import AddButton from '../../components/AddButton';


const styles = theme => ({
  input: {
    width: 624,
    height: 64,
  },
  lastInput: {
    width: 624,
    height: 64,
    marginBottom: 0,
  },
  lastInputAmount: {
    height: 64,
    marginBottom: 0,
  },
  deleteButtonFrom: {
    position: 'relative',
    left: -40,
    top: -130,
    width: 24,
  },
  deleteButtonToAndAmount: {
    position: 'relative',
    left: -40,
    top: -90,
    width: 24,
  },
  addButtonFrom: {
    width: 180,
    marginBottom: 40,
  },
  addButtonTo: {
    width: 180,
  }
});


const GroupInputsBitcoin = ({ className, ...props }) => {
  const { classes, state, dispatch } = props;


  const handlerAddFromAddress = (e) => {
    dispatch({ type: 'set_from' });
  };

  const handlerAddToAddress = (e) => {
    dispatch({ type: 'set_to' });
    dispatch({ type: 'set_amount' });
  };

  const handlerDeleteFromAddress = () => {
    dispatch({ type: 'delete_from' });
  };

  const handlerDeleteToAddress = () => {
    dispatch({ type: 'delete_to' });
    dispatch({ type: 'delete_amount' });
  };

  const validateAmount = (amount) => {
    if (!!amount && amount < MINIMUM_AMOUNT_IN_BITCOIN) {
      return `amount should be more than ${MINIMUM_AMOUNT_IN_BITCOIN}  
      bitcoin ( ${MINIMUM_AMOUNT_IN_BITCOIN * COF_BTC_SATOSHI} satoshi)`;
    }
    return null;
  };

  const validateAddress = (address) => {
    if (address && !checkBitcoinAddress(address)) {
      return 'Not correct address format';
    }
    if (address && process.env.REACT_APP_BITCOIN_NETWORK === NETWORKS.main
      && !addressIsMainNet(address)) {
      return 'Provided address is TEST network address';
    }
    if (address && process.env.REACT_APP_BITCOIN_NETWORK === NETWORKS.testnet
      && addressIsMainNet(address)) {
      return 'Provided address is MAIN network address';
    }
    return null;
  };

  return (
      <React.Fragment>
        {state.from_addresses.map((value, index) => <InputWCS
          value={value.value || ''}
          className={state.from_addresses.length - 1 > index ? classes.input : classes.lastInput}
          label="from"
          validator={validateAddress}
          onChange={(e) => {
            dispatch({ type: 'set_from', index, payload: e.target.value });
          }}
          isRedirect />)}
          <Button
            className={classes.addButtonFrom}
            color="secondary"
            onClick={handlerAddFromAddress}>
            Add address from
          </Button>
        {state.from_addresses.length > 1
          ? <AddButton onClick={handlerDeleteFromAddress} className={classes.deleteButtonFrom}/>
          : ''}
        <div className={classes.container}>
          {state.to_addresses.map((value, index) => <PairedInputWCS
            classNamePrimary={state.to_addresses.length - 1 > index ? null : classes.lastInput}
            classNameSecondary={state.amounts.length - 1 > index ? null : classes.lastInputAmount}
            isRedirect
            textRedirectTip='View on blockcypher'
            labelPrimary='to'
            labelSecondary='amount'
            valuePrimary={value.value}
            valueSecondary={state.amounts[index].value}
            onChangePrimary={(e) => {
              dispatch({ type: 'set_to', index, payload: e.target.value });
            }}
            onChangeSecondary={(e) => {
              dispatch({ type: 'set_amount', index, payload: e.target.value });
            }}
            validatorSecondary={validateAmount}
            validatorPrimary={validateAddress}/>)}
        </div>
        <Button
          className={classes.addButtonTo}
          color="secondary"
          onClick={handlerAddToAddress}>
          Add address to
        </Button>
        {state.to_addresses.length > 1
          ? <AddButton onClick={handlerDeleteToAddress} className={classes.deleteButtonToAndAmount}/>
          : ''}
      </React.Fragment>
  );
};

GroupInputsBitcoin.propTypes = {
  classes: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired,
  dispatch: PropTypes.object.isRequired,
};

export default withStyles(styles)(GroupInputsBitcoin);
