import axios from 'axios';
import {useContext, useEffect, useReducer} from "react";
import {checkAddress, EtherTransaction, FileTransactionGenerator} from "walletcs";
import {ethers} from 'ethers';
import Web3Context from "../../contexts/Web3Context";
import {contractReducer, initStateContractReducer} from "../../reducers";

export const fetchContract = async (address) => {
  const url = `https://api-rinkeby.etherscan.io/api?module=contract&action=getabi&address=${address}`;
  const urlToken = `https://api-rinkeby.etherscan.io/api?module=account&action=tokentx&contractaddress=${address}&page=1&offset=1`;
  
  let result = {abi:{}, name:{}};
  
  let response = await axios(url);
  let data = response.data;
  data.status === '0'?  result.abi.error = data.result: result.abi.data = JSON.parse(data.result);
  
  response = await axios(urlToken);
  data = response.data;
  data.status === '0'?  result.name.error = data.result: result.name.data = data.result[0] ? data.result[0].tokenName: undefined;

  return result
};

export const useContractInfo = () => {
  const [state, dispatch] = useReducer(contractReducer, initStateContractReducer);
  const {web3} = useContext(Web3Context);
  
  const getContractInformation = async() => {
    if(checkAddress(state.contractAddress)){
      let result = await fetchContract(state.contractAddress);
      if(result.abi.error) {
        dispatch({type: 'set_global_error', payload: result.abi.error});
        dispatch({type: 'reset_data'})
      } else{
        dispatch({type: 'set_abi', payload: result.abi.data});
        
        let contract = new web3.eth.Contract(result.abi.data, state.contractAddress);

        // Try get name from contract method if didn't from API
        if(result.name.error && contract.methods.name){
          let name = await contract.methods.name.call();
          dispatch({type: 'set_contract_name', payload: name})
        }else if(!result.name.error){
          dispatch({type: 'set_contract_name', payload: result.name.data})
        }
        let nonce = await web3.eth.getTransactionCount(state.publicKey);
        let gasPrice = await await web3.eth.getGasPrice();
        dispatch({type: 'set_nonce', payload: nonce});
        dispatch({type: 'set_gas_price', payload: gasPrice});
      }
    }
  };
  
  useEffect(() => {
    getContractInformation();
  }, [state.contractAddress]);
  
  return [state, dispatch]
};

export const useMethodInfo = (state, dispatch) => {
  const {web3} = useContext(Web3Context);
  
  const getMethodInformation = async () => {
    try{
      let contract = new web3.eth.Contract(state.abi, state.contractAddress);
  
      let method = state.abi.filter((val) => state.methodName === val.name)[0];
  
      let callMethod = contract.methods[method.name];
  
      let params = !!method? method.inputs : [];
      
      if(typeof callMethod === "function" && !!params.length){
        const defaultData = [
          {name: "gasPrice", value: state.gasPrice || 100000000, type: "uint256"},
          {name: "gasLimit", value: state.gasLimit || 21000, type: "uint256"},
          {name: "nonce", value: state.nonce || 0, type: "uint256"}];
        params = params.concat(defaultData);
        dispatch({type: 'set_params', payload: params});
      }else {
        dispatch({type: 'set_params', payload: params});
        let methodResult = await callMethod.call();
        
        if(Array.isArray(methodResult)){
          methodResult = methodResult.join('')
        }
  
        if(typeof methodResult === 'object'){
          methodResult = methodResult[0]
        }
        
        dispatch({type: 'set_method_call_result', payload: methodResult});
      }
      
    }catch (e) {
      dispatch({type: 'set_global_error', payload: typeof e === 'object'? e.message: e})
    }
  };
  
  useEffect(() => {
    if(state.methodName) getMethodInformation();
  }, [state.methodName]);
};

const normalizeTransaction = (publicKey, addressCon, methodParams, abi, methodName, web3) => {
  let defaultValues = ["gasPrice", "gasLimit", "nonce", "value"];

  let newTx = {};
  let newParams = [];
  
  for(let i=0; i < methodParams.length; i++){
    let l = methodParams[i];
    if(defaultValues.includes(l.name)){
      newTx[l.name] = l.value
    }else{
      newParams.push(l.value)
    }
  }
  
  let txData;
  let contract = new web3.eth.Contract(abi, addressCon);
  try{
    txData = contract.methods[methodName](...newParams).encodeABI();
  }catch (e) {
    console.log(e, methodName)
  }
  
  newTx["data"] = txData;
  newTx["to"] = addressCon;
  return newTx;
  
};

export const downloadOneTransaction = (state, web3) => {
  let {publicKey, contractAddress, methodParams, abi, methodName} = state;
  
  let transaction = normalizeTransaction(publicKey, contractAddress, methodParams, abi, methodName, web3);
  let fileGenerator = new FileTransactionGenerator(publicKey);
  
  if(EtherTransaction.checkCorrectTx(transaction)){
    fileGenerator.addTx(contractAddress, transaction);
    fileGenerator.addContract(contractAddress, abi);
  }
  
  let contentType = "text/json;charset=utf-8;";
  let filename = 'no_sign_transaction_' + new Date().getTime().toString() + ".json";
  
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
