import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles";
import {FormControl, InputLabel, Select, OutlinedInput, MenuItem} from '@material-ui/core';

const DEFAULT_SETTING = {
  root: 'root',
  focused: 'focused'
};

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    width: '100%',
  },
  paper: {
    backgroundColor: '#ECEFF6',
    '&:hover':{
      backgroundColor: 'rgba(104, 148, 188, 0.3);'
    }
  },
  selectItem: {
    backgroundColor: '#ECEFF6',
    '& svg': {
      color: theme.palette.primary.main,
      width: 30,
      height: 30
    },
    textAlign: 'start',
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
});

const DropDownWCS = ({className, ...props}) => {
  const {classes} = props;
  
  return (
      <>
        <form className={classes.root} autoComplete="off">
        <FormControl
            variant="outlined"
            className={cx(
                DEFAULT_SETTING.root,
                classes.formControl,
                className
            )}>
          {!props.value? <InputLabel
              htmlFor="outlined">
            {props.defaultInput}
          </InputLabel>: ''}
          <Select
              className={cx(classes.selectItem, DEFAULT_SETTING.root)}
              value={props.value}
              onChange={props.onChange}
              variant="outlined"
              MenuProps={{'classes': classes.paper}}
              input={
                <OutlinedInput
                    labelWidth={!props.value? props.defaultInput.length * 8: 0}
                    name={props.defaultInput}
                    id="outlined"/>
              }>
            {props.items.map((val) => {
              return <MenuItem value={val.name}>{val.name}</MenuItem>}
              )}
          </Select>
        </FormControl>
        </form>
      </>
  )
};

DropDownWCS.propTypes = {
  classes: PropTypes.object.isRequired,
  defaultInput: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  items: PropTypes.array,
};

export default withStyles(styles)(DropDownWCS);
