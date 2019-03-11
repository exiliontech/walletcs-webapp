import React, {Component, useReducer} from 'react';
import Web3 from 'web3';

import './App.css';
import { MuiThemeProvider } from '@material-ui/core/styles';
import WalletCSTheme from './themes';
import Header from "./containers/Header";
import SingleTransactionEtherC from './containers/SingleTransactionEtherC'
import BatchTransactionEtherC from './containers/BatchTransactionEtherC'
import LoadTransactionEther from './containers/LoadTransactionEther'
import Web3Context from './contexts/Web3Context'
import GlobalReducerContext from './contexts/GlobalReducerContext';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import {globalReducer, initGlobalState} from "./reducers";

const web3 = new Web3(Web3.givenProvider || "ws://localhost:7545");

const App = props => {
  const [state, dispatch] = useReducer(globalReducer, initGlobalState);
  return (
        <Router>
          <div className="App">
            <GlobalReducerContext.Provider value={{stateGlobal: state, dispatchGlobal: dispatch}}>
              <Web3Context.Provider value={{web3: web3}}>
                <MuiThemeProvider theme={WalletCSTheme}>
                  <Header/>
                  <Switch>
                    <Route path="/ether/contract/single" component={SingleTransactionEtherC}/>
                    <Route path="/ether/contract/batch" component={BatchTransactionEtherC}/>
                    <Route path="/ether/broadcast" component={LoadTransactionEther}/>
                    <Redirect from="/" to="/ether/contract/single" />
                  </Switch>
                </MuiThemeProvider>
              </Web3Context.Provider>
            </GlobalReducerContext.Provider>
          </div>
        </Router>
    );
}

export default App;
