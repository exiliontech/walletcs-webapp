import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { withStyles } from "@material-ui/core/styles";
import {CircularProgress, Typography, Paper} from '@material-ui/core';

const styles = theme => ({
  detailsContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    boxShadow: 'none',
  },
  detailsHeader: {
    color: '#04AA42',
    display: 'flex',
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 44,
  },
  key: {
    marginTop: 10,
    color: '#6E7782',
    fontSize: 16,
    textAlign: 'left'
  },
  value: {
    color: '#04AA42',
    fontSize: 32,
    textAlign: 'left',
    wordWrap: 'break-word',
    marginRight: 20
  },
  contentContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    flexFlow: 'wrap',
    maxWidth: 348,
    paddingLeft: 112,
    '& div':{
      minWidth: 348,
      minHeight: 164,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      paddingLeft: 44,
      boxShadow: 'none',
    },
  },
  progress: {
    alignSelf: 'center',
    marginTop: 20
  }
});

const DetailsWCS = ({className, ...props}) => {
  const {classes} = props;
  const detail =
      <div
          className={cx(
              classes.contentContainer,
              props.classNameContent
          )}>
        {props.details.map((value) => {
          return (
              <Paper>
                <Typography
                    className={classes.key}
                    key={value.key}>
                  {value.key}
                </Typography>
                <Typography
                    className={classes.value}
                    key={value.value.toString()}>
                  {typeof value.value === 'object' ? value.value.toNumber(): value.value}
                </Typography>
              </Paper>)
        })}
      </div>;
  
  return (
      <div className={cx(
          classes.detailsContainer,
          className
      )}>
        <Typography
            className={classes.detailsHeader}
            key="details-header">
          {props.header}
        </Typography>
        {detail}
      </div>
  )
};

DetailsWCS.propTypes = {
  details: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  header: PropTypes.object,
  isLoading: PropTypes.bool,
  
};

export default withStyles(styles)(DetailsWCS);
