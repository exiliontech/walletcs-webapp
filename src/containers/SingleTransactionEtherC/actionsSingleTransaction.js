import axios from 'axios';
import {useContext, useEffect, useReducer} from "react";
import {ethers} from 'ethers';
import {checkAddress, EtherTransaction, FileTransactionGenerator} from "walletcs";
import Web3Context from "../../contexts/Web3Context";
import GlobalReducerContext from "../../contexts/GlobalReducerContext"
import {contractReducer, initStateContractReducer, initStateMethodReducer, methodReducer} from "../../reducers";


export const useContractInfo = () => {
  const [state, dispatch] = useReducer(contractReducer, initStateContractReducer);
  const {provider} = useContext(Web3Context);
  const {dispatchGlobal} = useContext(GlobalReducerContext);
  
  const getContractInformation = async() => {
    
    if(checkAddress(state.contractAddress)){
      dispatchGlobal({type: 'set_is_loading_contract'});
      const url = `https://api-rinkeby.etherscan.io/api?module=contract&action=getabi&address=${state.contractAddress}`;
      const urlToken = `https://api-rinkeby.etherscan.io/api?module=account&action=tokentx&contractaddress=${state.contractAddress}&page=1&offset=1`;
      
      let response = await axios(url);
      if(response.data.status === '0'){
        dispatchGlobal({type: 'set_global_error', payload: response.data.result})
      }else{
        let abi = JSON.parse(response.data.result);
        dispatch({type: 'set_abi', payload: abi});
        let contract = new ethers.Contract(state.contractAddress, abi,  provider);
  
        dispatch({type: 'set_contract', payload: contract});

        response =  await axios(urlToken);
        if(response.data.status === '1'){
          dispatch({type: 'set_contract_name', payload: response.data.result[0] ? response.data.result[0].tokenName: undefined})
        }else{
          let name = await contract.name();
          dispatch({type: 'set_contract_name', payload: typeof name === 'object' ? '' : name})
        }
      }
      dispatchGlobal({type: 'set_is_loading_contract'});
    }
  };
  
  useEffect(() => {
    getContractInformation();
  }, [state.contractAddress]);
  
  return [state, dispatch]
};

export const useMethodInfo = (stateContract) => {
  const {provider} = useContext(Web3Context);
  const [state, dispatch] = useReducer(methodReducer, initStateMethodReducer);
  const {dispatchGlobal} = useContext(GlobalReducerContext);
  
  const getMethodInformation = async() => {
    try{
      dispatchGlobal({type: 'set_is_loading_method'});
      let method = stateContract.abi.filter((val) => state.methodName === val.name)[0];
      let callMethod = stateContract.contract[method.name];
      let params = !!method? method.inputs : [];
      
      // If method with Gas limit
      dispatch({type: 'set_method_call_result', payload: undefined});
  
      if(!!params.length && method.stateMutability !== 'view'){
        dispatch({type: 'set_mode', payload: 'inputMethod'});
        
        let nonce = 0;
        let gasPrice =  await provider.getGasPrice();
        dispatch({type: 'set_gas_price', payload: gasPrice.toNumber()});
        
        if(checkAddress(state.publicKey)){
          nonce = await provider.getTransactionCount(state.publicKey);
          dispatch({type: 'set_nonce', payload: nonce});
          
        }
        
        const defaultData = [
          {name: "gasPrice", value: gasPrice.toNumber() || 100000000, type: "uint256"},
          {name: "gasLimit", value: 21000, type: "uint256"},
          {name: "nonce", value: nonce, type: "uint256"}];
        
        params = params.concat(defaultData);
        
        if(method.payable)  params = params.concat({name: "value", value: 0, type: "uint256"});
        
        dispatch({type: 'set_params', payload: params});
        // If method without params
      }else if(!params.length) {
        dispatch({type: 'set_mode', payload: 'callMethod'});
        let methodResult = await callMethod();
        
        if(method.outputs[0].type === 'uint256'){
          methodResult = methodResult.toNumber();
        }
        
        console.log(methodResult, params);
  
        dispatch({type: 'set_method_call_result', payload: methodResult});
      }else{
        dispatch({type: 'set_mode', payload: 'viewMethod'});
        dispatch({type: 'set_params', payload: params});
      }
      
    }catch (e) {
      dispatchGlobal({type: 'set_global_error', payload: typeof e === 'object'? e.message: e})
    }
    dispatchGlobal({type: 'set_is_loading_method'});
  };
  
  useEffect(() => {
    if(state.methodName) getMethodInformation();
  }, [state.methodName, state.publicKey]);
  
  return [state, dispatch]
};

export const normalizeTransaction = (publicKey, addressCon, methodParams, abi, methodName, web3) => {
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

export const downloadOneTransaction = (stateContract, stateMethod, web3) => {
  let {contractAddress, abi} = stateContract;
  let {methodParams, methodName, publicKey} = stateMethod;
  
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

export const RecalculateGasLimit = async (state, dispatch, web3) => {
  let transaction = normalizeTransaction(state.publicKey, state.contractAddress,
      state.methodParams, state.abi, state.methodName, web3);
  
  try{
    const estimateGas = await web3.eth.estimateGas({
      "from"      : state.publicKey,
      "nonce"     : state.nonce,
      "to"        : state.contractAddress,
      "data"      : transaction.data
    });
    
    let params = state.params;
    
    for(let key in params){
      if(params[key].name === 'gasLimit'){
        params[key].value = estimateGas;
      }
    }
    dispatch({type: 'set_params', payload: params})
    
  }catch (e) {
    let msg =  e.message ? e.message : e;
    dispatch({type: 'set_error', payload: msg.split('(')[0]})
  }
  
};
