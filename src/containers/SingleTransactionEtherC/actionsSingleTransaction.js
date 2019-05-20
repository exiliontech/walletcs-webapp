import axios from 'axios';
import { useContext, useEffect, useReducer } from 'react';
import { ethers } from 'ethers';
import { checkAddress, EtherTransaction, FileTransactionGenerator } from 'walletcs';
import Web3Context from '../../contexts/Web3Context';
import GlobalReducerContext from '../../contexts/GlobalReducerContext';
import {
  contractReducer, initStateContractReducer, initStateMethodReducer, methodReducer,
} from '../../reducers';

export const GAS_LIMIT = 21000;

export const useContractInfo = () => {
  // Calculates contract information
  const [state, dispatch] = useReducer(contractReducer, initStateContractReducer);
  const { provider } = useContext(Web3Context);
  const { dispatchGlobal } = useContext(GlobalReducerContext);

  const getContractInformation = async () => {
    if (checkAddress(state.contractAddress)) {
      try {
        dispatchGlobal({ type: 'set_is_loading_contract' });
        const url = `https://api-rinkeby.etherscan.io/api?module=contract&action=getabi&address=${state.contractAddress}`;
        const urlToken = `https://api-rinkeby.etherscan.io/api?module=account&action=tokentx&contractaddress=${state.contractAddress}&page=1&offset=1`;

        let response = await axios(url);
        if (response.data.status === '0') {
          dispatchGlobal({ type: 'set_global_error', payload: response.data.result });
        } else {
          const abi = JSON.parse(response.data.result);
          dispatch({ type: 'set_abi', payload: abi });

          const contract = new ethers.Contract(state.contractAddress, abi, provider);
          dispatch({ type: 'set_contract', payload: contract });

          response = await axios(urlToken);

          if (response.data.status === '1') {
            dispatch({
              type: 'set_contract_name',
              payload: response.data.result[0] ? response.data.result[0].tokenName : undefined,
            });
          } else {
            let name;
            try {
              name = await contract.name();
            } catch (e) {
              name = '';
            }
            dispatch({ type: 'set_contract_name', payload: typeof name === 'object' ? '' : name });
          }
        }
      } catch (e) {
        dispatchGlobal({ type: 'set_global_error', payload: typeof e === 'object' ? e.message : e });
      }
      dispatchGlobal({ type: 'set_is_loading_contract' });
    }
    console.log(state);
  };

  useEffect(() => {
    getContractInformation();
  }, [getContractInformation, state.contractAddress]);

  return [state, dispatch];
};

export const useMethodInfo = (stateContract) => {
  // This method calculates method information and returns stateMethod and dispatchMethod
  const { provider } = useContext(Web3Context);
  const [state, dispatch] = useReducer(methodReducer, initStateMethodReducer);
  const { dispatchGlobal } = useContext(GlobalReducerContext);

  const getMethodInformation = async () => {
    try {
      dispatchGlobal({ type: 'set_is_loading_method' });
      dispatch({ type: 'set_method_call_result', payload: undefined });
      const method = stateContract.abi.filter(val => state.methodName === val.name)[0];
      let params = method ? method.inputs : [];
      const _inter = new ethers.utils.Interface(stateContract.abi);

      // If method with Gas limit
      dispatch({ type: 'set_method_type', payload: _inter.functions[method.name].type });

      if (_inter.functions[method.name].type === 'transaction') {
        let nonce = 0;
        const gasPrice = await provider.getGasPrice();
        dispatch({ type: 'set_gas_price', payload: gasPrice.toNumber() });

        if (checkAddress(state.publicKey)) {
          nonce = await provider.getTransactionCount(state.publicKey);
          dispatch({ type: 'set_nonce', payload: nonce });
        }

        const defaultData = [
          { name: 'gasPrice', value: gasPrice.toNumber() || 100000000, type: 'uint256' },
          { name: 'gasLimit', value: null, type: 'uint256' },
          { name: 'nonce', value: nonce, type: 'uint256' }];

        if (params.length) params = params.concat(defaultData);

        if (!!params.length && method.payable) params = params.concat({ name: 'value', value: 0, type: 'uint256' });

        dispatch({ type: 'set_params', payload: params });
        // If method without params
      } else {
        dispatch({ type: 'set_params', payload: params });
      }
    } catch (e) {
      dispatchGlobal({ type: 'set_global_error', payload: typeof e === 'object' ? e.message : e });
    }
    dispatchGlobal({ type: 'set_is_loading_method' });
  };

  useEffect(() => {
    if (state.methodName) getMethodInformation();
  }, [getMethodInformation, state.methodName, state.publicKey]);

  return [state, dispatch];
};

