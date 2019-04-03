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
  const [linkActive, setLinkActive] = useState(0);
  
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
                <Link to="/ether/contract/single"
                      style={{ textDecoration: 'none'}}
                      className={cx(classes.link, linkActive === 0 ? classes.linkSelected: false)}
                      onClick={e => handleChangeLink(e, 0)}>
                  <TabContainer>
                  Smart Contract Single
                </TabContainer></Link>
              <Link to="/ether/contract/batch"
                    style={{ textDecoration: 'none' }}
                    className={cx(classes.link,  linkActive === 1 ? classes.linkSelected: false)}
                    onClick={e => handleChangeLink(e, 1)}>
                <TabContainer>
                  Smart Contract Batch
              </TabContainer></Link>
                <Link to="/ether/broadcast"
                      style={{ textDecoration: 'none' }}
                      className={cx(classes.link,  linkActive === 2 ? classes.linkSelected: false)}
                      onClick={e => handleChangeLink(e, 2)}>
                  <TabContainer>
                  Broadcast Transaction
                </TabContainer></Link>
                {/*<TabContainer*/}
                    {/*className={classes.link}>*/}
                  {/*ETH Transfer Batch*/}
                {/*</TabContainer>*/}
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
