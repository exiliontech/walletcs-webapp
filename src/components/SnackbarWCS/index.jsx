import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import {Snackbar} from '@material-ui/core';
import SnackbarContentWCS from './SnackbarContent'
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  default: {
  
  }
});

const SnackbarWCS = ({className, ...props}) => {
  const {classes, variant, message, onClose, isOpen, onExited} = props;
  
  return (
      <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          open={isOpen}
          autoHideDuration={6000}
          onClose={onClose}
          onExited={onExited}>
        <SnackbarContentWCS
            onClose={onClose}
            variant={variant}
            message={message}/>
      </Snackbar>)
};


SnackbarWCS.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired
};

export default withStyles(styles)(SnackbarWCS);
