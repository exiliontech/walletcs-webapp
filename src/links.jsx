import {Redirect, Route} from "react-router-dom";
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
  <Route path={LINKS.eth_single} component={SingleTransactionEtherC}/>,
  <Route path={LINKS.eth_batch} component={BatchTransactionEtherC}/>,
  <Route path={LINKS.eth_broadcast} component={BroadcastTransactionEther}/>,
  <Route path={LINKS.eth_transfer} component={TransferEther}/>,
  <Redirect from="/" to={LINKS.eth_transfer} />
];

export const BITCOIN_LINKS = [
  <Route path={LINKS.bitcoin_single} component={SingleTransactionBitcoin}/>,
  <Route path={LINKS.bitcoin_batch} component={BatchTransactionBitcon}/>,
  <Route path={LINKS.bitcoin_broadcast} component={BroadcastTransactionBitcoin}/>,
  <Redirect from="/" to={LINKS.bitcoin_single} />
];
