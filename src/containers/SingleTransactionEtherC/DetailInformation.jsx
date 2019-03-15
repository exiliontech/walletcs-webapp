import React, {useContext } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles";
import {Button, InputAdornment} from "@material-ui/core";
import GlobalReducerContext from "../../contexts/GlobalReducerContext";
import InputWCS from "../../components/InputWCS";
import DetailsWCS from "../../components/DetailsWCS";
import DropDownWCS from "../../components/DropDownWCS";
import ParamsAreaWCS from "../../components/ParamsAreaWCS";

import {styles} from "./styles"
import Web3Context from "../../contexts/Web3Context";
import {ethers} from "ethers";

const DetailInformation = props => {
  const {classes} = props;
  const {dispatchGlobal, stateGlobal} = useContext(GlobalReducerContext);
  const {stateMethod, dispatchMethod, stateContract} = props;
  const {provider} = useContext(Web3Context);
  
  let _inter = new ethers.utils.Interface(stateContract.abi);
  
  const onInput = (val, name) => {
    let params = stateMethod.methodParams;
    for(let key in params){
      if(params[key].name === name){
        params[key].value = val;
      }
    }
    dispatchMethod({type: 'set_params', payload: params});
  };
  
  const onCallMethod = async () => {
    dispatchGlobal({type: 'set_is_loading_method'});
    try{
      let _params = stateMethod.methodParams.map(val => val.value);
      let result = await stateContract.contract[stateMethod.methodName](..._params);
      dispatchMethod({type: 'set_method_call_result', payload: result.toString()})
    }catch (e) {
      dispatchGlobal({type: 'set_global_error', payload: e.message})
    }
    dispatchGlobal({type: 'set_is_loading_method'});
  };
  
  return(
      <React.Fragment>
        <DetailsWCS
            className={classes.details}
            header="Details"
            isLoading={stateGlobal.isLoadingContract}
            details={stateContract.contractName ? [{'key': 'Name:', 'value': stateContract.contractName}]: []}/>
            
        <DropDownWCS
            className={classes.dropDown}
            defaultInput="Choose contract method *"
            disabled={!stateMethod.methodParams}
            value={stateMethod.methodName}
            items={stateContract.abi.filter((val) => val.type === 'function')}
            onChange={e => {
              dispatchMethod({type: 'set_method_name', payload: e.target.value})
            }}/>
            
        {/*Area for inputs if call methods with many params*/}
        {stateMethod.methodType === 'transaction' && !!stateMethod.methodParams.length ?
            <ParamsAreaWCS
                isLoading={stateGlobal.isLoadingMethod}
                onChange={onInput}
                mainInputs={stateMethod.methodParams.filter((val) =>{
                  if(!val.payable && val.name === 'value'){
                    return true
                  }
                  return !['nonce', 'gasLimit', 'gasPrice'].includes(val.name)
                })}
                additionalInputs={stateMethod.methodParams.filter((val) =>{
                  if(val.payable && val.name === 'value'){
                    return true
                  }
                  return ['nonce', 'gasLimit', 'gasPrice' ].includes(val.name)
                })}
                button={
                  <Button
                      onClick={props.recalculateButton}
                      className={classes.recalculateButton}
                      variant="contained">
                    Recalculate
                  </Button>}/>
                :
            ''}
  
        {/*Result for call method*/}
        {stateMethod.methodType === 'call' && stateMethod.methodCallResult ?
            <DetailsWCS
            className={classes.result}
            isLoading={stateGlobal.isLoadingMethod}
            details={[{'key': stateMethod.methodName || '', 'value': stateMethod.methodCallResult || ''}]}/> : ''}
  
        {/*Result view method*/}
        {stateMethod.methodType === 'call' && !stateMethod.methodCallResult && !stateGlobal.isLoadingMethod?
            <div className={classes.callMethodWrapper}>
              {_inter.functions[stateMethod.methodName].inputs.map(val => {
                return <InputWCS
                    key='view-input'
                    label={stateMethod.name}
                    onChange={e => onInput(e.target.value, val.name)}
                    InputProps={{
                      endAdornment:
                          <InputAdornment position="end">
                            {val.type}
                          </InputAdornment>}
                    }/>
              })}
              <Button
                  key="view-call"
                  className={classes.buttonSecondary}
                  onClick={onCallMethod}>
                Call method
              </Button>
            </div>
            : ''}
      </React.Fragment>
  )
};

DetailInformation.propTypes = {
  dispatchMethod: PropTypes.func.isRequired,
  stateMethod: PropTypes.object.isRequired,
  stateContract: PropTypes.object.isRequired,
  isLoading: PropTypes.object.isRequired,
  recalculateButton: PropTypes.func
};

export default withStyles(styles)(DetailInformation);
