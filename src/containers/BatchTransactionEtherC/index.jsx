import React, {useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles";

import {checkAddress} from "walletcs";
import SnackbarWCS from "../../components/SnackbarWCS";
import {useContractInfo, useMethodInfo} from '../SingleTransactionEtherC/actionsSingleTransaction'
import GlobalReducerContext from "../../contexts/GlobalReducerContext";

import AddTransactionEther from "../AddTransactionEther";
import TableBatchEther from "../TableBatchEther";
import AddTransferEther from "../AddTransferEther";

import {styles} from './styles';

const BatchTransactionEtherC = ({className, ...props}) => {
  const {classes} = props;
  const [state, dispatch] = useContractInfo();
  const [stateMethod, dispatchMethod] = useMethodInfo(state, dispatch);
  const {stateGlobal, dispatchGlobal} = useContext(GlobalReducerContext);
  
  const [isAddingTransaction, setIsAddingTransaction] = useState(false);
  const [isAddTransfer, setIsAddTransfer] = useState(false);
  
  const onCancel = () => {
    setIsAddingTransaction(false);
    setIsAddTransfer(false);
  };
  
  return (
      <React.Fragment>
        {isAddTransfer ?
                <AddTransferEther
                    stateContract={state}
                    dispatchContract={dispatch}
                    classes={classes}
                    stateMethod={stateMethod}
                    dispatchMethod={dispatchMethod}
                    onCancel={onCancel}/> : '' }
        {isAddingTransaction ?
                <AddTransactionEther
                  stateContract={state}
                  dispatchContract={dispatch}
                  classes={classes}
                  stateMethod={stateMethod}
                  dispatchMethod={dispatchMethod}
                  onCancel={onCancel}/> : ''}
        {!isAddingTransaction && !isAddTransfer ?
            <TableBatchEther
                stateContract={state}
                dispatchContract={dispatch}
                classes={classes}
                stateMethod={stateMethod}
                dispatchMethod={dispatchMethod}
                onAddTransation={e => setIsAddingTransaction(true)}
                onAddTransfer={e => setIsAddTransfer(true)}
            /> : ''}
        {stateGlobal.error ?
            <SnackbarWCS
              message={state.error}
              variant='error'
              isOpen={true}
              onClose={e => dispatchGlobal({type: 'set_global_error', payload: undefined})}/> : ''}
          </React.Fragment>
  )
};

BatchTransactionEtherC.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BatchTransactionEtherC);
