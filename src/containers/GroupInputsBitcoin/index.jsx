import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { checkBitcoinAddress, addressIsMainNet } from 'walletcs';
import { Button } from '@material-ui/core';
import InputWCS from '../../components/InputWCS';
import { MINIMUM_AMOUNT_IN_BITCOIN, COF_BTC_SATOSHI, NETWORKS } from '../../consts/bitcoin';
import PairedInputWCS from '../../components/PairedInputsWCS';
import DeleteButton from '../../components/DeleteButton';


const styles = theme => ({
  input: {
    width: 624,
    height: 64,
  },
  lastInput: {
    width: 624,
    height: 64,
    right: 0,
    marginBottom: 0,
    marginTop: 20,
  },
  lastInputAmount: {
    position: 'absolute',
    left: 650,
    top: 20,
    height: 64,
    marginBottom: 0,
  },
  deleteButtonFrom: {
    position: 'absolute',
    left: -40,
    top: 26,
    width: 0,
    height: 0,
  },
  deleteButtonToAndAmount: {
    position: 'absolute',
    left: -40,
    top: 26,
    width: 24,
  },
  addButtonFrom: {
    width: 180,
    marginBottom: 40,
  },
  addButtonTo: {
    width: 180,
  },
  containerDeleteButton: {
    position: 'relative',
  },
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

  const handlerDeleteFromAddress = (index) => {
    dispatch({ type: 'delete_from', index });
  };

  const handlerDeleteToAddress = (index) => {
    dispatch({ type: 'delete_to', index });
    dispatch({ type: 'delete_amount', index });
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
        {state.from_addresses.map((value, index) => <div className={classes.containerDeleteButton}>
            <InputWCS
              value={value.value || ''}
              className={classes.lastInput}
              label="from"
              validator={validateAddress}
              onChange={(e) => {
                dispatch({ type: 'set_from', index, payload: e.target.value });
              }}
              isRedirect />
            {index > 0 ? <DeleteButton onClick={() => handlerDeleteFromAddress(index)} className={classes.deleteButtonFrom}/> : ''}
          </div>)}
          <Button
            className={classes.addButtonFrom}
            color="secondary"
            onClick={handlerAddFromAddress}>
            Add address from
          </Button>
        <div className={classes.container}>
          {state.to_addresses.map((value, index) => <div className={classes.containerDeleteButton}>
              <PairedInputWCS
                classNamePrimary={classes.lastInput}
                classNameSecondary={classes.lastInputAmount}
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
                validatorPrimary={validateAddress}/>
              {index > 0 ? <DeleteButton onClick={() => handlerDeleteToAddress(index)} className={classes.deleteButtonToAndAmount}/> : ''}
            </div>)}
        </div>
        <Button
          className={classes.addButtonTo}
          color="secondary"
          onClick={handlerAddToAddress}>
          Add address to
        </Button>
      </React.Fragment>
  );
};

GroupInputsBitcoin.propTypes = {
  classes: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired,
  dispatch: PropTypes.object.isRequired,
};

export default withStyles(styles)(GroupInputsBitcoin);
