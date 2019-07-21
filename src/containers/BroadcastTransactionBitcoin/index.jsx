import React, { useContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import { FileTransactionReader, BitcoinTransaction } from 'walletcs';
import { withStyles } from '@material-ui/core/styles';
import { broadcastReducer, initStateBroadcast } from '../../reducers';

import { styles } from './styles.js';
import BroadcastWCS from '../../components/BroadcastWCS';
import GlobalReducerContext from '../../contexts/GlobalReducerContext';


const BroadcastTransactionBitcoin = ({ className, ...props }) => {
  const { classes } = props;
  const [state, dispatch] = useReducer(broadcastReducer, initStateBroadcast);
  const { stateGlobal, dispatchGlobal } = useContext(GlobalReducerContext);

  const onDelete = (index) => {
    dispatch({ type: 'delete_transaction', payload: index });
  };

  const handleLoadFile = (e) => {
    try {
      const parser = new FileTransactionReader(e.target.result);

      parser.parserFile(true);
      dispatch({ type: 'set_origin_transactions', payload: JSON.parse(e.target.result).transactions });
      dispatch({ type: 'set_table', payload: parser.transactions });

      const rows = [];
      for (const key in parser.transactions) {
        const contractAddress = parser.transactions[key].params[0].to;
        const methodName = 'Transfer';
        rows.push({ contractAddress: contractAddress, methodName: methodName, params: parser.transactions[key].params });
      }

      dispatch({ type: 'set_rows', payload: rows });
    } catch (e) {
      const msg = e.message ? e.message : e;
      dispatchGlobal({ type: 'set_global_error', payload: msg.split('(')[0] });
    }
  };

  const onAttachFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const fileReader = new FileReader();
    fileReader.onload = e => handleLoadFile(e);
    if (!file.name.endsWith('.json')) {
      dispatchGlobal({ type: 'set_global_error', payload: 'File type is not correct' });
    }else {
      dispatch({ type: 'set_filename', payload: file.name });
      fileReader.readAsText(e.target.files[0]);
    }
  };

  const onCloseModal = () => {
    dispatch({ type: 'set_modal_open' });
  };

  const onBroadcast = async (e) => {
    try {
      for (const key in state.originTransactions) {
        const network = process.env.REACT_APP_BITCOIN_NETWORK === 'BTC_TESTNET' ? 'test3' : 'main';
        const result = await BitcoinTransaction.broadcastTx(state.originTransactions[key].transaction, network);
        console.log(result);
      }
      dispatchGlobal({ type: 'set_global_success', payload: 'Success send all transactions.' });
    } catch (e) {
      const msg = e.message ? e.message : e;
      dispatchGlobal({ type: 'set_global_error', payload: `Error in tx: ${  msg.split('(')[0]}` });
    }
  };

  const onOpenModal = (index) => {
    const data = state.table[index];
    const formatedData = { details: [] };
    formatedData.contractAddress = data.params[0].to;

    const parse = (data) => {
      const list = [];
      for (const key in data) {
        let obj = {};
        obj.key = 'amount';
        obj.value = data[key].value;
        list.push(obj);

        obj = {};
        obj.key = 'to';
        obj.value = data[key].to;
        list.push(obj);
      }
      return list;
    };

    const params = parse(data.params);
    formatedData.details = params;

    dispatch({ type: 'set_modal_data', payload: formatedData });
    dispatch({ type: 'set_modal_open' });
  };

  return (
      <BroadcastWCS
          classes={classes}
          onAttachFile={onAttachFile}
          onBroadcast={onBroadcast}
          onCloseModal={onCloseModal}
          onDelete={onDelete}
          onOpenModal={onOpenModal}
          parentState={state}/>);
};

BroadcastTransactionBitcoin.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BroadcastTransactionBitcoin);
