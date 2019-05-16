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

const EtherHeader = ({className, ...props}) => {
  const {classes, links} = props;

  return (
      <React.Fragment>
        <Link to={links.eth_single}
              style={{ textDecoration: 'none'}}
              className={cx(classes.link, window.location.pathname === links.eth_single ? classes.linkSelected: false)}>
          <TabContainer>
            Smart Contract Single
          </TabContainer>
        </Link>
        <Link to={links.eth_batch}
              style={{ textDecoration: 'none' }}
              className={cx(classes.link, window.location.pathname === links.eth_batch ? classes.linkSelected: false)}>
          <TabContainer>
            Smart Contract Batch
          </TabContainer>
        </Link>
        <Link to={links.eth_broadcast}
              style={{ textDecoration: 'none' }}
              className={cx(classes.link, window.location.pathname === links.eth_broadcast ? classes.linkSelected: false)}>
          <TabContainer>
            Broadcast Transaction
          </TabContainer>
        </Link>
        <Link to={links.transfer_ether}
              style={{ textDecoration: 'none' }}
              className={cx(classes.link, window.location.pathname === links.transfer_ether ? classes.linkSelected: false)}>
          <TabContainer>
            Transfer Ether
          </TabContainer>
        </Link>
      </React.Fragment>
  )
};

EtherHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  links: PropTypes.object.isRequired
};

export default withStyles(styles)(EtherHeader);
