import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { styles } from './styles';
import TextIconWCS from './TextIconWCS';
import BitcoinHeader from './BitcoinHeader';
import EtherHeader from './EtherHeader';
import ToggleButtonWCS from '../ToggleButtonWCS';

const Index = ({ className, ...props }) => {
  const { classes, links } = props;

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
                      value={props.currentCurrency}
                      classes={{ root: classes.tabRoot, indicator: classes.tabsIndicator }}>
                    <Tab
                        value='ether'
                        disableRipple
                        classes={{ root: classes.tabRoot, selected: classes.tabSelected, labelContainer: classes.primaryLabel }}
                        label="ETH - Ethereum"
                        onClick={() => props.handleCurrency('ether')}/>
                    <Tab
                        value='bitcoin'
                        disableRipple
                        classes={{ root: classes.tabRoot, selected: classes.tabSelected, labelContainer: classes.primaryLabel }}
                        label="BTC - Bitcoin"
                        onClick={() => props.handleCurrency('bitcoin')}/>
                  </Tabs>
                  <div className={classes.rightPartHeader}>
                  <Tab
                        value='support'
                        disableRipple
                        classes={{ root: classes.tabRoot, selected: classes.tabSelected, labelContainer: classes.primaryLabel }}
                        label="Support"
                        onClick={() => window.open('https://github.com/ExilionTechnologies/walletcs-app/blob/master/README.md#getting-support', '_blank')}/>
                      <ToggleButtonWCS />
                  </div>
                </div>
              </div>
              <div className={classes.secondary}>
              {props.currentCurrency === 'ether' ? <EtherHeader links={links}/> : <BitcoinHeader links={links}/>}
              </div>
            </div>
          </AppBar>
        </div>
      </>
  );
};

Index.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Index);
