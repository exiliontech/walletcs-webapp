import React, { useContext, useReducer, useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import * as _ from 'lodash';
import { SnackbarProvider } from 'notistack';
import { broadcastReducer, initStateBroadcast } from '../../reducers';
import { styles } from './styles.js';
import BroadcastWCS from '../../components/BroadcastWCS';
import GlobalReducerContext from '../../contexts/GlobalReducerContext';
import { parserBitcoinFile } from "../../utils";
import Web3Context from "../../contexts/Web3Context";


const BroadcastTransactionBitcoin = ({ className, ...props }) => {
  const { classes } = props;
  const [state, dispatch] = useReducer(broadcastReducer, initStateBroadcast);
  const { dispatchGlobal } = useContext(GlobalReducerContext);
  const { bitcoinProvider } = useContext(Web3Context);
  const [isBroadcasted, stateBroadcasted] = useState(false);

  const onDelete = (index) => {
    dispatch({ type: 'delete_transaction', payload: index });
  };

  const handleLoadFile = (e) => {
    try {
      const transactions = parserBitcoinFile(e.target.result);
      dispatch({ type: 'set_origin_transactions', payload: JSON.parse(e.target.result).transactions });
      dispatch({ type: 'set_table', payload: transactions });

      const rows = [];
      _.each(transactions, (tx) => {
        const contractAddress = tx.params[0].to;
        const methodName = 'Transfer';
        rows.push({
          contractAddress,
          methodName,
          params: tx.params,
        });
      });

      dispatch({ type: 'set_rows', payload: rows });
    } catch (e) {
      dispatchGlobal({ type: 'set_global_error', payload: 'File type is not correct or file is for another network.' });
    }
  };

  const onAttachFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const fileReader = new FileReader();
    fileReader.onload = e => handleLoadFile(e);
    if (!file.name.endsWith('.json')) {
      dispatchGlobal({ type: 'set_global_error', payload: 'File type is not correct' });
    } else {
      dispatch({ type: 'set_filename', payload: file.name });
      fileReader.readAsText(e.target.files[0]);
    }
  };

  const onCloseModal = () => {
    dispatch({ type: 'set_modal_open' });
  };

  const onBroadcast = async (e) => {
    try {
      _.each(state.originTransactions, async (rawTx) => {
        await bitcoinProvider.broadcast(rawTx);
      });
      dispatchGlobal({ type: 'set_global_success', payload: 'Success send all transactions.' });
    } catch (e) {
      const msg = e.message ? e.message : e;
      dispatchGlobal({ type: 'set_global_error', payload: `Error in tx: ${msg.split('(')[0]}` });
    }
    stateBroadcasted(true);
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
      <SnackbarProvider>
      <BroadcastWCS
          classes={classes}
          onAttachFile={onAttachFile}
          onBroadcast={onBroadcast}
          onCloseModal={onCloseModal}
          onDelete={onDelete}
          onOpenModal={onOpenModal}
          currency={'bitcoin'}
          isBroadcasted={isBroadcasted}
          parentState={state}/>
      </SnackbarProvider>
  );
};

BroadcastTransactionBitcoin.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BroadcastTransactionBitcoin);
