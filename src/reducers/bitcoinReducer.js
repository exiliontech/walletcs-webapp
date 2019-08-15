import _ from 'lodash';

export const initStateBitcoin = {
  from_addresses: [{ value: '' }],
  to_addresses: [{ value: '' }],
  amounts: [{ value: '' }],
  change_address: null,
  fee: null,
  table: [],
};

export const bitcoinReducer = (state, action) => {
  switch (action.type) {
    case 'set_from':
      if (action.index !== undefined) {
        state.from_addresses[action.index] = { value: action.payload };
      }
      if (action.index === undefined) {
        state.from_addresses.push({ value: action.payload });
      }
      return ({ ...state });
    case 'set_to':
      if (action.index !== undefined) {
        state.to_addresses[action.index] = { value: action.payload };
      }
      if (action.index === undefined) {
        state.to_addresses.push({ value: action.payload });
      }
      return ({ ...state });
    case 'set_amount':
      if (action.index !== undefined && action.payload !== undefined) {
        state.amounts[action.index] = { value: action.payload };
      }
      if (action.index === undefined) {
        state.amounts.push({ value: action.payload });
      }
      return ({ ...state });
    case 'replace_from_csv':
      return ({
        ...state,
        from_addresses: action.payload.from_addresses.map(value => ({ value })),
        to_addresses: action.payload.to_addresses.map(value => ({ value })),
        amounts: action.payload.amounts.map(value => ({ value })),
        change_address: action.payload.change_address,
      });
    case 'delete_from':
      return ({ ...state, from_addresses: _.filter(state.from_addresses, (val, index) => index !== action.index) });
    case 'delete_to':
      return ({ ...state, to_addresses: _.filter(state.to_addresses, (val, index) => index !== action.index) });
    case 'delete_amount':
      return ({ ...state, amounts: _.filter(state.amounts, (val, index) => index !== action.index) });
    case 'set_change_address':
      return ({ ...state, change_address: action.payload });
    case 'set_fee':
      return ({ ...state, fee: action.payload });
    case 'set_table':
      return ({ ...state, table: action.payload });
    case 'reset_data':
      return ({ ...initStateBitcoin, from_address: state.from_address });
    case 'add_to_table':
      let { table } = state;
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
