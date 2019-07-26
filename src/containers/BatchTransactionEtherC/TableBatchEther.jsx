/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import React, { useContext, useState } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  checkAddress, FileTransactionGenerator, EtherTransaction,
  FileTransactionReader, ConverterCSVToTxObject,
} from 'walletcs';

import { Button } from '@material-ui/core';
import InputWCS from '../../components/InputWCS';
import { downloadFile } from '../SingleTransactionEtherC/actionsSingleTransaction';
import ContentCardWCS from '../../components/ContentCardWCS';
import TableWCS from '../../components/TableWCS';
import ButtonWCS from '../../components/ButtonWCS';
import ModalWrappedWCS from '../../components/ModalWCS';
import ButtonInputFile from '../../components/ButtonInputFileWCS';

const styles = theme => ({
});

const TableBatchEther = ({ className, ...props }) => {
  const {
    stateContract, dispatchContract, stateMethod, dispatchMethod, classes,
  } = props;
  const { onAddTransaction, onAddTransfer } = props;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalData, setModalData] = useState([]);

  const onCloseModal = () => {
    setModalIsOpen(false);
  };

  const downloadBatchTransaction = () => {
    const { table } = stateContract;
    const { publicKey } = stateMethod;

    const fileGenerator = new FileTransactionGenerator(publicKey);

    for (const key in table) {
      const {
        contractAddress, params, abi, methodName,
      } = table[key];
      const transaction = EtherTransaction.createTx(publicKey, contractAddress, params, abi, methodName);
      if (EtherTransaction.checkCorrectTx(transaction)) {
        fileGenerator.addTx(contractAddress, transaction, process.env.REACT_APP_ETH_NETWORK);
        fileGenerator.addContract(contractAddress, abi);
      }
    }
    downloadFile('tr-', fileGenerator.generateJson());
  };

  const handleLoadFile = (e) => {
    const file = e.target.result;
    const converter = new ConverterCSVToTxObject(
      file,
      stateMethod.publicKey,
      process.env.REACT_APP_ETH_NETWORK_SEND,
    );
    converter.convert().then((rows) => {
      rows.map((params) => {
        console.log(params);
        const newParams = [];
        for (const n in params){
          newParams.push({ name: n, value: params[n] });
        }
        dispatchContract({ type: 'add_to_table', payload: {'params': newParams }});
      });
    });
  };

  const onUploadCSVFile = (e) => {
    const fileReader = new FileReader();
    fileReader.onload = ev => handleLoadFile(ev);
    fileReader.readAsText(e.target.files[0]);
  };

  const onOpenModal = (index) => {
    const data = stateContract.table[index];
    const formatedData = { details: [] };
    formatedData.contractAddress = data.contractAddress;

    for (const key in data.params) {
      const obj = {};
      obj.key = data.params[key].name;
      obj.value = data.params[key].value;
      formatedData.details.push(obj);
    }

    setModalData(formatedData);
    setModalIsOpen(true);
  };

  const onDelete = (index) => {
    dispatchContract({ type: 'delete_from_table', payload: index });
  };

  return (
      <ContentCardWCS
          className={cx(
            classes.content,
            className,
          )}>
        <div className={classes.inputContainer}>

          <InputWCS
              key="publicKeyInput-Batch"
              className={classes.input}
              label='Public key of a signatory'
              value={stateMethod.publicKey}
              error={stateMethod.publicKey ? !checkAddress(stateMethod.publicKey) : false}
              helperText={stateMethod.publicKey && !checkAddress(stateMethod.publicKey) ? 'Not correct address format' : ''}
              onChange={(e) => {
                dispatchMethod({ type: 'set_public_key', payload: e.target.value });
              }}
              isQuestion
              isRedirect
              textQuestionTip='Аccount associated with the private key that will be used to sign this transaction' />

          <TableWCS
              headers={['ADDRESS', 'METHOD']}
              rows={stateContract.table}
              isDelete={true}
              onDelete={onDelete}
              onClick={onOpenModal}/>

          <div className={classes.containerAddTransaction}>
            <Button
                color="secondary"
                onClick={onAddTransaction}
                disabled={!stateMethod.publicKey}>
              Add Transaction
            </Button>
            <Button
                color="secondary"
                onClick={onAddTransfer}
                disabled={!stateMethod.publicKey}>
              Add Transfer
            </Button>
            <ButtonInputFile onAttachFile={onUploadCSVFile}
                             classes={classes}
                             accept='.csv'
                             disabled={!stateMethod.publicKey}>
              Upload csv file
            </ButtonInputFile>
          </div>
          <ButtonWCS
              className={classes.button}
              disabled={!(!!stateMethod.publicKey && !!stateContract.table.length)}
              onClick={downloadBatchTransaction}>
            Download Transactions
          </ButtonWCS>
        </div>
        {modalIsOpen ? <ModalWrappedWCS
            isOpen={modalIsOpen}
            onClose={onCloseModal}
            data={{ header: 'Transaction information', details: modalData }}/> : '' }
      </ContentCardWCS>
  );
};

TableBatchEther.propTypes = {
  classes: PropTypes.object.isRequired,
  stateContract: PropTypes.object.isRequired,
  dispatchContract: PropTypes.object.isRequired,
  stateMethod: PropTypes.object.isRequired,
  dispatchMethod: PropTypes.object.isRequired,
};

export default withStyles(styles)(TableBatchEther);
