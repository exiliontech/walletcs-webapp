export const initStateMethodReducer = {
  methodName: undefined,
  methodType: undefined,
  gasPrice: undefined,
  gasLimit: undefined,
  nonce: undefined,
  methodParams: [],
  methodCallResult: undefined,
  isViewMethod: false,
  isLoding: false
};

export const methodReducer = (state, action) => {
  switch (action.type) {
    case 'set_public_key':
      return {...state, publicKey: action.payload};
    case 'set_method_type':
      return {...state, methodType: action.payload};
    case 'set_method_name':
      return {...state, methodName: action.payload};
    case 'set_params':
      return {...state, methodParams: action.payload};
    case 'set_gas_price':
      return {...state, gasPrice: action.payload};
    case 'set_gas_limit':
      return {...state, gasLimit: action.payload};
    case 'set_nonce':
      return {...state, nonce: action.payload};
    case 'set_method_call_result':
      return {...state, methodCallResult: action.payload};
    case 'set_mode':
      return {...state, mode: action.payload}
  };
}
