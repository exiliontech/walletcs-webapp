/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import React, { useState } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { FileTransactionGenerator, BitcoinTransaction } from 'walletcs';
import { downloadFile } from '../SingleTransactionEtherC/actionsSingleTransaction';
import ContentCardWCS from '../../components/ContentCardWCS';
import TableWCS from '../../components/TableWCS';
import ButtonWCS from '../../components/ButtonWCS';
import ModalWrappedWCS from '../../components/ModalWCS';

const styles = theme => ({});

const TableBatchBitcoin = ({ className, ...props }) => {
  const { classes, stateParent, dispatchParent } = props;

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalData, setModalData] = useState([]);

  const onCloseModal = () => {
    setModalIsOpen(false);
  };

  const downloadBatchTransaction = async () => {
    const network = process.env.REACT_APP_BITCOIN_NETWORK === 'BTC_TESTNET' ? 'test3' : 'main';
    const fromAddress = stateParent.table[0].params.find(item => item.name === 'from_address').value;
    const fileGenerator = new FileTransactionGenerator(fromAddress);
    const bttx = new BitcoinTransaction([fromAddress], network);
    const addresses = [];
    const amounts = [];
    for (const key in stateParent.table) {
      addresses.push(stateParent.table[key].params.find(item => item.name === 'to_address').value);
      amounts.push(stateParent.table[key].params.find(item => item.name === 'amount').value);
    }
    const transaction = await bttx.createTx(amounts, addresses, null, null, true);
    fileGenerator.addTx(null, transaction);
    downloadFile('tr-', fileGenerator.generateJson());
  };

  const onOpenModal = (index) => {
    const data = stateParent.table[index];
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
    dispatchParent({ type: 'delete_from_table', payload: index });
  };

  return (
      <ContentCardWCS
          className={cx(
            classes.content,
            className,
          )}>
        <div className={classes.inputContainer}>
          <TableWCS
              headers={['ADDRESS', 'METHOD']}
              rows={stateParent.table}
              isDelete={true}
              onDelete={onDelete}
              onClick={onOpenModal}/>

          <div className={classes.containerAddTransaction}>
            <Button
                color="secondary"
                onClick={props.onAddTransation}>
              Add Transaction
            </Button>
          </div>
          <ButtonWCS
              className={classes.button}
              disabled={!(!!stateParent.from_address && !!stateParent.table.length)}
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

TableBatchBitcoin.propTypes = {
  classes: PropTypes.object.isRequired,
  stateParent: PropTypes.object.isRequired,
  dispatchParent: PropTypes.object.isRequired,
};

export default withStyles(styles)(TableBatchBitcoin);
