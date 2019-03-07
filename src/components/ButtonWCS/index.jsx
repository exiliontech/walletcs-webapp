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
    fontSize: 16,
    width: 251,
    height: 60
  },
  disabledButton: {
    backgroundColor: 'rgba(104, 148, 188, 0.5) !important',
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
