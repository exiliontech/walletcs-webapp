import React, {useContext} from "react";
import cx from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles";
import ButtonWCS from "../../components/ButtonWCS";
import ContentCardWCS from "../../components/ContentCardWCS";
import {checkAddress} from 'walletcs';
import GlobalReducerContext from "../../contexts/GlobalReducerContext";
import ParamsAreaWCS from "../../components/ParamsAreaWCS";
import {useTransfer} from "../../containers/TransferEther/actionsAddTransferEther";
import {CircularProgress} from "@material-ui/core";
import {GAS_LIMIT, recalculateGasLimit, validationInput} from "../SingleTransactionEtherC/actionsSingleTransaction";
import Web3Context from "../../contexts/Web3Context";

const DEFAULT_SETTING = {
  root: 'root'
};

const styles = theme => ({
  progress: {
    position: 'absolute',
    top: '50%',
    left: '50%'
  }
});

const AddTransferEther = ({className, ...props}) => {
  const {classes, dispatchContract} = props;
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
        {stateGlobal.isLoadingMethod ?
            <CircularProgress className={classes.progress}/>
            :
            <div className={classes.inputContainer}>
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
                      undefined,
                      stateMethod, dispatchMethod,
                      dispatchGlobal,
                      provider)}
              />
              <div className={classes.containerButtons}>
                <ButtonWCS
                    className={classes.button}
                    disabled={!(stateMethod.methodParams.filter((val) => {
                      return val.value !== null
                    }).length === 6)}
                    onClick={e => {
                      dispatchContract(
                          {
                            type: 'add_to_table',
                            payload: {params: stateMethod.methodParams}
                          }
                      );
                      props.onCancel(e)
                    }}>
                  Save
                </ButtonWCS>
                <ButtonWCS
                    className={classes.button}
                    onClick={props.onCancel}>
                  Cancel
                </ButtonWCS>
              </div>
            </div>
        }
      </ContentCardWCS>
  )
};

AddTransferEther.propTypes = {
  classes: PropTypes.object.isRequired,
  stateContract: PropTypes.object.isRequired,
  dispatchContract: PropTypes.object.isRequired,
  stateMethod: PropTypes.object.isRequired,
  dispatchMethod: PropTypes.object.isRequired,
  onCancel: PropTypes.object.isRequired
};

export default withStyles(styles)(AddTransferEther);
