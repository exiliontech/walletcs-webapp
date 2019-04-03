import React, {useEffect, useState} from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles";
import {InputAdornment, IconButton, Typography} from '@material-ui/core'
import TextField from "@material-ui/core/es/TextField/TextField";
import QuestionIcon from '../InputWCS/QuestionIcon';


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
      direction: 'rtl'
    }
  },
  startText: {
    fontSize: 14,
    color: '#6E7782'
  },
});

const SecondaryInputWCS = ({className, ...props}) => {
  const {classes, update, label} = props;
  delete props.label;
  
  const [updateState, setUpdateState] = useState(undefined);
  
  if(updateState !== update){
    setUpdateState(update);
  }
  
  const onClickTip = () => {
    console.log('CLICK TIP');
  };
  
  return (
      <TextField
          className={cx(
              INPUT_FIELD.root,
              classes.default,
              className
          )}
          variant={INPUT_FIELD.variant}
          type={INPUT_FIELD.type}
          margin={INPUT_FIELD.margin}
          InputProps={props.isQuestion ? {
            startAdornment: (
                <InputAdornment position="start">
                  <p className={classes.startText}>
                    {!!label ? label : ''}
                  </p>
                  <IconButton
                      aria-label="Toggle tip"
                      onClick={onClickTip}>
                    <QuestionIcon/>
                  </IconButton>
                </InputAdornment>
            ),
          }: ''} {...props} />
  )
};

SecondaryInputWCS.propTypes = {
  classes: PropTypes.object.isRequired,
  isQuestion: PropTypes.bool,
  label: PropTypes.string,
};

export default withStyles(styles)(SecondaryInputWCS);
