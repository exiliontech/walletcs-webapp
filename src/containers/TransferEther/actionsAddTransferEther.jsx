import {useContext, useEffect, useReducer} from "react";
import Web3Context from "../../contexts/Web3Context";
import {initStateMethodReducer, methodReducer} from "../../reducers";
import GlobalReducerContext from "../../contexts/GlobalReducerContext";
import {checkAddress} from "walletcs";


export const useTransfer = () => {
  const {provider} = useContext(Web3Context);
  const [state, dispatch] = useReducer(methodReducer, initStateMethodReducer);
  const {dispatchGlobal} = useContext(GlobalReducerContext);
  
  const getTransferInformation = async() => {
    let params = [
      {name: 'from', value: null, type: 'address'},
      {name: 'to', value: null, type: 'address'},
      {name: 'value', value: null, type: 'uint256'}
    ];
    
    try{
      dispatchGlobal({type: 'set_is_loading_method'});
      dispatch({type: 'set_method_call_result', payload: undefined});
      
      let nonce = 0;
      let gasPrice =  await provider.getGasPrice();
      dispatch({type: 'set_gas_price', payload: gasPrice.toNumber()});
      
      if(checkAddress(state.publicKey)){
        nonce = await provider.getTransactionCount(state.publicKey);
        dispatch({type: 'set_nonce', payload: nonce});
        
      }
      
      const defaultData = [
        {name: "gasPrice", value: gasPrice.toNumber() || 100000000, type: "uint256"},
        {name: "gasLimit", value: null, type: "uint256"},
        {name: "nonce", value: nonce, type: "uint256"}];
        
        if(!!params.length) params = params.concat(defaultData);
        
        dispatch({type: 'set_params', payload: params});
        // If method without params
      
    }catch (e) {
      dispatchGlobal({type: 'set_global_error', payload: typeof e === 'object'? e.message: e})
    }
    dispatchGlobal({type: 'set_is_loading_method'});
  };
  
  useEffect(() => {
    getTransferInformation();
  }, [state.publicKey]);
  
  return [state, dispatch]
};
