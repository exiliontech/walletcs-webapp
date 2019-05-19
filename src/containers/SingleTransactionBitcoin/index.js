import React, { useReducer } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { FileTransactionGenerator, BitcoinTransaction } from 'walletcs';
import ContentCardWCS from '../../components/ContentCardWCS';
import ButtonWCS from '../../components/ButtonWCS';
import { downloadFile } from '../SingleTransactionEtherC/actionsSingleTransaction';

import { bitcoinReducer, initStateBitcoin } from '../../reducers';
import GroupInputsBitcoin from '../GroupInputsBitcoin';
import RedirectMainNet from '../../components/RedirectMainNet';
import { styles } from './styles';

const mapNetworks = { BTC_MAINNET: 'main', BTC_TESTNET: 'test3' };

const SingleTransactionBitcoin = ({ className, ...props }) => {
  const { classes } = props;
  const [stateBitcoin, dispatchBitcoin] = useReducer(bitcoinReducer, initStateBitcoin);

  const generateFile = async () => {
    const fileGenerator = new FileTransactionGenerator(stateBitcoin.from_address);
    const bttx = new BitcoinTransaction(stateBitcoin.from_address, mapNetworks[process.env.REACT_APP_BITCOIN_NETWORK] || 'test3');
    const transaction = await bttx.createTx(stateBitcoin.amount, stateBitcoin.to_address);

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
            <ButtonWCS
                className={classes.button}
                disabled={!(!!stateBitcoin.from_address
                    && !!stateBitcoin.to_address
                    && stateBitcoin.amount)}
                onClick={generateFile}>
              Download Transaction
            </ButtonWCS>
            <RedirectMainNet />
          </div>
        </ContentCardWCS>
  );
};

SingleTransactionBitcoin.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SingleTransactionBitcoin);
