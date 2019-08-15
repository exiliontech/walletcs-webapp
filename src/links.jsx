import { Redirect, Route } from 'react-router-dom';
import React from 'react';
import SingleTransactionEtherC from './containers/SingleTransactionEtherC';
import BatchTransactionEtherC from './containers/BatchTransactionEtherC';
import BroadcastTransactionEther from './containers/BroadcastTransactionEther';
import TransferEther from './containers/TransferEther';
import SingleTransactionBitcoin from './containers/SingleTransactionBitcoin';
import BatchTransactionBitcon from './containers/BatchTransactionBitcoin';
import BroadcastTransactionBitcoin from './containers/BroadcastTransactionBitcoin';


export const CURRENCIES_LINKS = {
  eth_single: '/ether/contract/single',
  eth_batch: '/ether/contract/batch',
  eth_broadcast: '/ether/broadcast',
  eth_transfer: '/ether/transfer',
  bitcoin_single: '/bitcoin/single',
  bitcoin_batch: '/bitcoin/batch',
  bitcoin_broadcast: '/bitcoin/broadcast',
};


export const ETHER_ROUTES = [
  <Route path={CURRENCIES_LINKS.eth_single} exact component={SingleTransactionEtherC}/>,
  <Route path={CURRENCIES_LINKS.eth_batch} exact component={BatchTransactionEtherC}/>,
  <Route path={CURRENCIES_LINKS.eth_broadcast} exact component={BroadcastTransactionEther}/>,
  <Route path={CURRENCIES_LINKS.eth_transfer} exact component={TransferEther}/>,
  <Route path='*' render={() => <Redirect to={{ pathname: CURRENCIES_LINKS.eth_transfer }} />} />,
];

export const BITCOIN_ROUTES = [
  <Route path={CURRENCIES_LINKS.bitcoin_single} exact component={SingleTransactionBitcoin}/>,
  <Route path={CURRENCIES_LINKS.bitcoin_broadcast} exact component={BroadcastTransactionBitcoin}/>,
  <Route path='*' render={() => <Redirect to={{ pathname: CURRENCIES_LINKS.bitcoin_single }} />} />,

];

const CURRENCIES = {
  ether: ETHER_ROUTES,
  bitcoin: BITCOIN_ROUTES,
};


export const getCurrentRoutes = currency => CURRENCIES[currency];
