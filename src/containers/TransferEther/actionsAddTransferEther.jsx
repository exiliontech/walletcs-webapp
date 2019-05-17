import { useContext, useEffect } from "react";
import Web3Context from "../../contexts/Web3Context";
import GlobalReducerContext from "../../contexts/GlobalReducerContext";


export const usePrepareTransfer = (dispatch) => {
  const {provider} = useContext(Web3Context);
  const {dispatchGlobal} = useContext(GlobalReducerContext);

  const getTransferInformation = async() => {
    try{
      dispatchGlobal({type: 'set_is_loading_method'});
      dispatch({type: 'set_method_call_result', payload: undefined});

      let gasPrice =  await provider.getGasPrice();
      dispatch({type: 'set_gas_price', payload: gasPrice.toNumber()});

      const defaultData = [
        {name: "gasLimit", value: 21000, type: "uint256"},
        {name: "gasPrice", value: gasPrice.toNumber() || 100000000, type: "uint256"},
        {name: "nonce", value: 0, type: "uint256"},
        {name: 'from', value: null, type: 'address'},
        {name: 'to', value: null, type: 'address'},
        {name: 'value', value: null, type: 'uint256'}
      ];

      dispatch({type: 'set_params', payload: defaultData});
      // If method without params

    }catch (e) {
      dispatchGlobal({type: 'set_global_error', payload: typeof e === 'object'? e.message: e})
    }
    dispatchGlobal({type: 'set_is_loading_method'});
  };

  useEffect(() => {
    getTransferInformation();
  }, []);
};
