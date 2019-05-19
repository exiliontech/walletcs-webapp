import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles";
import {InputAdornment, Button} from '@material-ui/core'
import TextField from "@material-ui/core/es/TextField/TextField";
import QuestionToolTipWCS from "../QuestionToolTipWCS";

const INPUT_FIELD = {
  root: 'root',
  variant: 'outlined',
  type: 'text',
  margin: 'normal'
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
    }
  },
  startText: {
    fontSize: 14,
    color: '#6E7782'
  },
  classEndButton: {
    textTransform: 'none',
    color: '#F95721',
    fontSize: 16
  },
  hidden: {
    color: 'transparent'
  }
});

const SecondaryInputWCS = ({className, ...props}) => {
  const {classes, label} = props;
  delete props.label;

  return (
      <TextField
          {...props}
          className={cx(
              INPUT_FIELD.root,
              classes.default,
              className
          )}
          variant={INPUT_FIELD.variant}
          type={INPUT_FIELD.type}
          margin={INPUT_FIELD.margin}
          InputProps={{
            startAdornment: props.isQuestion ? (
                <InputAdornment position="start">
                  <p className={classes.startText}>
                    {!!label ? label : ''}
                  </p>
                  <QuestionToolTipWCS text={props.textTip}/>
                </InputAdornment>): '',
            endAdornment: props.isEndButton ? (
                <InputAdornment position="start">
                  <Button onClick={props.onClickEndButton}
                          className={classes.classEndButton}>
                    {props.textEndButton}
                  </Button>
                </InputAdornment>
              ): '', className: props.isEndButton ? classes.hidden: ''}}
      />
  )
};

SecondaryInputWCS.propTypes = {
  classes: PropTypes.object.isRequired,
  isQuestion: PropTypes.bool,
  label: PropTypes.string,
};

export default withStyles(styles)(SecondaryInputWCS);
