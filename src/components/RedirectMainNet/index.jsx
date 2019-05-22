/* eslint-disable import/no-unresolved */
/* eslint-disable no-nested-ternary */
import React, { useContext } from 'react';
import { withStyles } from '@material-ui/core/styles';

import GlobalReducerContext from '../../contexts/GlobalReducerContext';
import Message from '../Message';

const styles = theme => ({
  footer: {
    position: 'fixed',
    left: 0,
    bottom: 0,
    width: '100%',
  },
});

const RedirectMainNet = (props) => {
  const { classes } = props;
  const { currentCurrency } = useContext(GlobalReducerContext);

  return (
       <div className={classes.footer}>
            {currentCurrency === 'ether'
              ? process.env.REACT_APP_ETH_NETWORK_SEND === 'rinkeby'
                ? <Message link={`https://app.walletcs.com${window.location.pathname}`} networkName='Rinkeby (test)' />
                : ''
              : process.env.REACT_APP_BITCOIN_NETWORK === 'BTC_TESTNET'
                ? <Message link={`https://app.walletcs.com${window.location.pathname}`} networkName='TEST'/>
                : ''}
       </div>
  );
};

export default withStyles(styles)(RedirectMainNet);
