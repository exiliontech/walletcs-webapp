import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import InputAdornment from '@material-ui/core/InputAdornment';
import {checkAddress} from 'walletcs';

import { withStyles } from "@material-ui/core/styles";
import InputWCS from '../../components/InputWCS'
import {checkAddress} from 'walletcs';

const DEFAULT_SETTING = {
  root: 'root'
};

const styles = theme => ({
  mainArea: {
    display: 'flex',
    flex: 'wrap'
  },
  additionalArea: {
    display: 'flex',
    flex: 'wrap'
  },
  mainInput: {
  
  },
  additionInput: {
    backgroundColor: '#EEEEEE',
    width: 957,
    height: 144
  }
});

const ParamsArea = ({className, ...props}) => {
  const {classes, mainInputs, additionalInputs} = props;
  
  const validation = (value, type) => {
    if(type === 'address'){
      return checkAddress(value)
    }
    if(type.indexOf('unit') > -1){
    
    }
  }
  
  return (
      <>
        <div className={classes.mainArea}>
          {mainInputs.map((val) => {
            return <InputWCS
                className={classes.mainInput}
                label={val.name}
                InputProps={{
                  endAdornment: <InputAdornment position="end">{val.type}</InputAdornment>,}
                }/>
          })}
        </div>
        <div className={classes.additionalArea}>
          {additionalInputs.map((val) => {
            return <InputWCS
                className={classes.additionalInputs}
                label={val.name}
                InputProps={{
                  endAdornment: <InputAdornment position="end">{val.type}</InputAdornment>,}
                }/>
          })}
        </div>
      </>
  )
};

ParamsArea.propTypes = {
  classes: PropTypes.object.isRequired,
  mainInputs: PropTypes.array,
  additionalInputs: PropTypes.array
};

export default withStyles(styles)(ParamsArea);
