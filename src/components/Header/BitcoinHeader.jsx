import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles";
import {Link} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import {styles} from './styles';

const TabContainer = (props) => {
  return (
      <Typography
          component="div" style={{ paddingTop: 22  }}
          className={props.className}>
        {props.children}
      </Typography>
  );
};

const BitcoinHeader = ({className, ...props}) => {
  const {classes, links} = props;

  return (
      <React.Fragment>
        <Link to={links.bitcoin_single}
              style={{ textDecoration: 'none'}}
              className={cx(classes.link, window.location.pathname === links.bitcoin_single ? classes.linkSelected: false)}>
          <TabContainer>
            Single Transaction
          </TabContainer>
        </Link>
        <Link to={links.bitcoin_batch}
              style={{ textDecoration: 'none'}}
              className={cx(classes.link, window.location.pathname === links.bitcoin_batch ? classes.linkSelected: false)}>
          <TabContainer>
            Batch Transaction
          </TabContainer>
        </Link>
        <Link to={links.bitcoin_broadcast}
              style={{ textDecoration: 'none'}}
              className={cx(classes.link, window.location.pathname === links.bitcoin_broadcast ? classes.linkSelected: false)}>
          <TabContainer>
            Broadcast Transactions
          </TabContainer>
        </Link>
      </React.Fragment>)
};

BitcoinHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  links: PropTypes.object.isRequired,
};

export default withStyles(styles)(BitcoinHeader);

