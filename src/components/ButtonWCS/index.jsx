import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles";
import {ButtonBase} from '@material-ui/core';

const DEFAULT_SETTING = {
  variant: 'contained',
  color: 'primary'
};

const styles = theme => ({
  defaultButton: {
    backgroundColor: '#04AA42 !important',
    color: '#FFFFFF !important',
    borderRadius: '4px !important',
    fontSize: 16,
    width: 256,
    height: 54,
    '&:hover': {
      backgroundColor: '#05C44C',
    },
    '&:active': {
      backgroundColor: '#039138'
    }
  },
  disabledButton: {
    backgroundColor: 'rgba(38, 205, 88, 0.241423) !important',
    color: '#FFFFFF !important'
  }
});

const ButtonWCS = ({className, ...props}) => {
  const {classes} = props;
  
  return (
        <ButtonBase
            className={cx(
                classes.defaultButton,
                props.disabled ? classes.disabledButton : '',
                className
            )}
            variant={DEFAULT_SETTING.variant}
            color={DEFAULT_SETTING.color}
            onClick={props.onClick}
            {...props}/>
  )
};

ButtonWCS.propTypes = {
  classes: PropTypes.object.isRequired,
  
};

export default withStyles(styles)(ButtonWCS);
