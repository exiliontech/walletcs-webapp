import { useContext, useEffect } from 'react';
import Web3Context from '../../contexts/Web3Context';
import GlobalReducerContext from '../../contexts/GlobalReducerContext';
import { GAS_LIMIT, GAS_PRICE } from '../../consts/ethereum';


// eslint-disable-next-line import/prefer-default-export
export const usePrepareTransfer = (dispatch) => {
  const { etherProvider } = useContext(Web3Context);
  const { dispatchGlobal } = useContext(GlobalReducerContext);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getTransferInformation = async () => {
    try {
      dispatchGlobal({ type: 'set_is_loading_method' });
      dispatch({ type: 'set_method_call_result', payload: null });
      const gasPrice = parseInt(await etherProvider.getGasPrice(), 16);
      dispatch({ type: 'set_gas_price', payload: gasPrice });

      const defaultData = [
        { name: 'gasLimit', value: GAS_LIMIT, type: 'uint256' },
        { name: 'gasPrice', value: gasPrice || GAS_PRICE, type: 'uint256' },
        { name: 'nonce', value: 0, type: 'uint256' },
        { name: 'from', value: null, type: 'address' },
        { name: 'to', value: null, type: 'address' },
        { name: 'value', value: null, type: 'uint256' },
      ];

      dispatch({ type: 'set_params', payload: defaultData });
      // If method without params
    } catch (e) {
      dispatchGlobal({ type: 'set_global_error', payload: typeof e === 'object' ? e.message : e });
    }
    dispatchGlobal({ type: 'set_is_loading_method' });
  };

  useEffect(() => {
    getTransferInformation();
  }, []);
};
