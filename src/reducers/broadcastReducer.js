export const initStateBroadcast = {
  table: [],
  modalIsOpen: false,
  modalData: [],
  filename: undefined,
  error: undefined,
};

export const broadcastReducer = (state, action) => {
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
