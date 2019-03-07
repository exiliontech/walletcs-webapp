import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { withStyles } from "@material-ui/core/styles";
import {Typography} from '@material-ui/core';

const styles = theme => ({
  detailsContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    marginTop: 57
  },
  detailsHeader: {
    color: '#6894BC',
    display: 'flex',
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 20,
  },
  key: {
    color: '#828282',
    fontSize: 16,
    textAlign: 'left'
  },
  value: {
    color: '#4F4F4F',
    fontSize: 26,
    textAlign: 'left'
  },
  contentContainer: {
    display: 'flex',
    justifyContent: 'start',
    flexFlow: 'wrap',
    '& div' : {
      marginLeft: 20,
      marginTop: 24
    }
  }
});

const DetailsWCS = ({className, ...props}) => {
  const {classes} = props;
  return (
      <div className={cx(
          classes.detailsContainer,
          className
      )}>
        <Typography className={classes.detailsHeader}>
          {props.header}
        </Typography>
        <div
            className={cx(
                classes.contentContainer,
                props.classNameContent
            )}>
          {props.details.map((value) => {
            return (
                <div>
                  <Typography className={classes.key}>
                    {value.key}
                  </Typography>
                  <Typography className={classes.value}>
                    {value.value}
                  </Typography>
                </div>)
          })}
        </div>
      </div>
  )
};

DetailsWCS.propTypes = {
  details: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  header: PropTypes.object,
  
};

export default withStyles(styles)(DetailsWCS);
