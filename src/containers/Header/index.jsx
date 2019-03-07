import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const DEFAULT_SETTING = {
  root: 'root'
};

const styles = theme => ({
  appBar: {
    flexGrow: 1,
    height: 138,
    backgroundColor: '#FFFFFF'
  },
  container: {
    height: 138,
  }
});

const Header = ({className, ...props}) => {
  const {classes} = props;
  
  return (
      <>
        <div className={classes.container}>
          <AppBar position="static" color="default" className={classes.appBar}>
            <Toolbar>
              <Typography variant="h6" color="inherit">
                Wallet CS
              </Typography>
            </Toolbar>
          </AppBar>
        </div>
      </>
  )
};

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);
