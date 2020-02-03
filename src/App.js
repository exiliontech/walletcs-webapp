import React, { useReducer, useState } from 'react';

import './App.css';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { InfuraProvider, BlockCypherProvider } from '@exiliontech/walletcs-lib-ext';
import { SnackbarProvider } from 'notistack';
import WalletCSTheme from './themes';
import Header from './components/Header';
import Web3Context from './contexts/Web3Context';
import GlobalReducerContext from './contexts/GlobalReducerContext';
import RedirectMainNet from './components/RedirectMainNet';
import { globalReducer, initStateGlobal } from './reducers';
import { CURRENCIES_LINKS, getCurrentRoutes } from './links';
import { INFURA_URI } from './consts/ethereum';

const listCurrencies = ['ether', 'bitcoin'];

const getCurrentCurrency = () => {
  for (let i = 0; i < listCurrencies.length; i += 1) {
    if (window.location.pathname.indexOf(listCurrencies[i]) > -1) {
      return listCurrencies[i];
    }
  }
  return 'ether';
};

const App = () => {
  const [state, dispatch] = useReducer(globalReducer, initStateGlobal);
  const [stateCurrency, setCurrency] = useState(getCurrentCurrency());
  document.title = 'WalletCS';

  const handleCurrency = (val) => {
    setCurrency(val);
  };

  const initNodeEther = () => {
    const url = INFURA_URI[process.env.REACT_APP_ETH_NETWORK_SEND];
    try {
      return new InfuraProvider(url, process.env.REACT_APP_ETH_NETWORK_SEND);
    } catch (e) {
      return null;
    }
  };

  const initNodeBitcoin = () => {
    try {
      return new BlockCypherProvider(process.env.REACT_APP_BTC_NETWORK_SEND);
    } catch (e) {
      return null;
    }
  };

  const initNode = () => ({ bitcoinProvider: initNodeBitcoin(), etherProvider: initNodeEther() });

  return (
    <Router>
      <div className="App">
        <div className="content">
        <GlobalReducerContext.Provider
            value={{
              stateGlobal: state,
              dispatchGlobal: dispatch,
              currentCurrency: stateCurrency,
            }}>
          <Web3Context.Provider value={initNode()}>
            <MuiThemeProvider theme={WalletCSTheme}>
              <Header
                handleCurrency={handleCurrency}
                currentCurrency={stateCurrency}
                links={CURRENCIES_LINKS}
              />
                <SnackbarProvider>
                  <Switch>{getCurrentRoutes(stateCurrency)}</Switch>
                </SnackbarProvider>
            </MuiThemeProvider>
          </Web3Context.Provider>
        </GlobalReducerContext.Provider>
        </div>
        <RedirectMainNet />
      </div>
    </Router>
  );
};

export default App;
