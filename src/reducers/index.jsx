export const initStateContractReducer = {
  publicKey: undefined,
  contractAddress: undefined,
  contract: undefined,
  contractName: undefined,
  nonce: 0,
  abi: [],
  table: [],
  isViewMethod: false
};

export const contractReducer = (state, action) => {
  switch (action.type) {
    case 'set_contract_address':
      return {...state, contractAddress: action.payload};
    case 'set_contract_name':
      return {...state, contractName: action.payload};
    case 'set_abi':
      return {...state, abi: action.payload};
    case 'add_to_table':
      let table = state.table;
      table.push(action.payload);
      return {...state, table:  table};
    case 'delete_from_table':
      table = state.table;
      table.splice(action.payload, 1);
      return {...state, table: table};
    case 'reset_data':
      initStateContractReducer.publicKey = state.publicKey;
      initStateContractReducer.contractAddress = state.contractAddress;
      return {...state, ...initStateContractReducer};
    case 'set_contract':
      return{...state, contract: action.payload};
  }
};

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

export const initLoadTransactionState = {
  table: [],
  modalIsOpen: false,
  modalData: [],
  filename: undefined,
  error: undefined,
};

export const loadTransactionsReducer = (state, action) => {
  switch (action.type) {
    case 'set_table':
      return {...state, table: action.payload};
    case 'set_modal_open':
      return {...state, modalIsOpen: !state.modalIsOpen};
    case 'set_modal_data':
      return {...state, modalData: action.payload};
    case 'set_filename':
      return {...state, filename: action.payload};
    case 'set_error':
      return {...state, error: action.payload};
    case 'set_rows':
      return {...state, rows: action.payload};
    case 'set_origin_transactions':
      return {...state, originTransactions: action.payload};
    case 'delete_transaction':
      let _t = state.table;
      let _ot = state.originTransactions;
      let _rows = state.rows;
      _ot.splice(action.payload, 1);
      _t.splice(action.payload, 1);
      _rows.splice(action.payload, 1);
      return {...state, ...{rows: _rows, originTransactions: _ot, table: _t}}
  }
};

export const initGlobalState = {
  error: undefined,
  isLoadingContract: false,
  isLoadingMethod: false,
};

export const  globalReducer = (state, action) => {
  switch (action.type) {
    case 'set_global_error':
      return ({...state, error: action.payload});
    case 'set_is_loading_contract':
      return {...state, isLoadingContract: !state.isLoadingContract};
    case 'set_is_loading_method':
      return {...state, isLoadingMethod: !state.isLoadingMethod};
  }
};
