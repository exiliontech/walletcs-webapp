import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { InputAdornment, Button } from '@material-ui/core';
import TextField from '@material-ui/core/es/TextField/TextField';
import QuestionToolTipWCS from '../QuestionToolTipWCS';

const INPUT_FIELD = {
  root: 'root',
  variant: 'outlined',
  type: 'text',
  margin: 'normal',
};

const styles = theme => ({
  default: {
    width: 288,
    height: '44 !important',
    backgroundColor: '#FFFFFF',
    marginLeft: 16,
    marginTop: 16,
    '& input': {
      textAlign: 'right',
    },
  },
  startText: {
    fontSize: 14,
    color: '#6E7782',
    whiteSpace: 'nowrap',
  },
  classEndButton: {
    textTransform: 'none',
    color: '#F95721',
    fontSize: 16,
  },
  hidden: {
    color: 'transparent',
  },
});

const SecondaryInputWCS = ({ className, ...props }) => {
  const {
    classes, label, isEndButton, isQuestion, onClickEndButton 
  } = props;
  const { textEndButton, textTip } = props;
  delete props.label;

  return (
      <TextField
          {...props}
          className={cx(
            INPUT_FIELD.root,
            classes.default,
            className,
          )}
          variant={INPUT_FIELD.variant}
          type={INPUT_FIELD.type}
          margin={INPUT_FIELD.margin}
          InputProps={{
            startAdornment: isQuestion ? (
                <InputAdornment position="start">
                  <p className={classes.startText}>
                    {label || ''}
                  </p>
                </InputAdornment>) : '',
            endAdornment:
              <InputAdornment position="start">
                {isEndButton
                  ? <Button onClick={onClickEndButton}
                          className={classes.classEndButton}>
                    {textEndButton}
                  </Button> : ''}
                  <QuestionToolTipWCS text={textTip}/>
              </InputAdornment>,
            className: isEndButton ? classes.hidden : '',
          }}
      />
  );
};

SecondaryInputWCS.propTypes = {
  classes: PropTypes.object.isRequired,
  isQuestion: PropTypes.bool,
  label: PropTypes.string,
};

export default withStyles(styles)(SecondaryInputWCS);
