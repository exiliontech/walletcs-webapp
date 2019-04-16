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
  transfer_ether: "/ether/transfer",
  bitcoin_single: "/bitcoin/single",
  bitcoin_batch: "/bitcoin/batch",
  bitcoin_broadcast: "/bitcoin/broadcast"
};


export const ETHER_LINKS = [
  <Route path="/ether/contract/single" component={SingleTransactionEtherC}/>,
  <Route path="/ether/contract/batch" component={BatchTransactionEtherC}/>,
  <Route path="/ether/broadcast" component={BroadcastTransactionEther}/>,
  <Route path="/ether/transfer" component={TransferEther}/>,
  <Redirect from="/" to="/ether/contract/single" />
];

export const BITCOIN_LINKS = [
  <Route path="/bitcoin/single" component={SingleTransactionBitcoin}/>,
  <Route path="/bitcoin/batch" component={BatchTransactionBitcon}/>,
  <Route path="/bitcoin/broadcast" component={BroadcastTransactionBitcoin}/>,
  <Redirect from="/" to="/bitcoin/single" />
];
