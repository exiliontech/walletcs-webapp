import React from 'react';
import PropTypes from 'prop-types';
import QuestionIcon from './QuestionIcon';
import { withStyles } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";
import ToolTipsWCS from '../ToolTipsWCS';

const styles = theme => ({
  iconButton: {
    width: 16,
    height: 16,
    backgroundColor: 'none',
    borderRadius: 0,
    '&:hover': {
      backgroundColor: '#FFFFFF'
    }
  }
});

const QuestionToolTipWCS = ({className, ...props}) => {
  const {classes} = props;
  return (
    <ToolTipsWCS {...props}>
      <IconButton aria-label="Toggle tip" className={classes.iconButton}>
          <QuestionIcon/>
        </IconButton>
    </ToolTipsWCS>
  )
};

QuestionToolTipWCS.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(QuestionToolTipWCS);
