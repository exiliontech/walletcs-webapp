import {FileTransactionGenerator, EtherTransaction} from 'walletcs';
import {normalizeTransaction} from '../SingleTransactionEtherC/actionsSingleTransaction'


export const downloadBatchTransaction = (state, stateMethod) => {
  let {table} = state;
  let {publicKey} = stateMethod;
  
  let fileGenerator = new FileTransactionGenerator(publicKey);
  
  for(let key in table){
    const {contractAddress, params, abi, methodName} = table[key];
    let transaction = normalizeTransaction(publicKey, contractAddress, params, abi, methodName);
    if(EtherTransaction.checkCorrectTx(transaction)){
      fileGenerator.addTx(contractAddress, transaction);
      fileGenerator.addContract(contractAddress, abi);
    }
  }
  
  let contentType = "text/json;charset=utf-8;";
  let filename = 'tr-' + new Date().getTime().toString() + ".json";
  
  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    let blob = new Blob([decodeURIComponent(encodeURI(fileGenerator.generateJson()))], { type: contentType });
    navigator.msSaveOrOpenBlob(blob, filename);
  } else {
    let a = document.createElement('a');
    a.download = filename;
    a.href = 'data:' + contentType + ',' + encodeURIComponent(fileGenerator.generateJson());
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
};
