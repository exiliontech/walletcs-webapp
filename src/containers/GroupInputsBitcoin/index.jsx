import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import { checkBitcoinAddress, addressIsMainNet } from 'walletcs';
import InputWCS from '../../components/InputWCS';
import RedirectButtonWCS from '../../components/RedirectButtonWCS';


const styles = theme => ({
  input: {
    width: 624,
    height: 64,
  },
});

const GroupInputsBitcoin = ({ className, ...props }) => {
  const { classes, state, dispatch } = props;

  const validateAmount = (amount) => {
    if (!!amount && amount < 0.00000540) {
      return 'amount should be more than 0.00000540 bitcoin (540 satoshi)';
    }
    return null;
  };

  const validateAddress = (address) => {
    if (address && !checkBitcoinAddress(address)) {
      return 'Not correct address format';
    }
    if (address && process.env.REACT_APP_BITCOIN_NETWORK === 'BTC_MAINNET' && !addressIsMainNet(address)) {
      return 'Provided address is TEST network address';
    }
    if (address && process.env.REACT_APP_BITCOIN_NETWORK === 'BTC_TESTNET' && addressIsMainNet(address)) {
      return 'Provided address is MAIN network address';
    }
    return null;
  };

  const onRedirectToBlockexplorer = () => {
    const network = process.env.REACT_APP_BITCOIN_NETWORK === 'BTC_TESTNET' ? 'btc-testnet' : 'btc';
    window.open(`https://live.blockcypher.com/${network}/address/${state.from_address}/`, '_blank');
  };

  return (
      <React.Fragment>
          <InputWCS
              className={classes.input}
              label="from"
              value={state.from_address}
              validator={validateAddress}
              onChange={(e) => {
                dispatch({ type: 'set_from', payload: e.target.value });
              }} InputProps={{
                endAdornment:
                  <InputAdornment position="end">
                    <RedirectButtonWCS onClick={onRedirectToBlockexplorer} text="View on blockexplorer"/>
                  </InputAdornment>,

              }}/>
          <InputWCS
              className={classes.input}
              label="to"
              value={state.to_address}
              validator={validateAddress}
              onChange={e => dispatch({ type: 'set_to', payload: e.target.value })
              }/>
          <InputWCS
              className={classes.input}
              label="amount"
              value={state.amount}
              validator={validateAmount}
              textTip='satoshi'
              onChange={e => dispatch({ type: 'set_amount', payload: e.target.value })
              }/>
      </React.Fragment>
  );
};

GroupInputsBitcoin.propTypes = {
  classes: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired,
  dispatch: PropTypes.object.isRequired,
};

export default withStyles(styles)(GroupInputsBitcoin);