const _normalizeContractTransaction = (publicKey, addressCon, methodParams, abi, methodName) => {
  const defaultValues = ['gasPrice', 'gasLimit', 'nonce'];

  const newTx = {};
  const newParams = [];
  const inter = new ethers.utils.Interface(abi);

  for (let i = 0; i < methodParams.length; i++) {
    const l = methodParams[i];
    if (defaultValues.includes(l.name)) {
      newTx[l.name] = l.name === 'gasPrice' ? ethers.utils.bigNumberify(l.value) : l.value;
    } else if (inter.functions[methodName].payable && l.name === 'value') {
      newTx[l.name] = l.value;
    } else {
      newParams.push(l.value);
    }
  }

  let txData;

  try {
    txData = inter.functions[methodName].encode(newParams);
  } catch (e) {
    console.log(e, methodName);
  }

  newTx.data = txData;
  newTx.to = addressCon;

  return newTx;
};


const _normalizeTransferTransaction = (methodParams) => {
  const newTx = {};

  for (let i = 0; i < methodParams.length; i++) {
    const l = methodParams[i];
    if (l.name === 'from') continue;
    newTx[l.name] = l.name === 'gasPrice' ? ethers.utils.bigNumberify(l.value) : l.value;
  }
  newTx.data = '0x';
  return newTx;
};

export const downloadFile = (name, data) => {
  const contentType = 'text/json;charset=utf-8;';
  const filename = `${name + new Date().getTime().toString()}.json`;

  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    const blob = new Blob([decodeURIComponent(encodeURI(data))], { type: contentType });
    navigator.msSaveOrOpenBlob(blob, filename);
  } else {
    const a = document.createElement('a');
    a.download = filename;
    a.href = `data:${contentType},${encodeURIComponent(data)}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
};

export const downloadOneTransaction = (stateContract, stateMethod) => {
  const { contractAddress, abi } = stateContract;
  let { methodParams, methodName, publicKey } = stateMethod;

  // TODO: Need more reasonable solution for a undefined publicKey
  if (!publicKey) {
    for (let i = 0; i < methodParams.length; i += 1) {
      if (methodParams[i].name === 'from') {
        publicKey = methodParams[i].value;
      }
    }
  }

  const transaction = normalize(publicKey, contractAddress, methodParams, abi, methodName);
  console.log(transaction);
  const fileGenerator = new FileTransactionGenerator(publicKey);

  if (EtherTransaction.checkCorrectTx(transaction)) {
    fileGenerator.addTx(contractAddress, transaction, process.env.REACT_APP_ETH_NETWORK);
    fileGenerator.addContract(contractAddress, abi);
  }
  console.log(fileGenerator, stateMethod, stateContract);
  downloadFile('tr-', fileGenerator.generateJson());
};

const calculateGasLimit = async (transaction, params, publicKey, provider) => {
  // Calculate gas limit
  try {
    const tx = shallowCopy(transaction);
    tx.from = publicKey;
    const estimateGas = await provider.estimateGas(tx);

    for (const key in params) {
      if (params[key].name === 'gasLimit') {
        params[key].value = estimateGas.toNumber();
      }
    }
  } catch (e) {
    for (const key in params) {
      if (params[key].name === 'gasLimit') {
        params[key].value = GAS_LIMIT;
      }
    }
  }
  return params;
};

export const normalize = (publicKey, contractAddress, methodParams, abi, methodName) => {
  // Normalization for transaction params
  if (methodParams.find(val => val.name === 'from')) {
    return _normalizeTransferTransaction(methodParams);
  }
  return _normalizeContractTransaction(publicKey, contractAddress, methodParams, abi, methodName);
};

export const recalculateGasLimit = async (stateContract, stateMethod, dispatchMethod, dispatchGlobal, provider) => {
  // Recalculate gasLimit
  const { contractAddress, abi } = stateContract || { contractAddress: null, abi: null };
  const { methodParams, methodName, publicKey } = stateMethod;

  const transaction = normalize(publicKey, contractAddress, methodParams, abi, methodName);

  const params = await calculateGasLimit(transaction, stateMethod.methodParams, publicKey, provider);
  dispatchMethod({ type: 'set_params', payload: params });
};

export const shallowCopy = (object) => {
  const result = {};
  for (const key in object) { result[key] = object[key]; }
  return result;
};

export const validationInput = (params, val, name) => {
  for (const key in params) {
    if (params[key].name === name) {
      if (params[key].type.indexOf('[]') > -1) {
        val = val.split(',');
      } else if (params[key].type.indexOf('uint') > -1) {
        if (val.indexOf(',') > -1) {
          val = val.replace(',', '.');
          val = ethers.utils.parseEther(val);
        } else if (val.indexOf(',') > -1) {
          val = ethers.utils.parseEther(val);
        }
      }
      params[key].value = val;
    }
  }

  return params;
};
