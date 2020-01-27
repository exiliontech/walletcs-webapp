import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ButtonWCS from '../../components/ButtonWCS';
import { downloadOneTransaction } from '../SingleTransactionEtherC/actionsSingleTransaction';
import { checkEtherAddress } from '../../utils';

const styles = theme => ({
  default: {

  },
});

const TransferSingleEtherButton = ({ className, ...props }) => {
  const { classes, stateMethod } = props;
  const from = stateMethod.methodParams.find(a => a.name === 'from') || {};
  const to = stateMethod.methodParams.find(a => a.name === 'to') || {};
  const isTempValid = checkEtherAddress(from.value || '') && checkEtherAddress(to.value || '');

  return (
      <div className={classes.containerButtons}>
        <ButtonWCS
          className={classes.button}
          disabled={!isTempValid || !(stateMethod.methodParams.filter(val => val.value !== null).length === 6)}
          onClick={() => { downloadOneTransaction({}, stateMethod); }}
        >
          Download Transaction
        </ButtonWCS>
      </div>
  );
};

TransferSingleEtherButton.propTypes = {
  classes: PropTypes.object.isRequired,
  dispatchMethod: PropTypes.object.isRequired,
};

export default withStyles(styles)(TransferSingleEtherButton);
