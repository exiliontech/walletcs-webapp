import React, { useContext } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { InputAdornment } from '@material-ui/core';
import TextField from '@material-ui/core/es/TextField/TextField';
import QuestionToolTipWCS from '../QuestionToolTipWCS';
import RedirectButtonWCS from '../RedirectButtonWCS';
import CurrencyViewiers from '../../utils';
import GlobalReducerContext from '../../contexts/GlobalReducerContext';

const INPUT_FIELD = {
  root: 'root',
  variant: 'outlined',
  type: 'text',
  margin: 'normal',
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
      fontSize: '16px !important',
      color: '#6E7782 !important',
      paddingTop: '5px',
      '&:hover': {
        backgroundColor: '#FFFFFF',
      },
      '& svg': {
        paddingTop: '5px',
      },
    },
    '& legend': {
      width: '0 !important',
    },
  },
  error: {
    margin: 1,
  },
});

const InputWCS = ({ className, ...props }) => {
  const { currentCurrency } = useContext(GlobalReducerContext);
  const {
    classes, isQuestion, label, validator, value,
  } = props;
  const {
    isRedirect, onRedirectClick, textQuestionTip,
  } = props;

  return (
      <TextField
        className={cx(
          INPUT_FIELD.root,
          classes.default,
          className,
        )}
        variant={INPUT_FIELD.variant}
        type={INPUT_FIELD.type}
        margin={INPUT_FIELD.margin}
        label={label || ''}
        InputLabelProps={{ variant: 'filled', classes }}
        FormHelperTextProps={{ error: classes.error, ...props }}
        error={validator ? !!validator(value) : null}
        helperText={validator ? validator(value) : null}
        onRedirectClicc={onRedirectClick}
        InputProps={{
          endAdornment: isQuestion || isRedirect ? (
              <InputAdornment position="start">
                {isRedirect ? <RedirectButtonWCS
                text={CurrencyViewiers[currentCurrency].text}
                onClick={() => CurrencyViewiers[currentCurrency].redirect(value)}/> : ''}
                {isQuestion ? <QuestionToolTipWCS text={textQuestionTip}/> : ''}
              </InputAdornment>
          ) : '',
        }} {...props}/>
  );
};

InputWCS.propTypes = {
  classes: PropTypes.object.isRequired,
  isQuestion: PropTypes.bool,
  isRedirect: PropTypes.bool,
  label: PropTypes.string,
  validator: PropTypes.func,
  textRedirectTip: PropTypes.string,
  textQuestionTip: PropTypes.string,
  onRedirectClick: PropTypes.func,
};

export default withStyles(styles)(InputWCS);
