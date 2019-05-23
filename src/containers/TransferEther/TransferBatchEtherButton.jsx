/* eslint-disable radix */
/* eslint-disable array-callback-return */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ButtonWCS from '../../components/ButtonWCS';

import { styles } from './styles';

const TransferSigleEtherButtons = ({ className, ...props }) => {
  const {
    classes, stateMethod, dispatchContract, onCancel, stateContract,
  } = props;
  const {
    dispatchMethod,
  } = props;

  return (
    <div className={classes.containerButtons}>
      <ButtonWCS
          className={classes.button}
          disabled={!(stateMethod.methodParams.filter(val => val.value !== null).length === 6)}
          onClick={(e) => {
            let params = stateMethod.methodParams;
            if (stateContract.table.length) {
              params = params.map((val) => {
                if (val.name === 'nonce') {
                  val.value = (parseInt(val.value) + stateContract.table.length);
                }
                return val;
              });
            }
            dispatchContract(
              {
                type: 'add_to_table',
                payload: { params },
              },
            );
            dispatchContract({ type: 'reset_data' });
            dispatchMethod({ type: 'reset_data' });
            props.onCancel(e);
          }}>
        Save
      </ButtonWCS>
      <ButtonWCS
          className={classes.button}
          onClick={(e) => {
            dispatchContract({ type: 'reset_data' });
            dispatchMethod({ type: 'reset_data' });
            props.onCancel(e);
          }}>
        Cancel
      </ButtonWCS>
    </div>
  );
};

TransferSigleEtherButtons.propTypes = {
  classes: PropTypes.object.isRequired,
  stateMethod: PropTypes.object.isRequired,
  dispatchContract: PropTypes.object.isRequired,
  dispatchMethod: PropTypes.func.isRequired,
  onCancel: PropTypes.object.isRequired,
};

export default withStyles(styles)(TransferSigleEtherButtons);
