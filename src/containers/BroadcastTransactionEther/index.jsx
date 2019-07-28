import React, { useContext, useReducer, useState } from 'react';
import PropTypes from 'prop-types';
import { checkAddress, FileTransactionReader } from 'walletcs';
import { withStyles } from '@material-ui/core/styles';
import { utils } from 'ethers';
import { SnackbarProvider } from 'notistack';
import { broadcastReducer, initStateBroadcast } from '../../reducers';
import Web3Context from '../../contexts/Web3Context';
import BroadcastWCS from '../../components/BroadcastWCS';
import GlobalReducerContext from '../../contexts/GlobalReducerContext';

import { styles } from './styles.js';


const BroadcastTransactionEther = ({ className, ...props }) => {
  const { classes } = props;
  const [state, dispatch] = useReducer(broadcastReducer, initStateBroadcast);
  const { dispatchGlobal } = useContext(GlobalReducerContext);
  const { provider } = useContext(Web3Context);
  const [isBroadcasted, stateBroadcasted] = useState(false);

  const onDelete = (index) => {
    dispatch({ type: 'delete_transaction', payload: index });
  };

  const handleLoadFile = (e) => {
    try {
      const parser = new FileTransactionReader(e.target.result);
      parser.parserFile();

      dispatch({ type: 'set_origin_transactions', payload: JSON.parse(e.target.result).transactions });
      dispatch({ type: 'set_table', payload: parser.transactions });

      const rows = [];
      for (const key in parser.transactions) {
        const contractAddress = parser.transactions[key].transaction.to;
        const methodName = parser.transactions[key].transaction.data.name || 'Transfer';
        rows.push({ contractAddress, methodName });
      }

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

  // const onBroadcast = () => {
  //   for (const key in state.originTransactions) {
  //     const readableTransaction = state.table[key].transaction;
  //     provider.sendTransaction(state.originTransactions[key].transaction).then(
  //       (tx) => {
  //         console.log(tx);
  //         readableTransaction.success = true;
  //         readableTransaction.transaction_id = tx.hash;
  //         dispatch({ type: 'add_result', payload: readableTransaction });
  //       },
  //       (e) => {
  //         readableTransaction.success = false;
  //         readableTransaction.error_details = e.message ? e.message : e;
  //         dispatch({ type: 'add_result', payload: readableTransaction });
  //       },
  //     );
  //
  //   }
  //   stateBroadcasted(true);
  // };

  const onBroadcast = async (event) => {
    for (const key in state.originTransactions) {
      const readableTransaction = state.table[key].transaction;
      try {
        const tx = await provider.sendTransaction(state.originTransactions[key].transaction);
        readableTransaction.success = true;
        readableTransaction.transaction_id = tx.hash;
        dispatch({ type: 'add_result', payload: readableTransaction });
      } catch (e) {
        readableTransaction.success = false;
        readableTransaction.error_details = e.message ? e.message : e;
        dispatch({ type: 'add_result', payload: readableTransaction });
      }
    }
    stateBroadcasted(true);
  };

  const createCSVReport = () => {
    const rows = [
      ['transaction_id', 'address', 'amount', 'success', 'error_details'],
    ];

    const { resultsTable } = state;

    for (let i = 0; i < resultsTable.length; i += 1) {
      const row = resultsTable[i];
      rows.push([row.transaction_id, row.to, row.value, row.success, row.error_details]);
    }

    let csvContent = 'data:text/csv;charset=utf-8,';

    rows.forEach((rowArray) => {
      const row = rowArray.join(',');
      csvContent += `${row}\r\n`;
    });
    return csvContent;
  };

  const onDownloadReport = () => {
    const data = createCSVReport();
    const encodedUri = encodeURI(data);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    const date = Date.now();
    link.setAttribute('download', `Report-${date}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
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
    if (transaction.value) params.push({ key: 'value', value: utils.formatEther(transaction.value) });
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
          onDownloadReport={onDownloadReport}
          parentState={state}
          isBroadcasted={isBroadcasted}
          currency='ether_tx'/>
      </SnackbarProvider>
  );
};

BroadcastTransactionEther.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BroadcastTransactionEther);
