import React, { Component } from 'react';
import Web3 from 'web3';

import './App.css';
import { MuiThemeProvider } from '@material-ui/core/styles';
import WalletCSTheme from './themes';
import Header from "./containers/Header";
import SingleTransactionEtherC from './containers/SingleTransactionEtherC'
import BatchTransactionEtherC from './containers/BatchTransactionEtherC'
import LoadTransactionEther from './containers/LoadTransactionEther'
import Web3Context from './contexts/Web3Context'
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

const web3 = new Web3(Web3.givenProvider || "ws://localhost:7545");

class App extends Component {
  render() {
    return (
        <Router>
          <div className="App">
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
          </div>
        </Router>
    );
  }
}

export default App;
