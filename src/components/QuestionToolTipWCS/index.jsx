import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import QuestionIcon from './QuestionIcon';
import ToolTipsWCS from '../ToolTipsWCS';

const styles = theme => ({
  iconButton: {
    padding: '8px !important',
    '&:hover': {
      backgroundColor: '#FFFFFF',
    },
    '& span': {
      width: 16,
    },
  },
});

const QuestionToolTipWCS = ({ className, ...props }) => {
  const { classes } = props;
  return (
    <ToolTipsWCS {...props}>
      <IconButton aria-label="Toggle tip" className={classes.iconButton}>
        <QuestionIcon/>
      </IconButton>
    </ToolTipsWCS>
  );
};

QuestionToolTipWCS.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(QuestionToolTipWCS);
