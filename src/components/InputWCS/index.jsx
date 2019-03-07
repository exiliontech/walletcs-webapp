import React, {useEffect, useState} from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles";
import {InputAdornment, IconButton} from '@material-ui/core'
import TextField from "@material-ui/core/es/TextField/TextField";
import QuestionIcon from './QuestionIcon';

const INPUT_FIELD = {
  root: 'root',
  variant: 'outlined',
  type: 'text',
};

const styles = theme => ({
  default: {
  }
});

const InputWCS = ({className, ...props}) => {
  const {classes, update} = props;
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
        label={props.label ? props.label: ''}
        InputProps={props.isQuestion ? {
          endAdornment: (
              <InputAdornment position="end">
                <IconButton
                    aria-label="Toggle tip"
                    onClick={onClickTip}>
                  <QuestionIcon/>
                </IconButton>
              </InputAdornment>
          ),
        }: ''} {...props}/>
  )
};

InputWCS.propTypes = {
  classes: PropTypes.object.isRequired,
  isQuestion: PropTypes.bool,
  label: PropTypes.string,
};

export default withStyles(styles)(InputWCS);
