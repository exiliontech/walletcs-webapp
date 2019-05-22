import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GlobalReducerContext from '../../contexts/GlobalReducerContext';
import DropDownWCS from '../../components/DropDownWCS';
import ParamsAreaWCS from '../../components/ParamsAreaWCS';
import { validationInput } from './actionsSingleTransaction';
import { styles } from './styles';

const DetailInformation = (props) => {
  const { classes } = props;
  const { stateGlobal } = useContext(GlobalReducerContext);
  const { stateMethod, dispatchMethod, stateContract } = props;

  const onInput = (val, name) => {
    val = val.replace(/ /g, '');
    const params = validationInput(stateMethod.methodParams, val, name);
    dispatchMethod({ type: 'set_params', payload: params });
  };

  return (
      <React.Fragment>
        <DropDownWCS
            className={classes.dropDown}
            defaultInput="Choose method"
            disabled={!stateMethod.methodParams}
            value={stateMethod.methodName}
            items={stateContract.abi.filter(val => val.type === 'function')}
            onChange={(value) => {
              dispatchMethod({ type: 'set_method_name', payload: value });
            }}/>

        {/* Area for inputs if call methods with many params */}
        {stateMethod.methodType === 'transaction' && !!stateMethod.methodParams.length
          ? <ParamsAreaWCS
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
                })}
                recalculateButton={props.recalculateButton}
               /> : ''}
        {stateMethod.methodType === 'call' && !!stateMethod.methodParams.length
          ? <ParamsAreaWCS
                isLoading={stateGlobal.isLoadingMethod}
                onChange={onInput}
                mainInputs={stateMethod.methodParams.filter((val) => {
                  if (!val.payable && val.name === 'value') {
                    return true;
                  }
                  return !['nonce', 'gasLimit', 'gasPrice'].includes(val.name);
                })}
            /> : ''}
      </React.Fragment>
  );
};

DetailInformation.propTypes = {
  dispatchMethod: PropTypes.func.isRequired,
  stateMethod: PropTypes.object.isRequired,
  stateContract: PropTypes.object.isRequired,
  isLoading: PropTypes.object.isRequired,
  recalculateButton: PropTypes.func,
};

export default withStyles(styles)(DetailInformation);
