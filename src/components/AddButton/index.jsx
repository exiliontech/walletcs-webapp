import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import AddButtonIcon from './DeleteButton';

const styles = theme => ({
  iconButton: {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
});

const DeleteButton = ({ className, ...props }) => {
  const { classes, onClick, id } = props;
  return (
    <IconButton
      disableRipple={true}
      className={cx(classes.iconButton, className)}
      onClick={onClick}
      id={id}>
      <AddButtonIcon/>
    </IconButton>
  );
};

DeleteButton.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(DeleteButton);
