import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles";
import ButtonWCS from "../../components/ButtonWCS";

import {styles} from './styles';

const TransferSigleEtherButtons = ({className, ...props}) => {
  const { classes, stateMethod, dispatchContract, onCancel } = props;
  return (
    <div className={classes.containerButtons}>
      <ButtonWCS
          className={classes.button}
          disabled={!(stateMethod.methodParams.filter((val) => {
            return val.value !== null
          }).length === 6)}
          onClick={e => {
            dispatchContract(
                {
                  type: 'add_to_table',
                  payload: {params: stateMethod.methodParams}
                }
            );
            props.onCancel(e)
          }}>
        Save
      </ButtonWCS>
      <ButtonWCS
          className={classes.button}
          onClick={onCancel}>
        Cancel
      </ButtonWCS>
    </div>
  )
};

TransferSigleEtherButtons.propTypes = {
  classes: PropTypes.object.isRequired,
  stateMethod: PropTypes.object.isRequired,
  dispatchContract: PropTypes.object.isRequired,
  onCancel: PropTypes.object.isRequired
};

export default withStyles(styles)(TransferSigleEtherButtons);
