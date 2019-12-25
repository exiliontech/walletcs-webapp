export const initStateBroadcast = {
  table: [],
  modalIsOpen: false,
  modalData: [],
  filename: '',
  error: '',
  resultsBroadcastTable: [],
};

export const broadcastReducer = (state, action) => {
  switch (action.type) {
    case 'set_table':
      return { ...state, table: action.payload };
    case 'set_modal_open':
      return { ...state, modalIsOpen: !state.modalIsOpen };
    case 'set_modal_data':
      return { ...state, modalData: action.payload };
    case 'set_filename':
      return { ...state, filename: action.payload };
    case 'set_error':
      return { ...state, error: action.payload };
    case 'add_result':
      const _resultsTable = state.resultsBroadcastTable;
      _resultsTable.push(action.payload);
      return { ...state, resultsBroadcastTable: _resultsTable };
    case 'set_show_result':
      return { ...state, resultsBroadcastTable: action.payload };
    case 'set_rows':
      return { ...state, rows: action.payload };
    case 'set_origin_transactions':
      return { ...state, originTransactions: action.payload };
    case 'delete_transaction':
      const { table, originTransactions, rows } = state;

      originTransactions.transactions.splice(action.payload, 1);
      table.splice(action.payload, 1);
      rows.splice(action.payload, 1);

      return { ...state, rows, originTransactions, table };
    default:
      throw new Error(`Unexpected param: ${action.type}`);
  }
};
