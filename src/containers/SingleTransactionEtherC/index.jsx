import React, { useContext } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { checkAddress } from 'walletcs';
import ContentCardWCS from '../../components/ContentCardWCS';
import InputWCS from '../../components/InputWCS';
import ButtonWCS from '../../components/ButtonWCS';
import SnackbarWCS from '../../components/SnackbarWCS';
import {
  useContractInfo, useMethodInfo, downloadOneTransaction, recalculateGasLimit,
} from './actionsSingleTransaction';
import Web3Context from '../../contexts/Web3Context';
import GlobalReducerContext from '../../contexts/GlobalReducerContext';

import { styles } from './styles';
import DetailInformation from './DetailInformation';
import DetailsWCS from '../../components/DetailsWCS';

const SingleTransactionEtherC = ({ className, ...props }) => {
  const { classes } = props;

  const [state, dispatch] = useContractInfo();
  const { provider } = useContext(Web3Context);
  const [stateMethod, dispatchMethod] = useMethodInfo(state);
  const { stateGlobal, dispatchGlobal } = useContext(GlobalReducerContext);

  const onCallMethod = async () => {
    dispatchGlobal({ type: 'set_is_loading_method' });
    try {
      const params = stateMethod.methodParams.map(val => val.value);
      let result;
      if (params.length) {
        result = await state.contract[stateMethod.methodName](...params);
      } else {
        result = await state.contract[stateMethod.methodName]();
      }
      dispatchMethod({ type: 'set_method_call_result', payload: result.toString() });
    } catch (e) {
      dispatchGlobal({ type: 'set_global_error', payload: e.message });
    }
    dispatchGlobal({ type: 'set_is_loading_method' });
  };

  return (
      <React.Fragment>
        <ContentCardWCS className={cx(
          classes.content,
          className,
        )}>
          <div className={classes.inputContainer}>
            <InputWCS
                className={classes.input}
                label="Contract"
                value={state.contractAddress}
                error={state.contractAddress ? !checkAddress(state.contractAddress) : false}
                helperText={state.contractAddress && !checkAddress(state.contractAddress) ? 'Not correct address format' : ''}
                onChange={e => dispatch({ type: 'set_contract_address', payload: e.target.value })
                }
                isRedirect
                isQuestion
                textQuestionTip='Address associated with the contract on a blockchain'/>
            <InputWCS
                className={classes.input}
                isQuestion
                label='Public key of a signatory'
                value={stateMethod.publicKey}
                error={stateMethod.publicKey ? !checkAddress(stateMethod.publicKey) : false}
                helperText={stateMethod.publicKey && !checkAddress(stateMethod.publicKey) ? 'Not correct address format' : ''}
                onChange={(e) => {
                  dispatchMethod({ type: 'set_public_key', payload: e.target.value });
                }}
                isRedirect
                textQuestionTip={'Account associated with the private key that will be used to sign this transaction'}/>

            {state.contractAddress
              ? <DetailInformation
                  dispatchMethod={dispatchMethod}
                  stateContract={state}
                  stateMethod={stateMethod}
                  recalculateButton={e => recalculateGasLimit(state, stateMethod, dispatchMethod, dispatchGlobal, provider)}/> : ''}
            {stateMethod.methodType === 'transaction' && !!stateMethod.methodParams.length
              ? <ButtonWCS
                  className={classes.button}
                  disabled={!(!!stateMethod.publicKey
                      && !!state.contractAddress
                      && stateMethod.methodType === 'transaction')}
                  onClick={e => downloadOneTransaction(state, stateMethod)}>
                  Download Transaction
                </ButtonWCS> : ''}

            {stateMethod.methodType === 'call'
              ? <ButtonWCS
                  className={classes.button}
                  disabled={!(!!state.contractAddress
                      && stateMethod.methodType === 'call')}
                  onClick={onCallMethod}>
                  Call Method
                </ButtonWCS> : ''}
          </div>

          <div className={classes.informationContainer}>
            {/* Result contract address */}
            {!!state.contractAddress && !!state.contractName
              ? <DetailsWCS
                  className={classes.result}
                  isLoading={stateGlobal.isLoadingMethod}
                  details={[{ key: 'Contract name' || '', value: state.contractName || '' }]}/> : ''}
            {/* Result call method */}
            {!!stateMethod.methodName && !!stateMethod.methodCallResult
              ? <DetailsWCS
                    className={classes.result}
                    isLoading={stateGlobal.isLoadingMethod}
                    details={[{ key: stateMethod.methodName, value: stateMethod.methodCallResult || '' }]}/> : ''}
          </div>
          {/* Error snackbar */}
          {stateGlobal.error
            ? <SnackbarWCS
                  message={stateGlobal.error}
                  variant='error'
                  isOpen={true}
                  onClose={e => dispatchGlobal({ type: 'set_global_error', payload: undefined })}/> : ''}
        </ContentCardWCS>
      </React.Fragment>
  );
};

SingleTransactionEtherC.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SingleTransactionEtherC);
