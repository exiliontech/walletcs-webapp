import React from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/es/styles';
import SvgIcon from '@material-ui/core/SvgIcon';
import PropTypes from 'prop-types';

const MENU_ICON = {
  fontSize: 'inherit',
  viewBox: '0 0 24 24',
};

const styles = theme => ({
  default: {
    width: 24,
    height: 24,
  },
});

const DeleteButton = ({ className, ...props }) => {
  const { classes } = props;

  return (
      <SvgIcon
          className={cx(
            classes.default,
            className,
          )}
          viewBox={MENU_ICON.viewBox}
          {...props}>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23ZM12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21ZM7 11V13H17V11H7Z" fill="#04AA42"/>
      </SvgIcon>
  );
};

DeleteButton.porpTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DeleteButton);
