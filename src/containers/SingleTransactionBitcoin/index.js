import React, { useReducer } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { FileTransactionGenerator, BitcoinTransaction, checkBitcoinAddress,
  ConverterBitcoinCSVToTxObject } from 'walletcs';
import ContentCardWCS from '../../components/ContentCardWCS';
import ButtonWCS from '../../components/ButtonWCS';
import { downloadFile } from '../SingleTransactionEtherC/actionsSingleTransaction';

import { bitcoinReducer, initStateBitcoin } from '../../reducers';
import GroupInputsBitcoin from '../GroupInputsBitcoin';
import { styles } from './styles';
import DropDownWCS from '../../components/DropDownWCS';
import SecondaryInputWCS from '../../components/SecondaryInputWCS';
import { isDecimal } from '../../utils';
import ButtonInputFile from '../../components/ButtonInputFileWCS';
import QuestionMarkButton from '../../components/QuestionToolTipWCS/QuestionButton';

const mapNetworks = { BTC_MAINNET: 'main', BTC_TESTNET: 'test3' };


const SingleTransactionBitcoin = ({ className, ...props }) => {
  const { classes } = props;
  const [stateBitcoin, dispatchBitcoin] = useReducer(bitcoinReducer, initStateBitcoin);

  const generateFile = async () => {
    const fileGenerator = new FileTransactionGenerator(stateBitcoin.change_address);
    const bttx = new BitcoinTransaction(stateBitcoin.from_addresses.map(val => val.value), mapNetworks[process.env.REACT_APP_BITCOIN_NETWORK] || 'test3');
    const transaction = await bttx.createTx(stateBitcoin.to_addresses.map(val => val.value), stateBitcoin.amounts.map(val => val.value), stateBitcoin.change_address, stateBitcoin.fee);
    fileGenerator.addTx(null, transaction, process.env.REACT_APP_BITCOIN_NETWORK);
    downloadFile('tr-', fileGenerator.generateJson());
  };

  const handleLoadFile = (e) => {
    const file = e.target.result;
    const converter = new ConverterBitcoinCSVToTxObject(file);
    converter.convert().then((rows) => {
      dispatchBitcoin({ type: 'replace_from_csv', payload: rows });
    });
  };

  const onUploadCSVFile = (e) => {
    const fileReader = new FileReader();
    fileReader.onload = ev => handleLoadFile(ev);
    fileReader.readAsText(e.target.files[0]);
  };

  return (
        <ContentCardWCS className={cx(
          classes.content,
          className,
        )}>
          <div className={classes.inputContainer}>
            <GroupInputsBitcoin
                classes={classes}
                state={stateBitcoin}
                dispatch={dispatchBitcoin}/>
            <div className={classes.additionalArea}>
              <div className={classes.containerAdditionArea}>
                <DropDownWCS
                  classes={classes}
                  items={stateBitcoin.from_addresses.map(val => (val.value && checkBitcoinAddress(val.value) ? { name: val.value } : {}))}
                  onChange={value => dispatchBitcoin({ type: 'set_change_address', payload: value })}
                  placeHolder='Choose change address.'
                  selectedOption={stateBitcoin.change_address}/>
              </div>
                <SecondaryInputWCS
                  className={classes.AdditionalInput}
                  label='Mainer fee'
                  error={ stateBitcoin.fee ? !isDecimal(stateBitcoin.fee) : false }
                  onChange={e => dispatchBitcoin({ type: 'set_fee', payload: e.target.value })}
                  value={stateBitcoin.fee}
                  isQuestion={true}
                  textTip={'Mainer fee'}
                />
            </div>
            <div className={classes.containerButtons}>
              <ButtonWCS className={classes.button}
                         disabled={!stateBitcoin.change_address}
                         onClick={generateFile}>
                Download Transaction
              </ButtonWCS>
              <div className={classes.uploadFileContainer}>
                <ButtonInputFile onAttachFile={onUploadCSVFile}
                               classes={classes}
                               accept='.csv'>
                Upload csv file
              </ButtonInputFile>
               <QuestionMarkButton
                onClick={() => window.open('https://github.com/walletcs/walletcs-app#batch-operations', '_blank')}
                classes={classes.iconButton}
                text={'File format information.'}/>
              </div>
            </div>
          </div>
        </ContentCardWCS>
  );
};

SingleTransactionBitcoin.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SingleTransactionBitcoin);
