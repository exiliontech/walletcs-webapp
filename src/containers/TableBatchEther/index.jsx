import React, {useEffect, useState} from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles";
import {checkAddress} from "walletcs"

import InputWCS from "../../components/InputWCS";
import {Button} from "@material-ui/core";
import {downloadBatchTransaction} from "../BatchTransactionEtherC/actionsBatchTransactions";
import ContentCardWCS from "../../components/ContentCardWCS";
import TableWCS from "../../components/TableWCS";
import ButtonWCS from "../../components/ButtonWCS";
import ModalWrappedWCS from "../../components/ModalWCS"

const DEFAULT_SETTING = {
  root: 'root'
};

const styles = theme => ({
  default: {
  
  }
});

const TableBatchEther = ({className, ...props}) => {
  const {stateContract, dispatchContract, stateMethod, dispatchMethod, classes} = props;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalData, setModalData] = useState([]);
  
  const onCloseModal = () => {
    setModalIsOpen(false)
  };
  
  const onOpenModal = (index) => {
    
    let data = stateContract.table[index];
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
  
  const onDelete = (index) => {
    dispatchContract({type: 'delete_from_table', payload: index});
  };
  
  return (
      <ContentCardWCS
          className={cx(
              classes.content,
              className
          )}>
        <div className={classes.inputContainer}>
          
          <InputWCS
              key="publicKeyInput-Batch"
              className={classes.input}
              isQuestion={true}
              label='Public key of a signatory'
              value={stateMethod.publicKey}
              error={stateMethod.publicKey ? !checkAddress(stateMethod.publicKey): false}
              helperText={stateMethod.publicKey && !checkAddress(stateMethod.publicKey) ? 'Not correct address format': ''}
              onChange={e => {
                dispatchMethod({type: 'set_public_key', payload: e.target.value})}
              }/>
              
          <TableWCS
              headers={['CONTRACT', 'METHOD']}
              rows={stateContract.table}
              isDelete={true}
              onDelete={onDelete}
              onClick={onOpenModal}/>
              
          <div className={classes.containerAddTransaction}>
            <Button
                color="secondary"
                onClick={props.onAddTransation}>
              Add Transaction
            </Button>
            <Button
                color="secondary"
                onClick={props.onAddTransfer}>
              Add Transfer
            </Button>
          </div>
          
          <ButtonWCS
              className={classes.button}
              disabled={!(!!stateMethod.publicKey && !!stateContract.table.length)}
              onClick={e => downloadBatchTransaction(stateContract, stateMethod)}>
            Download Transactions
          </ButtonWCS>
        </div>
        {modalIsOpen ? <ModalWrappedWCS
            isOpen={modalIsOpen}
            onClose={onCloseModal}
            data={{header: 'Transaction information', details: modalData}}/>: '' }
      </ContentCardWCS>
  )
};

TableBatchEther.propTypes = {
  classes: PropTypes.object.isRequired,
  stateContract: PropTypes.object.isRequired,
  dispatchContract: PropTypes.object.isRequired,
  stateMethod: PropTypes.object.isRequired,
  dispatchMethod: PropTypes.object.isRequired,
};

export default withStyles(styles)(TableBatchEther);
