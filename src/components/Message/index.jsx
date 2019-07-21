/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  textMessage: {
    fontWeight: 'thin',
    fontSize: '14px',
    textAlign: 'center',
    color: '#9198A0',
  },
  linkMessage: {
    color: '#9198A0',
  },
});

const Message = (props) => {
  const { classes, networkName, link } = props;

  return (
        <div>
            <p className={classes.textMessage}>IMPORTANT: This operation is performed on the {networkName} network.
            <a className={classes.linkMessage} href={link}><br/>Click here for the main network</a></p>
        </div>
  );
};

export default withStyles(styles)(Message);

Message.propTypes = {
  networkName: PropTypes.string,
  link: PropTypes.string,
};
