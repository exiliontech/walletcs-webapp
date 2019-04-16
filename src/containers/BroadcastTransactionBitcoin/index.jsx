import React, {useReducer} from 'react';
import PropTypes from 'prop-types';
import {checkAddress, FileTransactionReader, BitcoinTransaction} from "walletcs";
import { withStyles } from "@material-ui/core/styles";
import {broadcatReducer, initStateBroadcst} from "../../reducers";

import {styles} from './styles.js';
import BroadcastWCS from "../../components/BroadcastWCS";


const BroadcastTransactionBitcoin = ({className, ...props}) => {
  const {classes} = props;
  const [state, dispatch] = useReducer(broadcatReducer, initStateBroadcst);

  const onDelete = (index) => {
    dispatch({type: 'delete_transaction', payload: index});
  };
  
  const handleLoadFile = (e) => {
    try{
      let parser = new FileTransactionReader(e.target.result);
      parser.parserFile();
      
      dispatch({type: 'set_origin_transactions', payload: JSON.parse(e.target.result).transactions});
      dispatch({type: 'set_table', payload: parser.transactions});
      
      let rows = [];
      for(let key in parser.transactions){
        let contractAddress = parser.transactions[key].transaction.to;
        let methodName = parser.transactions[key].transaction.data.name || 'Transfer';
        rows.push({'contractAddress': contractAddress, 'methodName': methodName})
      }
      
      dispatch({type: 'set_rows', payload: rows})
      
    }catch (e) {
      let msg =  e.message ? e.message : e;
      dispatch({type: 'set_global_error', payload: msg.split('(')[0]})
    }
  };
  
  const onAttachFile = (e) => {
    let file = e.target.files[0];
    let fileReader = new FileReader();
    fileReader.onload = e => handleLoadFile(e);
    if(!file.name.endsWith('.json')){
      dispatch({type: 'set_global_error', payload: 'File type is not correct'})
    }else{
      dispatch({type: 'set_filename', payload: file.name});
      fileReader.readAsText(e.target.files[0])
    }
  };
  
  const onCloseModal = () => {
    dispatch({type: 'set_modal_open'})
  };
  
  const onBroadcast = async(e) => {
    try{
      for(let key in state.originTransactions){
        await BitcoinTransaction.broadcastTx(state.originTransactions[key], process.env.REACT_APP_BITCOIN_NETWORK)
      }
      dispatch({type: 'set_global_success', payload: 'Success send all transactions.'})
    }catch (e) {
      let msg =  e.message ? e.message : e;
      dispatch({type: 'set_global_error', payload: 'Error in tx: ' + msg.split('(')[0]})
    }
    
  };
  
  const onOpenModal = (index) => {
    let data = state.table[index];
    let formatedData = {details: []};
    formatedData.contractAddress = data.transaction.to;
    
    let transaction = data.transaction;
    
    let parse = (data) => {
      let list =[];
      for(let key in data){
        let obj = {};
        obj['key'] = data[key].name;
        obj['value'] = data[key].value;
        list.push(obj)
      }
      return list;
    };
    
    let params = parse(transaction.data.params);
    formatedData.details = params;
    
    dispatch({type: 'set_modal_data', payload: formatedData});
    dispatch({type: 'set_modal_open'});
  };
  
  return (
      <BroadcastWCS
          classes={classes}
          onAttachFile={onAttachFile}
          onBroadcast={onBroadcast}
          onCloseModal={onCloseModal}
          onDelete={onDelete}
          onOpenModal={onOpenModal}
          state={state}/>)
};

BroadcastTransactionBitcoin.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BroadcastTransactionBitcoin);
