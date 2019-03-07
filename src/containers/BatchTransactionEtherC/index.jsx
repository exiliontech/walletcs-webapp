import React, {useContext, useState} from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles";

import {checkAddress} from "walletcs";
import {Typography} from "@material-ui/core";
import {Button} from "@material-ui/core";
import InputWCS from "../../components/InputWCS";
import DropDownWCS from "../../components/DropDownWCS";
import ButtonWCS from "../../components/ButtonWCS";
import SnackbarWCS from "../../components/SnackbarWCS";
import DetailsWCS from "../../components/DetailsWCS";
import ContentCardWCS from "../../components/ContentCardWCS";
import {useContractInfo, useMethodInfo} from '../SingleTransactionEtherC/actionsSingleTransaction'
import ParamsAreaWCS from "../../components/ParamsAreaWCS";
import Web3Context from '../../contexts/Web3Context'
import TableWCS from "../../components/TableWCS";
import ModalWrappedWCS from '../../components/ModalWCS';
import {downloadBatchTransaction} from "./actionsBatchTransactions"

import {styles} from './styles';

const BatchTransactionEtherC = ({className, ...props}) => {
  const {classes} = props;
  const [state, dispatch] = useContractInfo();
  const [isAddingTransaction, setIsAddingTransaction] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalData, setModalData] = useState([]);
  
  const {web3} = useContext(Web3Context);
  
  useMethodInfo(state, dispatch);
  
  const onInput = (val, name) => {
    let params = state.methodParams;
    for(let key in params){
      if(params[key].name === name){
        params[key].value = val;
      }
    }
    dispatch({type: 'set_params', payload: params});
  };
  
  const onDelete = (index) => {
    dispatch({type: 'delete_from_table', payload: index});
  };
  
  const onCloseModal = () => {
    setModalIsOpen(false)
  };
  
  const onOpenModal = (index) => {
    let data = state.table[index];
    let formatedData = {details: []};
    formatedData.contractAddress = data.contractAddress;
    for(let key in data.params){
      let obj = {};
      obj['key'] = data.params[key].name;
      obj['value'] = data.params[key].value;
      formatedData.details.push(obj)
    }
    setModalData(formatedData);
    setModalIsOpen(true)
  };
  
  return (
      <>
        {isAddingTransaction ?
          (<ContentCardWCS
              className={cx(
                  classes.content,
                  className
              )}>
            <Typography
                className={classes.header}>
              Smart Contract Transaction
            </Typography>
            <div className={classes.inputContainerContractInput}>
              <InputWCS
                  key='contractInput'
                  className={classes.input}
                  label="Contract *"
                  value={state.contractAddress}
                  error={state.contractAddress ? !checkAddress(state.contractAddress): false}
                  helperText={state.contractAddress && !checkAddress(state.contractAddress) ? 'Not correct address format': ''}
                  onChange={e =>
                      dispatch({type: 'set_contract_address', payload: e.target.value})
                  }/>
            </div>
            <DetailsWCS
                className={classes.details}
                header="Details"
                details={state.contractName ? [{'key': 'Name:', 'value': state.contractName}]: []}/>
            <DropDownWCS
                className={classes.dropDown}
                defaultInput="Choose contract method *"
                value={state.methodName}
                items={state.abi.filter((val) => val.type === 'function')}
                onChange={e => dispatch({type: 'set_method_name', payload: e.target.value})}/>
            {state.methodName && !state.methodCallResult ?
                <ParamsAreaWCS
                    onChange={onInput}
                    additionalInputs={state.methodParams.filter((val) =>{
                      return ['nonce', 'gasLimit', 'value', 'gasPrice'].includes(val.name)
                    })}
                    mainInputs={state.methodParams.filter((val) =>{
                      return !['nonce', 'gasLimit', 'value', 'gasPrice'].includes(val.name)
                    })} />: ''}
            {state.methodCallResult ?
                <DetailsWCS
                    className={classes.result}
                    details={[{'key': state.methodName, 'value': state.methodCallResult}]}/>: ''}
           <div className={classes.containerButtons}>
             <ButtonWCS
                 className={classes.button}
                 disabled={!(!!state.contractAddress && !!state.methodName && !!state.methodParams.length)}
                 onClick={e => {
                   dispatch(
                     {type: 'add_to_table',
                       payload: {
                       contractAddress: state.contractAddress,
                         methodName: state.methodName,
                         params: state.methodParams,
                         abi: state.abi}}
                         );
                   setIsAddingTransaction(false)}}>
               Save
             </ButtonWCS>
             <ButtonWCS
                 className={classes.button}
                 disabled={!isAddingTransaction}
                 onClick={e => setIsAddingTransaction(false)}>
               Cancel
             </ButtonWCS>
           </div>
          </ContentCardWCS>) : (
              <ContentCardWCS
                  className={cx(
                      classes.content,
                      className
                  )}>
                <Typography
                    className={classes.header} style={{alignSelf: 'center'}}>
                  New Transaction Batch
                </Typography>
                <div className={classes.inputContainerPublicKeyInput}>
                  <InputWCS
                      key="publicKeyInput"
                      className={classes.input}
                      isQuestion={true}
                      label='Public key of a signatory *'
                      value={state.publicKey}
                      error={state.publicKey ? !checkAddress(state.publicKey): false}
                      helperText={state.publicKey && !checkAddress(state.publicKey) ? 'Not correct address format': ''}
                      onChange={e => {
                        dispatch({type: 'set_public_key', payload: e.target.value})}
                      }/>
                </div>
                <TableWCS
                    headers={['CONTRACT', 'METHOD']}
                    rows={state.table}
                    isDelete={true}
                    onDelete={onDelete}
                    onClick={onOpenModal}/>
                    <div className={classes.containerAddTransaction}>
                      <Button
                          color="secondary"
                          onClick={e => setIsAddingTransaction(true)}>
                        Add Transaction
                      </Button>
                    </div>
                  <ButtonWCS
                      className={classes.button}
                      disabled={!(!!state.publicKey && !!state.contractAddress && !!state.methodName && !!state.methodParams.length)}
                      onClick={e => downloadBatchTransaction(state, web3)}>
                    Download Transaction
                  </ButtonWCS>
              </ContentCardWCS>
        )}
        {modalIsOpen ? <ModalWrappedWCS
            isOpen={modalIsOpen}
            onClose={onCloseModal}
            data={{header: 'Transaction information', details: modalData}}/>: '' }
        {state.error ?
            <SnackbarWCS
              message={state.error}
              variant='error'
              isOpen={true}
              onClose={e => dispatch({type: 'set_global_error', payload: undefined})}/> : ''}
          </>
  )
};

BatchTransactionEtherC.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BatchTransactionEtherC);
