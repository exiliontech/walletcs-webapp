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
import IconWCS from './IconWCS'
import TextIconWCS from "./TextIconWCS";

const TabContainer = (props) => {
  return (
      <Typography
          component="div" style={{ padding: 8 * 3 }}
          className={props.className}>
        {props.children}
      </Typography>
  );
};

const Index = ({className, ...props}) => {
  const {classes} = props;
  const [currentCurrency, setCurrency] = useState(0);
  
  const handleChange = (e, value) => {
    setCurrency({value})
  };
  
  return (
      <>
        <div className={classes.container}>
          <AppBar position="static" color="default" className={classes.appBar}>
            <div className={classes.logo}>
              <IconWCS className={classes.wallet}/>
              <TextIconWCS className={classes.textWallet}/>
            </div>
            <div className={classes.menu}>
              <div className={classes.root}>
                <Tabs
                    value={0}
                    onChange={handleChange}
                    classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }}
                >
                  <Tab
                      disableRipple
                      classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                      label="ETH"
                  />
                  <Tab
                      disableRipple
                      classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                      label="BTC"
                  />
                </Tabs>
              </div>
              <div className={classes.secondary}>
                <Link to="/ether/contract/single"
                      style={{ textDecoration: 'none' }}
                      className={classes.link}>
                  <TabContainer>
                  Smart Contract Single Transaction
                </TabContainer></Link>
              <Link to="/ether/contract/batch"
                    style={{ textDecoration: 'none' }}
                    className={classes.link}>
                <TabContainer>
                  Smart Contract Batch
              </TabContainer></Link>
                <Link to="/ether/broadcast"
                      style={{ textDecoration: 'none' }}
                      className={classes.link}>
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
