export const initStateBroadcast = {
  table: [],
  modalIsOpen: false,
  modalData: [],
  filename: '',
  error: '',
  resultsTable: [],
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
      const _resultsTable = state.resultsTable;
      _resultsTable.push(action.payload);
      return { ...state, resultsTable: _resultsTable };
    case 'delete_result':
      const { resultsTable } = state;
      resultsTable.slice(action.payload, 1);
      return { ...state, resultsTable };
    case 'set_rows':
      return { ...state, rows: action.payload };
    case 'set_origin_transactions':
      return { ...state, originTransactions: action.payload };
    case 'delete_transaction':
      const _t = state.table;
      const _ot = state.originTransactions;
      const _rows = state.rows;
      _ot.splice(action.payload, 1);
      _t.splice(action.payload, 1);
      _rows.splice(action.payload, 1);
      return { ...state, ...{ rows: _rows, originTransactions: _ot, table: _t } };
    default:
      throw new Error(`Unexpected param: ${action.type}`);
  }
};
