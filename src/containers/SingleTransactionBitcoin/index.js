import React, { useReducer } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { FileTransactionGenerator, BitcoinTransaction, checkBitcoinAddress } from 'walletcs';
import ContentCardWCS from '../../components/ContentCardWCS';
import ButtonWCS from '../../components/ButtonWCS';
import { downloadFile } from '../SingleTransactionEtherC/actionsSingleTransaction';

import { bitcoinReducer, initStateBitcoin } from '../../reducers';
import GroupInputsBitcoin from '../GroupInputsBitcoin';
import { styles } from './styles';
import DropDownWCS from '../../components/DropDownWCS';
import SecondaryInputWCS from "../../components/SecondaryInputWCS";
import { isDecimal } from "../../utils";

const mapNetworks = { BTC_MAINNET: 'main', BTC_TESTNET: 'test3' };


const SingleTransactionBitcoin = ({ className, ...props }) => {
  const { classes } = props;
  const [stateBitcoin, dispatchBitcoin] = useReducer(bitcoinReducer, initStateBitcoin);

  const generateFile = async () => {
    const fileGenerator = new FileTransactionGenerator(stateBitcoin.change_address);
    const bttx = new BitcoinTransaction(stateBitcoin.from_addresses, mapNetworks[process.env.REACT_APP_BITCOIN_NETWORK] || 'test3');
    const transaction = await bttx.createTx(stateBitcoin.to_addresses, stateBitcoin.amounts, stateBitcoin.change_address, stateBitcoin.fee);
    fileGenerator.addTx(null, transaction, process.env.REACT_APP_BITCOIN_NETWORK);
    downloadFile('tr-', fileGenerator.generateJson());
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
                  items={stateBitcoin.from_addresses.map(val => val.value && checkBitcoinAddress(val.value) ? { name: val.value } : {})}
                  onChange={value => dispatchBitcoin({ type: 'set_change_address', payload: value })}
                  placeHolder='Choose change address.'/>
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
            <ButtonWCS
                className={classes.button}
                disabled={!stateBitcoin.change_address}
                onClick={generateFile}>
              Download Transaction
            </ButtonWCS>
          </div>
        </ContentCardWCS>
  );
};

SingleTransactionBitcoin.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SingleTransactionBitcoin);
