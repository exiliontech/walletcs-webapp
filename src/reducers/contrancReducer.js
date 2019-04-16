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
