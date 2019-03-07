import React from 'react';
import cx from 'classnames';
import {withStyles} from "@material-ui/core/es/styles";
import SvgIcon from '@material-ui/core/SvgIcon';
import PropTypes from "prop-types";

const styles = theme => ({
  default:{
  }
});

const IconWCS =({className, ...props}) => {
  const { classes } = props;
  
  return (
      <SvgIcon
          className={cx(
              classes.default,
              className
          )}
          {...props}>
        <svg width="25" height="25" viewBox="0 0 21 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20.7943 8.82353H14.9119V0H6.08841V8.82353H0.206055L10.5002 19.1176L20.7943 8.82353ZM0.206055 22.0588V25H20.7943V22.0588H0.206055Z" fill="#6894BC"/>
        </svg>
      </SvgIcon>
  )
};

IconWCS.porpTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IconWCS);
