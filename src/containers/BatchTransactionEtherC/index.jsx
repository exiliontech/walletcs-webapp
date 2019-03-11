import React, {useContext, useState} from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles";

import {checkAddress} from "walletcs";
import {Typography} from "@material-ui/core";
import {Button} from "@material-ui/core";
import InputWCS from "../../components/InputWCS";
import ButtonWCS from "../../components/ButtonWCS";
import SnackbarWCS from "../../components/SnackbarWCS";
import ContentCardWCS from "../../components/ContentCardWCS";
import {useContractInfo, useMethodInfo} from '../SingleTransactionEtherC/actionsSingleTransaction'
import Web3Context from '../../contexts/Web3Context'
import GlobalReducerContext from "../../contexts/GlobalReducerContext";
import TableWCS from "../../components/TableWCS";
import ModalWrappedWCS from '../../components/ModalWCS';
import {downloadBatchTransaction} from "./actionsBatchTransactions"

import {styles} from './styles';
import DetailInformation from "../SingleTransactionEtherC/DetailInformation";

const BatchTransactionEtherC = ({className, ...props}) => {
  const {classes} = props;
  const [state, dispatch] = useContractInfo();
  const [stateMethod, dispatchMethod] = useMethodInfo(state, dispatch);
  const {stateGlobal, dispatchGlobal} = useContext(GlobalReducerContext);
  const [isAddingTransaction, setIsAddingTransaction] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalData, setModalData] = useState([]);
  
  const {web3} = useContext(Web3Context);
  
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
              <DetailInformation
                  stateMethod={stateMethod}
                  state={state}
                  dispatchMethod={dispatchMethod}/>
              <div className={classes.containerButtons}>
                <ButtonWCS
                    className={classes.button}
                    disabled={!(!!state.contractAddress && !!stateMethod.methodName && !!stateMethod.methodParams.length)}
                    onClick={e => {
                     dispatch(
                       {type: 'add_to_table',
                         payload: {
                         contractAddress: state.contractAddress,
                           methodName: stateMethod.methodName,
                           params: stateMethod.methodParams,
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
                      disabled={!(!!state.publicKey &&
                          !!state.contractAddress &&
                          !!stateMethod.methodName &&
                          !!stateMethod.methodParams.length)}
                      onClick={e => downloadBatchTransaction(state, web3)}>
                    Download Transaction
                  </ButtonWCS>
              </ContentCardWCS>
        )}
        {modalIsOpen ? <ModalWrappedWCS
            isOpen={modalIsOpen}
            onClose={onCloseModal}
            data={{header: 'Transaction information', details: modalData}}/>: '' }
        {stateGlobal.error ?
            <SnackbarWCS
              message={state.error}
              variant='error'
              isOpen={true}
              onClose={e => dispatchGlobal({type: 'set_global_error', payload: undefined})}/> : ''}
          </>
  )
};

BatchTransactionEtherC.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BatchTransactionEtherC);
