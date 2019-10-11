import React, { useContext, useEffect, useReducer } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';
import { checkEtherAddress } from '../../utils';
import ContentCardWCS from '../../components/ContentCardWCS';
import GlobalReducerContext from '../../contexts/GlobalReducerContext';
import ParamsAreaWCS from '../../components/ParamsAreaWCS';
import { usePrepareTransfer } from './actionsAddTransferEther';
import { initStateMethodReducer, methodReducer } from '../../reducers';
import { calculateGasLimit, validationInput } from '../SingleTransactionEtherC/actionsSingleTransaction';
import Web3Context from '../../contexts/Web3Context';

import { styles } from './styles';
import * as _ from "lodash";

const EtherTransferFields = ({ className, ...props }) => {
  const { classes } = props;
  const { stateGlobal, dispatchGlobal } = useContext(GlobalReducerContext);
  const [stateMethod, dispatchMethod] = useReducer(methodReducer, initStateMethodReducer);
  const { etherProvider } = useContext(Web3Context);

  usePrepareTransfer(dispatchMethod);

  const onInput = (val, name) => {
    const newVal = val.replace(/ /g, '');
    const params = validationInput(stateMethod.methodParams, newVal, name);
    dispatchMethod({ type: 'set_params', payload: params });

    if (name === 'from' && checkEtherAddress(newVal)) {
      dispatchMethod({ type: 'set_public_key', payload: newVal });
    }
  };

  const getNonce = () => {
    if (checkEtherAddress(stateMethod.publicKey)) {
      etherProvider.getNonce(stateMethod.publicKey).then((count) => {
        console.log('GET NONCE: ', count);
        const params = validationInput(stateMethod.methodParams, parseInt(count, 16), 'nonce');
        dispatchMethod({ type: 'set_params', payload: params });
      }).catch(error => console.error(error));
    }
  };

  const getGasLimit = async () => {
    if (stateMethod.methodParams.length >= 3) {
      const transaction = {
        from: stateMethod.publicKey,
        to: _.filter(stateMethod.methodParams, val => val.name === 'to')[0].value,
        gasPrice: `0x${_.filter(stateMethod.methodParams, val => val.name === 'gasPrice')[0].value.toString(16)}`,
        nonce: `0x${_.filter(stateMethod.methodParams, val => val.name === 'nonce')[0].value.toString(16)}`,
      };
      const params = await calculateGasLimit(transaction, etherProvider, stateMethod.methodParams);
      dispatchMethod({ type: 'set_params', payload: params });
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
