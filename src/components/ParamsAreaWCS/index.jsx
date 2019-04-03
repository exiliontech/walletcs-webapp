import React from 'react';
import PropTypes from 'prop-types';
import InputAdornment from '@material-ui/core/InputAdornment';
import {checkAddress} from 'walletcs';
import { withStyles } from "@material-ui/core/styles";
import InputWCS from '../InputWCS'
import SecondaryInputWCS from '../SecondaryInputWCS';

const styles = theme => ({
  mainArea: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  additionalArea: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'start',
    flexWrap: 'wrap',
    backgroundColor: '#EBEDED',
    borderRadius: 4,
    minHeight: 136,
  },
  mainInput: {
    minWidth: 624,
  },
});

const ParamsAreaWCS = ({className, ...props}) => {
  const {classes, mainInputs, additionalInputs, onChange, isLoading, button} = props;
  
  const validation = (value, type) => {
    const isInt = (n) => {
      return Number(n) === n && n % 1 === 0;
    };
  
    const isFloat = (n) => {
      return Number(n) === n && n % 1 !== 0;
    };
    
    if(!type){
      return true
    }
    if(type === 'address'){
      return checkAddress(value)
    }
    if(type.indexOf('uint') > -1){
      let data = parseInt(value);
      return (isInt(data) || isFloat(data));
    }
    return true
  };
  
  return (
      <>
        <div className={classes.mainArea}>
          {mainInputs.map((val, index) => {
            return <InputWCS
                key={val.name + index.toString()}
                className={classes.mainInput}
                label={val.name}
                error={val.value ? !validation(val.value, val.type) : false}
                onChange={e => onChange(e.target.value, val.name)}
                value={val.value}
                InputProps={{
                  endAdornment: <InputAdornment position="end">{val.type}</InputAdornment>,}
                }/>
          })}
        </div>
        {!!additionalInputs ?
          <div className={classes.additionalArea}>
              {additionalInputs.map((val, index) => {
                return <SecondaryInputWCS
                    key={val.name + index.toString()}
                    className={classes.additionInput}
                    label={val.name + '(' + val.type + ')'}
                    error={val.value ? !validation(val.value, val.type) : false}
                    onChange={e => onChange(e.target.value, val.name)}
                    value={val.value}
                    isQuestion={true}
                />
              })}
          </div> : ''}
      </>
  )
};

ParamsAreaWCS.propTypes = {
  classes: PropTypes.object.isRequired,
  additionalInputs: PropTypes.array,
  onChange: PropTypes.func,
  mainInputs: PropTypes.array,
  isLoading: PropTypes.bool,
};

export default withStyles(styles)(ParamsAreaWCS);
