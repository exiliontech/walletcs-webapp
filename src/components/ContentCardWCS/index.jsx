import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  blankContent: {
    display: 'flex',
    width: 995,
    minHeight: 590,
    backgroundColor: '#FFFFFF',
    alignSelf: 'center',
    marginTop: 30
  }
});

const ContentCard = ({className, ...props}) => {
  const {classes} = props;
  
  return (
      <>
        <div className={cx(classes.blankContent, className)}>
          {props.children}
        </div>
      </>
  )
};

ContentCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ContentCard);
