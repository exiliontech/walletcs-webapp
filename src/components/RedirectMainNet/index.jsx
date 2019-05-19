import React, { useContext } from 'react';
import { withStyles } from "@material-ui/core/styles";

import GlobalReducerContext from '../../contexts/GlobalReducerContext';
import Message from '../Message';

const styles = theme => ({

})

const RedirectMainNet = () => {
    const { currentCurrency } = useContext(GlobalReducerContext)

    return (
       <React.Fragment>
            {currentCurrency === 'ether' ? 
                process.env.REACT_APP_ETH_NETWORK_SEND === 'rinkeby' ? 
                    <Message link={`https://app.walletcs.com${window.location.pathname}`} networkName='Rinkeby (test)' /> : 
                '' : 
                process.env.REACT_APP_BITCOIN_NETWORK === 'BTC_TESTNET' ? 
                    <Message link={`https://app.walletcs.com${window.location.pathname}`} networkName='TEST'/> 
            : ''}
       </React.Fragment>
    )
};

export default withStyles(styles)(RedirectMainNet);
