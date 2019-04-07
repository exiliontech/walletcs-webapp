import React, {useState} from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from "@material-ui/core/Typography";
import {Link, Route, Switch} from 'react-router-dom';
import {styles} from './styles'
import TextIconWCS from './TextIconWCS';

const LINKS = {
  eth_single: "/ether/contract/single",
  eth_batch: "/ether/contract/batch",
  broadcast: "/ether/broadcast",
  transfer_ether: "/ether/transfer"
};

const TabContainer = (props) => {
  return (
      <Typography
          component="div" style={{ paddingTop: 22  }}
          className={props.className}>
        {props.children}
      </Typography>
  );
};

const Index = ({className, ...props}) => {
  const {classes} = props;
  const [currentCurrency, setCurrency] = useState(0);
  const [linkActive, setLinkActive] = useState('');
  
  const handleChangeCurrency = (e, value) => {
    setCurrency({value})
  };
  
  const handleChangeLink = (e, value) => {
    setLinkActive(value);
  };
  
  return (
      <>
        <div className={classes.container}>
          <AppBar position="static" color="default" className={classes.appBar}>
            <div className={classes.menu}>
              <div className={classes.root}>
                <div className={classes.rowHeader}>
                  <div className={classes.logo}>
                    {/*<IconWCS className={classes.wallet}/>*/}
                    <TextIconWCS className={classes.textWallet}/>
                  </div>
                  <Tabs
                      value={0}
                      classes={{ root: classes.tabRoot, indicator: classes.tabsIndicator }}>
                    <Tab
                        disableRipple
                        classes={{ root: classes.tabRoot, selected: classes.tabSelected, labelContainer: classes.primaryLabel}}
                        label="ETH - Ethereum"
                        onClick={e => handleChangeCurrency(e, 0)}
                    />
                    <Tab
                        disableRipple
                        classes={{ root: classes.tabRoot, selected: classes.tabSelected, labelContainer: classes.primaryLabel }}
                        label="BTC - Bitcoin"
                        onClick={e => handleChangeCurrency(e, 1)}
                    />
                  </Tabs>
                </div>
              </div>
              <div className={classes.secondary}>
                <Link to={LINKS.eth_single}
                      style={{ textDecoration: 'none'}}
                      className={cx(classes.link, window.location.pathname === LINKS.eth_single ? classes.linkSelected: false)}>
                  <TabContainer>
                  Smart Contract Single
                </TabContainer></Link>
              <Link to={LINKS.eth_batch}
                    style={{ textDecoration: 'none' }}
                    className={cx(classes.link, window.location.pathname === LINKS.eth_batch ? classes.linkSelected: false)}>
                <TabContainer>
                  Smart Contract Batch
              </TabContainer></Link>
                <Link to={LINKS.broadcast}
                      style={{ textDecoration: 'none' }}
                      className={cx(classes.link, window.location.pathname === LINKS.broadcast ? classes.linkSelected: false)}>
                  <TabContainer>
                  Broadcast Transaction
                </TabContainer></Link>
                <Link to={LINKS.transfer_ether}
                      style={{ textDecoration: 'none' }}
                      className={cx(classes.link, window.location.pathname === LINKS.transfer_ether ? classes.linkSelected: false)}>
                  <TabContainer>
                    Transfer Ethereum
                  </TabContainer></Link>
              </div>
            </div>
          </AppBar>
        </div>
      </>
  )
};

Index.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Index);
