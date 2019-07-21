export const initStateBitcoin = {
  from_address: '',
  to_address: '',
  amount: null,
  table: [],
};

export const bitcoinReducer = (state, action) => {
  switch (action.type) {
    case 'set_from':
      return ({ ...state, from_address: action.payload });
    case 'set_to':
      return ({ ...state, to_address: action.payload });
    case 'set_amount':
      return ({ ...state, amount: action.payload });
    case 'set_table':
      return ({ ...state, table: action.payload });
    case 'reset_data':
      return ({ ...initStateBitcoin, from_address: state.from_address });
    case 'add_to_table':
      let {table} = state;
      table.push(action.payload);
      return { ...state, table };
    case 'delete_from_table':
      table = state.table;
      table.splice(action.payload, 1);
      return { ...state, table };
    default:
      throw new Error(`Unexpected param: ${action.type}`);
  }
};
