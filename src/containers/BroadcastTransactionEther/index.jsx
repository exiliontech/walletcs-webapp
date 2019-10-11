import React, { useContext, useReducer, useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { utils } from 'ethers';
import { SnackbarProvider } from 'notistack';
import * as _ from 'lodash';
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
    _.each(state.originTransactions, async (rawTx, index) => {
      const readableTransaction = state.table[index].transaction;
      try {
        const tx = await etherProvider.broadcast(rawTx);
        readableTransaction.success = true;
        readableTransaction.transaction_id = tx.hash;
        readableTransaction.isVisible = true;
        dispatch({ type: 'add_result', payload: readableTransaction });
      } catch (e) {
        readableTransaction.success = false;
        readableTransaction.error_details = e.message ? e.message : e;
        readableTransaction.isVisible = true;
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

    const params = parse(transaction.data.params);
    params.push({ key: 'gasLimit', value: transaction.gasLimit });
    params.push({ key: 'gasPrice', value: transaction.gasPrice });
    params.push({ key: 'nonce', value: transaction.nonce });
    if (transaction.value) params.push({ key: 'value', value: utils.formatEther(utils.parseEther(transaction.value)) });
    formatedData.details = params;

    dispatch({ type: 'set_modal_data', payload: formatedData });
    dispatch({ type: 'set_modal_open' });
  };

  return (
      <SnackbarProvider maxSnack={12}
                        autoHideDuration={999999}
                        preventDuplicate
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'right',
                        }}>
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
          currency='ether_tx'/>
      </SnackbarProvider>
  );
};

BroadcastTransactionEther.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BroadcastTransactionEther);
