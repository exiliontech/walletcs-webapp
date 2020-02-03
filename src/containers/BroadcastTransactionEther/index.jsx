import React, { useContext, useReducer, useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { utils } from 'ethers';
import * as _ from 'lodash';
import { useSnackbar } from 'notistack';
import { parserEtherFile } from "../../utils";
import { broadcastReducer, initStateBroadcast } from '../../reducers';
import Web3Context from '../../contexts/Web3Context';
import BroadcastWCS from '../../components/BroadcastWCS';
import GlobalReducerContext from '../../contexts/GlobalReducerContext';

import { styles } from './styles.js';


const BroadcastTransactionEther = ({ className, ...props }) => {
  const { classes } = props;
  const [state, dispatch] = useReducer(broadcastReducer, initStateBroadcast);
  const { dispatchGlobal } = useContext(GlobalReducerContext);
  const { etherProvider } = useContext(Web3Context);
  const [isBroadcasted, stateBroadcasted] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const onDelete = (index) => {
    dispatch({ type: 'delete_transaction', payload: index });
  };

  const handleLoadFile = (e) => {
    try {
      const transactions = parserEtherFile(e.target.result);

      dispatch({ type: 'set_origin_transactions', payload: JSON.parse(e.target.result) });
      dispatch({ type: 'set_table', payload: transactions });

      const rows = [];
      _.each(transactions, (tx) => {
        const contractAddress = tx.transaction.to;
        const methodName = tx.transaction.data.name || 'Transfer';
        rows.push({ contractAddress, methodName });
      });
      dispatch({ type: 'set_rows', payload: rows });
    } catch (error) {
      console.warn(error);
      dispatchGlobal({ type: 'set_global_error', payload: 'File type is not correct or file is for another network.' });
    }
  };

  const onAttachFile = (e) => {
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = ev => handleLoadFile(ev);

    if (!file || !file.name.endsWith('.json' || '.csv')) {
      dispatchGlobal({ type: 'set_global_error', payload: 'File type is not correct.' });
    } else {
      dispatch({ type: 'set_filename', payload: file.name });
      fileReader.readAsText(e.target.files[0]);
    }
  };

  const onCloseModal = () => {
    dispatch({ type: 'set_modal_open' });
  };

  const onBroadcast = async () => {
    const txs = state.originTransactions.transactions;

    txs.forEach(async (rawTx, index) => {
      const readableTransaction = state.table[index].transaction;
      try {
        const tx = await etherProvider.broadcast(rawTx);

        if (tx.message) {
          throw new Error(tx.message);
        }

        readableTransaction.success = true;
        readableTransaction.transaction_id = tx;
        readableTransaction.isVisible = true;

        enqueueSnackbar(`${tx} Broadcasted successfully`, { variant: 'success' });

        dispatch({ type: 'add_result', payload: readableTransaction });
      } catch (e) {
        readableTransaction.success = false;
        console.warn(e.message);

        readableTransaction.error_details = e.message ? e.message : e;
        readableTransaction.isVisible = true;
        console.warn(readableTransaction);
        
        dispatch({ type: 'add_result', payload: readableTransaction });
      }
    });
    stateBroadcasted(true);
  };

  const onOpenModal = (index) => {
    const data = state.table[index];
    const formatedData = { details: [] };
    formatedData.contractAddress = data.transaction.to;

    const { transaction } = data;

    const parse = (data) => {
      const list = [];
      for (const key in data) {
        const obj = {};
        obj.key = data[key].name;
        obj.value = data[key].value;
        list.push(obj);
      }
      return list;
    };

    const { data: transactionData, gasLimit, gasPrice, nonce, value } = transaction;

    const params = parse(transactionData.params);
    params.push({ key: 'gasLimit', value: utils.formatEther(gasLimit) });
    params.push({ key: 'gasPrice', value: utils.formatEther(gasPrice) });
    params.push({ key: 'nonce', value: nonce });

    if (transaction.value) {
      params.push({
        key: 'value',
        value: utils.formatEther(value)
      });
    }

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
      parentState={state}
      parentDispatch={dispatch}
      isBroadcasted={isBroadcasted}
      currency='ether_tx'
    />
  );
};

BroadcastTransactionEther.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BroadcastTransactionEther);
