import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core';

const styles = theme => ({
  detailsContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  },
  detailsHeader: {
    color: '#6894BC'
  },
  name: {
    color: '#828282',
    fontSize: 16
  },
  key: {
    color: '#4F4F4F',
    fontSize: 26
  }
});

const Details = ({className, ...props}) => {
  const {classes} = props;
  
  return (
      <div className={classes.detailsContainer}>
        <Typography className={classes.detailsHeader}>
          {props.header}
        </Typography>
        <div>
          {props.details.map((value) => {
            return (
                <div>
                  <Typography className={classes.name}>
                    {value.name}
                  </Typography>
                  <Typography className={classes.key}>
                    {value.key}
                  </Typography>
                </div>)
          })}
        </div>
      </div>
  )
};

Details.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Details);
