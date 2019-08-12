import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { withStyles } from "@material-ui/core/styles";
import InputWCS from '../InputWCS';

const styles = theme => ({
  primaryInput: {
    width: 624,
    height: 64,
  },
  secondaryInput: {
    width: 172,
    height: 64,
    marginLeft: 20,
  },
  inputsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
});

const PairedInputWCS = ({ className, ...props }) => {
  const { labelPrimary, valuePrimary, validatorPrimary } = props;
  const { labelSecondary, valueSecondary, validatorSecondary } = props;
  const { isRedirect, redirectHandler, isQuestion } = props;
  const { textQuestionTip, textRedirectTip, classes } = props;
  const { id, onChangePrimary, onChangeSecondary } = props;
  const { classNamePrimary, classNameSecondary } = props;

  return (
    <div className={classes.inputsContainer}>
      <InputWCS
        id={id}
        className={cx(classes.primaryInput, classNamePrimary)}
        classes={classes}
        isQuestion={isQuestion}
        isRedirect={isRedirect}
        label={labelPrimary}
        validator={validatorPrimary}
        value={valuePrimary}
        onRedirectClick={redirectHandler}
        textQuestionTip={textQuestionTip}
        textRedirectTip={textRedirectTip}
        onChange={onChangePrimary}/>
        <InputWCS
          id={id}
          classes={classes}
          className={cx(classes.secondaryInput, classNameSecondary)}
          validator={validatorSecondary}
          value={valueSecondary}
          label={labelSecondary}
          onChange={onChangeSecondary}/>
    </div>
  );
};

PairedInputWCS.propTypes = {
  classes: PropTypes.object.isRequired,
};

PairedInputWCS.propTypes = {
  id: PropTypes.string,
  labelPrimary: PropTypes.string,
  valuePrimary: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  validatorPrimary: PropTypes.func,
  labelSecondary: PropTypes.string,
  valueSecondary: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  validatorSecondary: PropTypes.func,
  isRedirect: PropTypes.bool,
  redirectHandler: PropTypes.func,
  isQuestion: PropTypes.bool,
  textQuestionTip: PropTypes.string,
  textRedirectTip: PropTypes.string,
  classes: PropTypes.object,
  onChangePrimary: PropTypes.func,
  onChangeSecondary: PropTypes.func,
  classNamePrimary: PropTypes.object,
  classNameSecondary: PropTypes.object,
};


export default withStyles(styles)(PairedInputWCS);
