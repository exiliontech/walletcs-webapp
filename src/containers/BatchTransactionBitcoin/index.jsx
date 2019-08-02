import React, { useContext, useReducer, useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import SnackbarWCS from '../../components/SnackbarWCS';
import GlobalReducerContext from '../../contexts/GlobalReducerContext';
import TableBatchBitcon from './TableBatchBitcoin';
import AddBitcoinTransaction from './AddBitcoinTransaction';
import { bitcoinReducer, initStateBitcoin } from '../../reducers';

import { styles } from './styles';

const BatchTransactionBitcoin = ({ className, ...props }) => {
  const { classes } = props;
  const { stateGlobal, dispatchGlobal } = useContext(GlobalReducerContext);
  const [stateBitcoin, dispatchBitcoin] = useReducer(bitcoinReducer, initStateBitcoin);

  const [isAddingTransaction, setIsAddingTransaction] = useState(false);

  return (
      <React.Fragment>
        {isAddingTransaction
          ? <AddBitcoinTransaction
                stateParent={stateBitcoin}
                dispatchParent={dispatchBitcoin}
                classes={classes}
                onCancel={() => setIsAddingTransaction(false)}/>
          : <TableBatchBitcon
                stateParent={stateBitcoin}
                dispatchParent={dispatchBitcoin}
                classes={classes}
                onAddTransation={() => setIsAddingTransaction(true)}/>}
        {stateGlobal.error
          ? <SnackbarWCS
                message={stateGlobal.error}
                variant='error'
                isOpen={true}
                onClose={() => dispatchGlobal({ type: 'set_global_error', payload: null })}/> : ''}
      </React.Fragment>
  );
};

BatchTransactionBitcoin.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BatchTransactionBitcoin);
