import React, {useReducer, useState} from 'react';
import Web3 from 'web3';
import {ethers} from 'ethers';
import { Web3Provider, ErrorTemplate } from 'react-web3';

import './App.css';
import { MuiThemeProvider } from '@material-ui/core/styles';
import WalletCSTheme from './themes';
import Header from "./components/Header";
import Web3Context from './contexts/Web3Context'
import GlobalReducerContext from './contexts/GlobalReducerContext';
import { BrowserRouter as Router, Switch } from "react-router-dom";
import {globalReducer, initStateGlobal} from "./reducers";
import {BITCOIN_LINKS, LINKS, ETHER_LINKS} from "./links";
import Message from './components/Message';

const Web3Unavailable = ErrorTemplate.bind(null, {
  title: 'MetaMask not found',
  message: `This website requires MetaMask plugin.
  Please download it from metamask.io .`
});

const App = props => {
  const [state, dispatch] = useReducer(globalReducer, initStateGlobal);
  const [stateCurrency, setCurrency] = useState('ether');
  document.title = 'WalletCS';

  const handleCurrency = (val) => {
    setCurrency(val);
  };

  const initMetaMask = () => {
    try{
      let web3 = new Web3(Web3.givenProvider);
      let provider =  ethers.getDefaultProvider(process.env.REACT_APP_ETH_NETWORK_SEND || 'rinkeby');
      return {web3: web3, provider: provider}
    }catch (e) {
      return {web3: null, provider: null}
    }
  };

  return (
        <Router>
          <div className="App">
            <GlobalReducerContext.Provider value={{stateGlobal: state, dispatchGlobal: dispatch}}>
              <Web3Context.Provider value={initMetaMask()}>
                <MuiThemeProvider theme={WalletCSTheme}>
                  <Header handleCurrency={handleCurrency} currentCurrency={stateCurrency} links={LINKS}/>
                  <Switch>
                    {stateCurrency === 'ether' ?
                        <Web3Provider web3UnavailableScreen={Web3Unavailable}>
                          {ETHER_LINKS}
                        </Web3Provider> :
                        BITCOIN_LINKS}
                  </Switch>
                  {console.log(state)}
                  {stateCurrency === 'ether' ? 
                    process.env.REACT_APP_ETH_NETWORK_SEND === 'rinkeby' && !state.isLoadingMethod ? 
                      <Message link='https://app.walletcs.com' networkName='Rinkeby' /> : 
                      '' : 
                      process.env.REACT_APP_BITCOIN_NETWORK === 'BTC_TESTNET' && !state.isLoadingMethod ? 
                        <Message link='https://app.walletcs.com' networkName='TEST'/> 
                      : ''}
                </MuiThemeProvider>
              </Web3Context.Provider>
            </GlobalReducerContext.Provider>
          </div>
        </Router>
    );
};

export default App;
