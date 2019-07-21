import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles";

const DEFAULT_SETTING = {
  root: 'root'
};

const styles = theme => ({
  default: {
  
  }
});

const DefaultComponent = ({className, ...props}) => {
  const {classes} = props;
  
  return (
      <>
      </>
  )
};

DefaultComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DefaultComponent);
