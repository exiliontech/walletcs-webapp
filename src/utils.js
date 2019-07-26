const onRedirectToEtherscan = (address) => {
  if (!address) return;
  const network = process.env.REACT_APP_ETH_NETWORK_SEND === 'rinkeby' ? 'rinkeby.' : '';
  window.open(`https://${network}etherscan.io/address/${address}`, '_blank');
};

const onRedirectToEtherscanTx = (address) => {
  if (!address) return;
  const network = process.env.REACT_APP_ETH_NETWORK_SEND === 'rinkeby' ? 'rinkeby.' : '';
  window.open(`https://${network}etherscan.io/tx/${address}`, '_blank');
};

const onRedirectToBlockcypher = (address) => {
  if (!address) return;
  const network = process.env.REACT_APP_BITCOIN_NETWORK === 'BTC_TESTNET' ? 'btc-testnet' : 'btc';
  window.open(`https://live.blockcypher.com/${network}/address/${address}/`, '_blank');
};

const CurrencyViewiers = {
  ether_tx: { text: 'View tx on etherscan', redirect: onRedirectToEtherscanTx },
  ether: { text: 'View on etherscan', redirect: onRedirectToEtherscan },
  bitcoin: { text: 'View on blockcypher', redirect: onRedirectToBlockcypher },
};

export default CurrencyViewiers;
