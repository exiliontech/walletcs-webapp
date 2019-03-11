import React, {useContext, useReducer, useState} from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import {checkAddress, FileTransactionReader} from "walletcs";

import { withStyles } from "@material-ui/core/styles";
import ContentCardWCS from "../../components/ContentCardWCS";
import {IconButton, InputAdornment, Typography} from "@material-ui/core";
import UploadCloudIcon from '@material-ui/icons/CloudUpload';
import InputWCS from "../../components/InputWCS";
import ButtonWCS from "../../components/ButtonWCS";
import TableWCS from "../../components/TableWCS";
import {loadTransactionsReducer, initLoadTransactionState} from "../../reducers";
import SnackbarWCS from "../../components/SnackbarWCS";
import ModalWrappedWCS from "../../components/ModalWCS";
import Web3Context from "../../contexts/Web3Context";

import {styles} from './styles';


const LoadTransactionEther = ({className, ...props}) => {
  const {classes} = props;
  const [state, dispatch] = useReducer(loadTransactionsReducer, initLoadTransactionState);
  const {web3} = useContext(Web3Context);

  const onDelete = (index) => {
    dispatch({type: 'delete_transaction', payload: index});
  };
  
  const clearError = () => {
    dispatch({type: 'set_error', payload: undefined})
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
        let methodName = parser.transactions[key].transaction.data.name;
        rows.push({'contractAddress': contractAddress, 'methodName': methodName})
      }
      
      dispatch({type: 'set_rows', payload: rows})
      
    }catch (e) {
      let msg =  e.message ? e.message : e;
      dispatch({type: 'set_error', payload: msg.split('(')[0]})
    }
  };
  
  const onAttachFile = (e) => {
    let file = e.target.files[0];
    let fileReader = new FileReader();
    fileReader.onload = e => handleLoadFile(e);
    if(!file.name.endsWith('.json')){
      dispatch({type: 'set_error', payload: 'File type is not correct'})
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
        await web3.eth.sendSignedTransaction(state.originTransactions[key].transaction)
      }
    }catch (e) {
      let msg =  e.message ? e.message : e;
      dispatch({type: 'set_error', payload: msg.split('(')[0]})
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
    params.push({key: 'gasLimit', value: transaction.gasLimit});
    params.push({key: 'gasPrice', value: transaction.gasPrice});
    params.push({key: 'nonce', value: transaction.nonce});
    formatedData.details = params;
    
    dispatch({type: 'set_modal_data', payload: formatedData});
    dispatch({type: 'set_modal_open'});
  };
  
  return (
      <>
        <ContentCardWCS
            className={cx(
                classes.content,
                className
            )} key="broadcastTransaction">
          <Typography
              className={classes.header} style={{alignSelf: 'center'}}>
            Broadcast Transaction
          </Typography>
          <div className={classes.inputContainerPublicKeyInput}>
            <InputWCS
                key="loadFiles"
                className={classes.input}
                label={state.filename? '': 'Load Transactions File'}
                value={state.filename}
                disabled={true}
                InputProps={{endAdornment: (
                  <InputAdornment position="end">
                    <IconButton  htmlFor="input-file-download" component="label">
                      <UploadCloudIcon className={classes.uploadIcon}/>
                      <input
                          id="input-file-download"
                          type="file"
                          style={{display: 'none'}}
                          onChange={onAttachFile} />
                    </IconButton>
                  </InputAdornment>
              )}}/>
          </div>
          <TableWCS
              headers={['CONTRACT', 'METHOD']}
              isDelete={true}
              onDelete={onDelete}
              onClick={onOpenModal}
              rows={state.rows || []}/>
          <div className={classes.containerAddTransaction}>
          </div>
          <ButtonWCS
              className={classes.button}
              disabled={!state.table.length}
              onClick={onBroadcast}>
            Broadcast Transaction
          </ButtonWCS>
        </ContentCardWCS>
        {state.error ?
            <SnackbarWCS
                key="LoadTransaction"
                message={state.error}
                variant='error'
                isOpen={true}
                onExited={clearError}
                onClose={clearError}/> : ''}
                
        {state.modalIsOpen ?
            <ModalWrappedWCS
                isOpen={state.modalIsOpen}
                onClose={onCloseModal}
                data={{header: 'Transaction information', details: state.modalData}}/>: '' }
      </>
 
  )
};

LoadTransactionEther.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoadTransactionEther);
