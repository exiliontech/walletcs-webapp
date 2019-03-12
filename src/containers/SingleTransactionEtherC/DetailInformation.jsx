import React, {useContext, useState} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles";
import {Button, InputAdornment} from "@material-ui/core";
import GlobalReducerContext from "../../contexts/GlobalReducerContext";
import InputWCS from "../../components/InputWCS";
import DetailsWCS from "../../components/DetailsWCS";
import DropDownWCS from "../../components/DropDownWCS";
import ParamsAreaWCS from "../../components/ParamsAreaWCS";

import {styles} from "./styles"

const DetailInformation = props => {
  const {classes} = props;
  const {dispatchGlobal, stateGlobal} = useContext(GlobalReducerContext);
  const {stateMethod, dispatchMethod, state,} = props;
  
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
      let _params = !!stateMethod.methodParams.length ?  stateMethod.methodParams.map(val => !val.value) : [];
      let result = await state.contract[stateMethod.methodName](..._params);
      dispatchMethod({type: 'set_method_call_result', payload: result})
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
            details={state.contractName ? [{'key': 'Name:', 'value': state.contractName}]: []}/>
            
        <DropDownWCS
            className={classes.dropDown}
            defaultInput="Choose contract method *"
            disabled={!stateMethod.methodParams}
            value={stateMethod.methodName}
            items={state.abi.filter((val) => val.type === 'function')}
            onChange={e => {
              dispatchMethod({type: 'set_method_name', payload: e.target.value})
            }}/>
            
        {/*Area for inputs if call methods with many params*/}
        {stateMethod.methodName && stateMethod.mode === 'inputMethod' ?
          <ParamsAreaWCS
              onChange={onInput}
              mainInputs={stateMethod.methodParams.filter((val) =>{
                return !['nonce', 'gasLimit', 'value', 'gasPrice'].includes(val.name)
              })}
              additionalInputs={stateMethod.methodParams.filter((val) =>{
                return ['nonce', 'gasLimit', 'value', 'gasPrice'].includes(val.name)
              })}
          />
          : ''}
  
        {/*Result for call method*/}
        {stateMethod.methodCallResult ?
            <DetailsWCS
                className={classes.result}
                isLoading={stateGlobal.isLoadingMethod}
                details={[{'key': stateMethod.methodName, 'value': stateMethod.methodCallResult}]}/>: ''}
  
        {/*Result view method*/}
        {stateMethod.mode === 'viewMethod'?
            <div className={classes.callMethodWrapper}>
              {stateMethod.methodParams.map(val => {
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
  state: PropTypes.object.isRequired,
  isLoading: PropTypes.object.isRequired
};

export default withStyles(styles)(DetailInformation);
