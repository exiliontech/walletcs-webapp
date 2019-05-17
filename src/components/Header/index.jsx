import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {styles} from './styles'
import TextIconWCS from './TextIconWCS';
import BitcoinHeader from './BitcoinHeader';
import EtherHeader from './EtherHeader';

const Index = ({className, ...props}) => {
  const {classes, links} = props;
  
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
                      value={props.currentCurrency === 'ether' ? 0 : 1}
                      classes={{ root: classes.tabRoot, indicator: classes.tabsIndicator }}>
                    <Tab
                        disableRipple
                        classes={{ root: classes.tabRoot, selected: classes.tabSelected, labelContainer: classes.primaryLabel}}
                        label="ETH - Ethereum"
                        onClick={e => props.handleCurrency('ether')}/>
                    <Tab
                        disableRipple
                        classes={{ root: classes.tabRoot, selected: classes.tabSelected, labelContainer: classes.primaryLabel }}
                        label="BTC - Bitcoin"
                        onClick={e => {props.handleCurrency('bitcoin')}}/>
                  </Tabs>
                </div>
              </div>
              <div className={classes.secondary}>
              {props.currentCurrency === 'ether' ? <EtherHeader links={links}/> : <BitcoinHeader links={links}/>}
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
