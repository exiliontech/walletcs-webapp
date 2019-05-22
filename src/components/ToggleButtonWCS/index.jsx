/* eslint-disable no-unused-expressions */
import React from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

import GlobalReducerContext from '../../contexts/GlobalReducerContext';
import Message from '../Message';

const styles = theme => ({
  toggleContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  ToggleButtonGroup: {
    borderRadius: '4px',
  },
  toggleButton: {
    borderRadius: '4px',
    height: 32,
    width: 63,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textTransform: 'capitalize',
    fontSize: 14,
  },
  toggleButtonActive: {
    borderWidth: 'none',
    color: '#FFFFFF !important',
    backgroundColor: '#04AA42 !important',
    '& span': {
      borderColor: '#04AA42 !important',
    },
  },
  toggleButtonNotActive: {
    borderColor: '#979797',
    color: '#979797',
    border: '1px solid #9198A0',
    backgroundColor: '#000000 !important',
  },
});

const ToggleButtonWCS = ({ className, ...props }) => {
  const { classes } = props;
  return (
        <div className={classes.toggleContainer}>
        <ToggleButtonGroup value={process.env.REACT_APP_ETH_NETWORK_SEND === 'rinkeby' ? 'test' : 'main'} className={classes.ToggleButtonGroup}>
          <ToggleButton
            value="main"
            className={cx(classes.toggleButton, process.env.REACT_APP_ETH_NETWORK_SEND === 'homestead' ? classes.toggleButtonActive : classes.toggleButtonNotActive) }
            onClick={() => window.open(`https://app.walletcs.com${window.location.pathname}`, '_self')}
            >
            Mainnet
          </ToggleButton>
          <ToggleButton
            value="test"
            className={cx(classes.toggleButton, process.env.REACT_APP_ETH_NETWORK_SEND === 'rinkeby' ? classes.toggleButtonActive : classes.toggleButtonNotActive) }
            onClick={() => window.open(`https://testnet.walletcs.com${window.location.pathname}`, '_self')}>
            Testnet
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
  );
};

export default withStyles(styles)(ToggleButtonWCS);
