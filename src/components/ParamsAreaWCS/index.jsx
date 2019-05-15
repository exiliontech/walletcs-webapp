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
  const textTips = {
    'gasLimit': 'Maximum amount of gas you\'re willing to spend on this transaction',
    'gasPrice': 'Amount of Ether you\'re willing to pay for every unit of gas, in GWEI',
    'nonce': 'Number of transactions sent from a given address. Keep default if you are not sure.'
  }

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
      <React.Fragment>
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
                    key={ + index.toString()}
                    className={classes.additionInput}
                    label={val.name + '(' + val.type + ')'}
                    error={val.value ? !validation(val.value, val.type) : false}
                    onChange={e => onChange(e.target.value, val.name)}
                    value={val.value}
                    isQuestion={true}
                    isEndButton={val.name === 'gasLimit' && !val.value}
                    onClickEndButton={props.recalculateButton}
                    textEndButton="Calculate"
                    textTip={textTips[val.name]}
                />
              })}
          </div> : ''}
      </React.Fragment>
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
