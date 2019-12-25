/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import { useContext, useEffect, useReducer } from 'react';
import { ethers } from 'ethers';
import cloneDeep from 'clone-deep';
import * as structures from '@exiliontech/walletcs/src/base/structures';
import * as _ from 'lodash';
import {DEFAULT_PARAMS, GAS_PRICE} from '../../consts/ethereum';
import { checkEtherAddress } from '../../utils';
import Web3Context from '../../contexts/Web3Context';
import GlobalReducerContext from '../../contexts/GlobalReducerContext';
import {
  contractReducer, initStateContractReducer, initStateMethodReducer, methodReducer,
} from '../../reducers';

export const GAS_LIMIT = 21000;

export const useContractInfo = () => {
  // Calculates contract information
  const [state, dispatch] = useReducer(contractReducer, initStateContractReducer);
  const { etherProvider } = useContext(Web3Context);
  const { dispatchGlobal } = useContext(GlobalReducerContext);

  const getContractInformation = async () => {
    if (checkEtherAddress(state.contractAddress)) {
      try {
        dispatchGlobal({ type: 'set_is_loading_contract' });

        const stringAbi = await etherProvider.getAbi(state.contractAddress);
        if (!stringAbi) throw Error('This is not contract address or contract is not verified.');
        if (stringAbi) {
          const abi = JSON.parse(stringAbi);
          dispatch({ type: 'set_abi', payload: abi });
          console.log('ABI:', abi);
          const contract = new ethers.Contract(state.contractAddress, abi, new ethers.providers.JsonRpcProvider(etherProvider.url));
          console.log('CONTRACT:', contract);
          dispatch({ type: 'set_contract', payload: contract });
          console.log(etherProvider);
          const contractName = await etherProvider.getContractName(state.contractAddress);
          console.log('CONTRACT NAME:', contractName);
          if (!contractName) {
            dispatch({ type: 'set_contract_name', payload: contractName });
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
  }, [state.contractAddress]);

  return [state, dispatch];
};

export const useMethodInfo = (stateContract) => {
  // This method calculates method information and returns stateMethod and dispatchMethod
  const { etherProvider } = useContext(Web3Context);
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
        const gasPrice = parseInt(await etherProvider.getGasPrice(), 16);
        dispatch({ type: 'set_gas_price', payload: gasPrice });

        if (checkEtherAddress(state.publicKey)) {
          nonce = parseInt(await etherProvider.getNonce(state.publicKey), 16);
          dispatch({ type: 'set_nonce', payload: nonce });
        }

        const defaultData = [
          { name: 'gasPrice', value: gasPrice || GAS_PRICE, type: 'uint256' },
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
  }, [state.methodName, state.publicKey]);

  return [state, dispatch];
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
  let { methodParams, publicKey, methodName } = stateMethod;

  // TODO: Need more reasonable solution for a undefined publicKey
  if (!publicKey) {
    for (let i = 0; i < methodParams.length; i += 1) {
      if (methodParams[i].name === 'from') {
        publicKey = methodParams[i].value;
      }
    }
  }
  const transaction = createTxFromParams(contractAddress, publicKey, methodParams, abi, methodName);
  const etherFile = cloneDeep(structures.EtherFileTransaction);
  etherFile.transactions.push(transaction);
  etherFile.contracts.push({
    address: contractAddress,
    abi
  });
  downloadFile('tr-', JSON.stringify(etherFile));
};

const createTxFromParams = (contractAddress, publicKey, methodParams, abi, methodName) => {
  const transaction = cloneDeep(structures.EtherTransaction);

  if (contractAddress) {
    transaction.to.push({ address: contractAddress });
  } else {
    transaction.to.push({
      address: methodParams.find(value => value.name === 'to').value,
      amount: methodParams.find(value => value.name === 'value').value
    });
  }

  transaction.from.push({ address: publicKey });
  transaction.nonce = methodParams.find(value => value.name === 'nonce').value || 0;
  transaction.gasLimit = methodParams.find(value => value.name === 'gasLimit').value || GAS_LIMIT;
  transaction.gasPrice = methodParams.find(value => value.name === 'gasPrice').value || GAS_PRICE;
  const filteredParams = methodParams.filter(param => !DEFAULT_PARAMS.includes(param.name));
  if (filteredParams.length) {
    const values = filteredParams.map(val => val.value);
    const inter = new ethers.utils.Interface(abi);
    transaction.data = inter.functions[methodName].encode(values);
  }
  return transaction;
};

export const calculateGasLimit = async (transaction, provider, params) => {
  // Calculate gas limit
  console.log(transaction, provider, params);
  try {
    const tx = shallowCopy(transaction);
    let estimateGas = parseInt(await provider.getGasLimit(tx), 16);
    if (!estimateGas) estimateGas = GAS_LIMIT;
    for (const key in params) {
      if (params[key].name === 'gasLimit') {
        params[key].value = estimateGas;
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

export const recalculateGasLimit = async (stateContract, stateMethod, dispatchMethod, dispatchGlobal, provider) => {
  // Recalculate gasLimit
  const { contractAddress } = stateContract || { contractAddress: null, abi: null };
  const { methodParams } = stateMethod;
  const transaction = {
    to: contractAddress,
    gasPrice: `0x${methodParams.find(val => val.name === 'gasPrice').value.toString(16)}`,
    nonce: `0x${methodParams.find(val => val.name === 'nonce').value.toString(16)}`,
  };
  const params = await calculateGasLimit(transaction, provider, methodParams);
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
        if (Number.isInteger(val)){

        } else if (val.startsWith('0x')) {
          val = parseInt(val, 16);
        } else if (val.indexOf(',') > -1) {
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
