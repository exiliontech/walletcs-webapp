import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  blankContent: {
    display: 'flex',
    width: '100%',
    height: '100%',
    backgroundColor: '#F2F2F2',
  }
});

const ContentCardWCS = ({className, ...props}) => {
  const {classes} = props;
  
  return (
      <>
        <div className={cx(classes.blankContent, className)}>
          {props.children}
        </div>
      </>
  )
};

ContentCardWCS.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ContentCardWCS);
