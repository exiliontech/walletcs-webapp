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
  margin: 'normal'
};

const styles = theme => ({
  default: {
    marginBottom: 22,
    marginTop: 0,
    '& div': {
      minHeight: 64,
      backgroundColor: '#FFFFFF',
    },
    '& input': {
      paddingTop: 30,
    },
    '& label': {
      fontSize:  '16px !important',
      color: '#6E7782 !important',
      paddingTop: 7
    },
    '& legend':{
      width:  '0 !important',
    }
  },
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
        margin={INPUT_FIELD.margin}
        label={props.label ? props.label: ''}
        InputLabelProps={{variant: 'filled', margin: 'dense', classes: props.classes, }}
        InputProps={{endAdornment: props.isQuestion ? (
              <InputAdornment position="start">
                <IconButton
                    aria-label="Toggle tip"
                    onClick={onClickTip}>
                  <QuestionIcon/>
                </IconButton>
              </InputAdornment>
          ): ''}} {...props}/>
  )
};

InputWCS.propTypes = {
  classes: PropTypes.object.isRequired,
  isQuestion: PropTypes.bool,
  label: PropTypes.string,
};

export default withStyles(styles)(InputWCS);
