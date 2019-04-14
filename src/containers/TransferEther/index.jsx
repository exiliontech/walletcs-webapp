import React, {useContext} from "react";
import cx from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles";
import ButtonWCS from "../../components/ButtonWCS";
import ContentCardWCS from "../../components/ContentCardWCS";
import {checkAddress} from 'walletcs';
import GlobalReducerContext from "../../contexts/GlobalReducerContext";
import ParamsAreaWCS from "../../components/ParamsAreaWCS";
import {useTransfer} from "./actionsAddTransferEther";
import {CircularProgress} from "@material-ui/core";
import {recalculateGasLimit, downloadOneTransaction, validationInput} from "../SingleTransactionEtherC/actionsSingleTransaction";
import Web3Context from "../../contexts/Web3Context";

import {styles} from './styles';

const TransferEther = ({className, ...props}) => {
  const {classes} = props;
  const {stateGlobal, dispatchGlobal} = useContext(GlobalReducerContext);
  const {provider} = useContext(Web3Context);
  const [stateMethod, dispatchMethod] = useTransfer();

  const onInput = (val, name) => {
    val = val.replace(/ /g,'');
    let params = validationInput(stateMethod.methodParams, val, name);
    dispatchMethod({type: 'set_params', payload: params});
  };
  
  return (
      <ContentCardWCS
          className={cx(
              classes.content,
              className
          )}>
            <div className={classes.inputContainer}>
              {stateGlobal.isLoadingMethod ?
                  <CircularProgress className={classes.progress}/>
                  :
                  <React.Fragment>
                    <ParamsAreaWCS
                        isLoading={stateGlobal.isLoadingMethod}
                        onChange={onInput}
                        mainInputs={stateMethod.methodParams.filter((val) => {
                          if (!val.payable && val.name === 'value') {
                            return true
                          }
                          return !['nonce', 'gasLimit', 'gasPrice'].includes(val.name)
                        })}
                        additionalInputs={stateMethod.methodParams.filter((val) => {
                          if (val.payable && val.name === 'value') {
                            return true
                          }
                          return ['nonce', 'gasLimit', 'gasPrice'].includes(val.name)
                        })}
                        recalculateButton={e => recalculateGasLimit(
                            {},
                            stateMethod,
                            dispatchMethod,
                            dispatchGlobal,
                            provider)}
                    />
                    {console.log(stateMethod.methodParams.filter((val) => {
                      return val.value !== null
                    }).length === 6)}
                    <div className={classes.containerButtons}>
                      <ButtonWCS
                          className={classes.button}
                          disabled={!(stateMethod.methodParams.filter((val) => {
                            return val.value !== null
                          }).length === 6)}
                          onClick={e => {downloadOneTransaction({}, stateMethod)}}>
                        Download Transaction
                      </ButtonWCS>
                    </div>
                  </React.Fragment>
              }
            </div>
      </ContentCardWCS>
  )
};

TransferEther.propTypes = {
  classes: PropTypes.object.isRequired,
  stateContract: PropTypes.object.isRequired,
  dispatchContract: PropTypes.object.isRequired,
  stateMethod: PropTypes.object.isRequired,
  dispatchMethod: PropTypes.object.isRequired,
};

export default withStyles(styles)(TransferEther);
