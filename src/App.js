import React, {useReducer, useState} from 'react';
import Web3 from 'web3';
import {ethers} from 'ethers';

import './App.css';
import { MuiThemeProvider } from '@material-ui/core/styles';
import WalletCSTheme from './themes';
import Header from "./containers/Header";
import SingleTransactionEtherC from './containers/SingleTransactionEtherC'
import BatchTransactionEtherC from './containers/BatchTransactionEtherC'
import BroadcastTransactionEther from './containers/BroadcastTransactionEther'
import BroadcastTransactionBitcoin from './containers/BroadcastTransactionBitcoin'
import TransferEther from './containers/TransferEther'
import SingleTransactionBitcoin from './containers/SingleTransactionBitcoin';
import BatchTransactionBitcon from './containers/BatchTransactionBitcoin';
import Web3Context from './contexts/Web3Context'
import GlobalReducerContext from './contexts/GlobalReducerContext';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import {globalReducer, initGlobalState} from "./reducers";

const web3 = new Web3(Web3.givenProvider || "ws://localhost:7545");
const provider =  ethers.getDefaultProvider('rinkeby');

const LINKS = {
  eth_single: "/ether/contract/single",
  eth_batch: "/ether/contract/batch",
  eth_broadcast: "/ether/broadcast",
  transfer_ether: "/ether/transfer",
  bitcoin_single: "/bitcoin/single",
  bitcoin_batch: "/bitcoin/batch",
  bitcoin_broadcast: "/bitcoin/broadcast"
};


const ETHER_LINKS = [
  <Route path="/ether/contract/single" component={SingleTransactionEtherC}/>,
  <Route path="/ether/contract/batch" component={BatchTransactionEtherC}/>,
  <Route path="/ether/broadcast" component={BroadcastTransactionEther}/>,
  <Route path="/ether/transfer" component={TransferEther}/>,
  <Redirect from="/" to="/ether/contract/single" />
];

const BITCOIN_LINKS = [
  <Route path="/bitcoin/single" component={SingleTransactionBitcoin}/>,
  <Route path="/bitcoin/batch" component={BatchTransactionBitcon}/>,
  <Route path="/bitcoin/broadcast" component={BroadcastTransactionBitcoin}/>,
  <Redirect from="/" to="/bitcoin/single" />
];

const App = props => {
  const [state, dispatch] = useReducer(globalReducer, initGlobalState);
  const [stateCurrency, setCurrency] = useState('ether');
  
  const handleCurrency = (val) => {
    setCurrency(val);
  };
  
  return (
        <Router>
          <div className="App">
            <GlobalReducerContext.Provider value={{stateGlobal: state, dispatchGlobal: dispatch}}>
              <Web3Context.Provider value={{web3: web3, provider: provider}}>
                <MuiThemeProvider theme={WalletCSTheme}>
                  <Header handleCurrency={handleCurrency} currentCurrency={stateCurrency} links={LINKS}/>
                  <Switch>
                    {stateCurrency === 'ether' ? ETHER_LINKS : BITCOIN_LINKS}
                  </Switch>
                </MuiThemeProvider>
              </Web3Context.Provider>
            </GlobalReducerContext.Provider>
          </div>
        </Router>
    );
};

export default App;
