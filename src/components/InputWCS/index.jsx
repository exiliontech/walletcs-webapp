import React from 'react';
import cx from 'classnames';
import { withStyles } from "@material-ui/core/styles";
import {InputAdornment, IconButton} from '@material-ui/core'
import TextField from "@material-ui/core/es/TextField/TextField";

const styles = theme => ({
  default: {
    minWidth: '100%'
  }
});

const WalletCSInputTip = ({className, ...props}) => {
  const {classes} = props;
  
  const onClickTip = () => {
    console.log('CLICK TIP');
  };
  
  return (
      <div>
        <TextField
            className={cx(
                classes.default,
                className
            )}
            InputProps={{
              endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                        aria-label="Toggle tip"
                        onClick={onClickTip}>
                      <QuestionIcon/>
                    </IconButton>
                  </InputAdornment>
              ),
            }} {...props}/>
      </div>
  )
};

export default withStyles(styles)(WalletCSInputTip);
