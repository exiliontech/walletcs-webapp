import React, { useReducer, useEffect, useContext, useMemo } from 'react';
import cx from 'classnames';
import cloneDeep from 'clone-deep';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import * as _ from 'lodash';
import { useDebouncedCallback } from 'use-debounce';
import * as structures from '@exiliontech/walletcs/lib/base/structures';
import { BitcoinTxBuilder, TransactionConstructor } from '@exiliontech/walletcs/lib/transactions';
import {
  checkBitcoinAddress,
  isDecimal, getBitcoinOutxs, combineFromObjec, combineToObject,
} from '../../utils';
import ContentCardWCS from '../../components/ContentCardWCS';
import ButtonWCS from '../../components/ButtonWCS';
import { downloadFile } from '../SingleTransactionEtherC/actionsSingleTransaction';
import { bitcoinReducer, initStateBitcoin } from '../../reducers';
import GroupInputsBitcoin from '../GroupInputsBitcoin';
import { styles } from './styles';
import DropDownWCS from '../../components/DropDownWCS';
import SecondaryInputWCS from '../../components/SecondaryInputWCS';


import Web3Context from '../../contexts/Web3Context';


const SingleTransactionBitcoin = ({ className, ...props }) => {
  const { classes } = props;
  const [stateBitcoin, dispatchBitcoin] = useReducer(bitcoinReducer, initStateBitcoin);
  const { bitcoinProvider } = useContext(Web3Context);
  const changeAddress = stateBitcoin.from_addresses[0].value;
  const amounts = stateBitcoin.amounts.map(a => a.value);
  const { from_addresses, to_addresses } = stateBitcoin;
  
  const isTempValid = from_addresses.every(a => checkBitcoinAddress(a.value || '')) && to_addresses.every(a => checkBitcoinAddress(a.value || ''));

  const _convertStateToTxFormat = async () => {
    const outxs = await getBitcoinOutxs(_.map(stateBitcoin.from_addresses, val => val.value), bitcoinProvider);
    const from = combineFromObjec(_.map(stateBitcoin.from_addresses, val => val.value), stateBitcoin.change_address);
    const to = combineToObject(_.map(stateBitcoin.to_addresses, val => val.value), _.map(stateBitcoin.amounts, val => parseFloat(val.value)));
    return [outxs, from, to];
  };

  const generateFile = async () => {
    const bitcoinFile = cloneDeep(structures.BitcoinFileTransaction);
    const [outxs, from, to] = await _convertStateToTxFormat();
    bitcoinFile.from.push(...from);
    bitcoinFile.to.push(...to);
    bitcoinFile.outx.push(...outxs);
    bitcoinFile.fee = stateBitcoin.fee || 0;
    downloadFile('tr-', JSON.stringify(bitcoinFile));
  };

  const generateTx = async () => {
    const builder = new BitcoinTxBuilder();
    const director = new TransactionConstructor(builder);
    const [outxs, from, to] = await _convertStateToTxFormat();
    const tx = director.buildBitcoinTx(outxs, from, to);
    return tx;
  };

  const calculateFee = async () => {
    const amounts = stateBitcoin.amounts.filter(i => !!i.value);
    const fromAddresses = stateBitcoin.from_addresses.filter(i => !!i.value);
    const toAddresses = stateBitcoin.to_addresses.filter(i => !!i.value);

    if (fromAddresses.length && toAddresses.length
        && amounts.length && stateBitcoin.change_address) {
      try {
        const tx = await generateTx();
        console.log('TX:', tx);
        dispatchBitcoin({
          type: 'set_fee',
          payload: (tx.fee / (10 ** 8)).toString(),
        });
      } catch (e) {
        console.error('ERROR: ', e);
      }
    }
  };

  const [debouncedFunction, cancel] = useDebouncedCallback(
    () => {
      calculateFee();
    },
    1000,
    { maxWait: 4000 }
  );

  useEffect(() => debouncedFunction(), amounts);

  useEffect(() => {
    dispatchBitcoin({ type: 'set_change_address', payload: changeAddress })
  }, [changeAddress]);

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
                  selectLabel='Change'
                  classes={classes}
                  items={ _.unionBy(stateBitcoin.from_addresses.map(val => (val.value && checkBitcoinAddress(val.value) ? { name: val.value } : {})), e => e.value)}
                  onChange={value => dispatchBitcoin({ type: 'set_change_address', payload: value })}
                  placeHolder='Choose change address.'
                  selectedOption={changeAddress}
                  // TODO: Bug in the react-select input
                  // onInputChange={ value => dispatchBitcoin({ type: 'set_change_address', payload: value })}
                />
              </div>
              <SecondaryInputWCS
                className={classes.AdditionalInput}
                label='Miner fee'
                error={ stateBitcoin.fee ? !isDecimal(stateBitcoin.fee) : false }
                onChange={e => dispatchBitcoin({ type: 'set_fee', payload: e.target.value })}
                value={stateBitcoin.fee}
                isQuestion={true}
                textTip={'Miner fee'}
              />
            </div>
            <div className={classes.containerButtons}>
              <ButtonWCS className={classes.button}
                         disabled={!isTempValid}
                         onClick={generateFile}>
                Download Transaction
              </ButtonWCS>
            </div>
          </div>
        </ContentCardWCS>
  );
};

SingleTransactionBitcoin.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SingleTransactionBitcoin);
