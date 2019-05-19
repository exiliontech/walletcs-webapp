import {Redirect, Route, Switch} from "react-router-dom";
import SingleTransactionEtherC from "./containers/SingleTransactionEtherC";
import BatchTransactionEtherC from "./containers/BatchTransactionEtherC";
import BroadcastTransactionEther from "./containers/BroadcastTransactionEther";
import TransferEther from "./containers/TransferEther";
import SingleTransactionBitcoin from "./containers/SingleTransactionBitcoin";
import BatchTransactionBitcon from "./containers/BatchTransactionBitcoin";
import BroadcastTransactionBitcoin from "./containers/BroadcastTransactionBitcoin";
import React from "react";


export const LINKS = {
  eth_single: "/ether/contract/single",
  eth_batch: "/ether/contract/batch",
  eth_broadcast: "/ether/broadcast",
  eth_transfer: "/ether/transfer",
  bitcoin_single: "/bitcoin/single",
  bitcoin_batch: "/bitcoin/batch",
  bitcoin_broadcast: "/bitcoin/broadcast"
};


export const ETHER_LINKS = [
  <Route path={LINKS.eth_single} exact component={SingleTransactionEtherC}/>,
  <Route path={LINKS.eth_batch} exact component={BatchTransactionEtherC}/>,
  <Route path={LINKS.eth_broadcast} exact component={BroadcastTransactionEther}/>,
  <Route path={LINKS.eth_transfer} exact component={TransferEther}/>,
  <Route path='*' render={() => <Redirect to={{pathname: LINKS.eth_transfer}} />} />
];

export const BITCOIN_LINKS = [
  <Route path={LINKS.bitcoin_single} exact component={SingleTransactionBitcoin}/>,
  <Route path={LINKS.bitcoin_batch} exact component={BatchTransactionBitcon}/>,
  <Route path={LINKS.bitcoin_broadcast} exact component={BroadcastTransactionBitcoin}/>,
  <Route path='*' render={() => <Redirect to={{pathname: LINKS.bitcoin_single}} />} />

];
