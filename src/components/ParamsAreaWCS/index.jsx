import React from 'react';
import PropTypes from 'prop-types';
import InputAdornment from '@material-ui/core/InputAdornment';
import {checkAddress} from 'walletcs';

import { withStyles } from "@material-ui/core/styles";
import InputWCS from '../InputWCS'

const styles = theme => ({
  mainArea: {
    display: 'flex',
    flexWrap: 'wrap',
    marginLeft: 20,
    marginRight: 20
  },
  additionalArea: {
    display: 'flex',
    justifyContent: 'space-around',
    backgroundColor: '#EEEEEE',
    marginLeft: 20,
    marginRight: 20,
    height: 144
  },
  mainInput: {
    minWidth: '45%',
    margin: 15
  },
  additionInput: {
    backgroundColor: '#FFFFFF',
    alignSelf: 'center',
    marginTop: 12
  }
});

const ParamsAreaWCS = ({className, ...props}) => {
  const {classes, mainInputs, additionalInputs, onChange, recalculateGasLimit} = props;
  
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
              return <InputWCS
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
};

export default withStyles(styles)(ParamsAreaWCS);
