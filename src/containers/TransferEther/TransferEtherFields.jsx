import React, { useContext, useEffect, useReducer } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';
import { checkAddress } from 'walletcs';
import ContentCardWCS from '../../components/ContentCardWCS';
import GlobalReducerContext from '../../contexts/GlobalReducerContext';
import ParamsAreaWCS from '../../components/ParamsAreaWCS';
import { usePrepareTransfer } from './actionsAddTransferEther';
import { initStateMethodReducer, methodReducer } from '../../reducers';
import { validationInput } from '../SingleTransactionEtherC/actionsSingleTransaction';
import Web3Context from '../../contexts/Web3Context';

import { styles } from './styles';

const EtherTransferFields = ({ className, ...props }) => {
  const { classes } = props;
  const { stateGlobal, dispatchGlobal } = useContext(GlobalReducerContext);
  const [stateMethod, dispatchMethod] = useReducer(methodReducer, initStateMethodReducer);
  const { provider } = useContext(Web3Context);

  usePrepareTransfer(dispatchMethod);

  const onInput = (val, name) => {
    const newVal = val.replace(/ /g, '');
    const params = validationInput(stateMethod.methodParams, newVal, name);
    dispatchMethod({ type: 'set_params', payload: params });

    if (name === 'from' && checkAddress(newVal)) {
      dispatchMethod({ type: 'set_public_key', payload: newVal });
    }
  };

  const getNonce = () => {
    if (checkAddress(stateMethod.publicKey)) {
      provider.getTransactionCount(stateMethod.publicKey).then((count) => {
        console.log('GET NONCE: ', count);
        const params = validationInput(stateMethod.methodParams, count.toString(), 'nonce');
        dispatchMethod({ type: 'set_params', payload: params });
      }).catch(error => console.error(error));
    }
  };

  useEffect(() => {
    getNonce();
  }, [stateMethod.publicKey]);

  return (
      <ContentCardWCS
          className={cx(
            classes.content,
            className,
          )}>
            <div className={classes.inputContainer}>
              {stateGlobal.isLoadingMethod
                ? <CircularProgress className={classes.progress}/>
                : <React.Fragment>
                    <ParamsAreaWCS
                        isLoading={stateGlobal.isLoadingMethod}
                        onChange={onInput}
                        mainInputs={stateMethod.methodParams.filter((val) => {
                          if (!val.payable && val.name === 'value') {
                            return true;
                          }
                          return !['nonce', 'gasLimit', 'gasPrice'].includes(val.name);
                        })}
                        additionalInputs={stateMethod.methodParams.filter((val) => {
                          if (val.payable && val.name === 'value') {
                            return true;
                          }
                          return ['nonce', 'gasLimit', 'gasPrice'].includes(val.name);
                        })} />
                      { React.Children.map(props.children, child => React.cloneElement(child,
                        {
                          ...props,
                          classes,
                          stateGlobal,
                          dispatchGlobal,
                          stateMethod,
                          dispatchMethod,
                        }))}
                  </React.Fragment>
              }
            </div>
      </ContentCardWCS>
  );
};

EtherTransferFields.propTypes = {
  classes: PropTypes.object.isRequired,
  stateContract: PropTypes.object.isRequired,
  dispatchContract: PropTypes.object.isRequired,
  stateMethod: PropTypes.object.isRequired,
  dispatchMethod: PropTypes.object.isRequired,
};

export default withStyles(styles)(EtherTransferFields);
