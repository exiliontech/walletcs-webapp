import React from 'react';
import cx from 'classnames';
import {withStyles} from "@material-ui/core/es/styles";
import SvgIcon from '@material-ui/core/SvgIcon';
import PropTypes from "prop-types";

const MENU_ICON = {
  fontSize: 'inherit',
  viewBox: '0 0 24 24'
};

const styles = theme => ({
  default:{
    width: 24,
    height: 24
  }
});



const EnterIcon =({className, ...props}) => {
  const { classes } = props;

  return (
        <SvgIcon
          className={cx(
              classes.default,
              className
          )}
          viewBox={MENU_ICON.viewBox}
          {...props}>
            <path d="M18.29 15.71L13.71 20.29C13.32 20.68 12.68 20.68 12.29 20.29C11.9 19.9 11.9 19.26 12.29 18.87L15.17 16H5C4.45 16 4 15.55 4 15V5C4 4.45 4.45 4 5 4C5.55 4 6 4.45 6 5V14H15.17L12.29 11.13C11.9 10.74 11.9 10.1 12.29 9.71C12.68 9.32 13.32 9.32 13.71 9.71L18.29 14.29C18.68 14.68 18.68 15.32 18.29 15.71Z" fill="#9198A0"/>
        </SvgIcon>
  )
};

EnterIcon.porpTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EnterIcon);
