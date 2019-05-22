import React from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/es/styles';
import SvgIcon from '@material-ui/core/SvgIcon';
import PropTypes from 'prop-types';

const MENU_ICON = {
  fontSize: 'inherit',
  viewBox: '0 0 16 16',
};

const styles = theme => ({
  default: {
    width: 16,
    height: 16,
    padding: 8,
    '& path': {
      '&:hover': {
        fill: 'black !important',
      },
    },
  },
});


const EnterIcon = ({ className, ...props }) => {
  const { classes } = props;

  return (
        <SvgIcon
          className={cx(
            classes.default,
            className,
          )}
          viewBox={MENU_ICON.viewBox}
          {...props}>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM11.7071 7.29289L8.70711 4.29289C8.31658 3.90237 7.68342 3.90237 7.29289 4.29289C6.90237 4.68342 6.90237 5.31658 7.29289 5.70711L8.58579 7H4C3.44772 7 3 7.44772 3 8C3 8.55228 3.44772 9 4 9H8.58579L7.29289 10.2929C6.90237 10.6834 6.90237 11.3166 7.29289 11.7071C7.68342 12.0976 8.31658 12.0976 8.70711 11.7071L11.7071 8.70711C12.0976 8.31658 12.0976 7.68342 11.7071 7.29289Z" fill="#9198A0"/>
        </SvgIcon>
  );
};

EnterIcon.porpTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EnterIcon);
