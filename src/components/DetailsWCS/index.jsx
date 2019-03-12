import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { withStyles } from "@material-ui/core/styles";
import {CircularProgress, Typography} from '@material-ui/core';

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
  },
  progress: {
    alignSelf: 'center',
    marginTop: 20
  }
});

const DetailsWCS = ({className, ...props}) => {
  const {classes} = props;
  const detail = (props.isLoading ?
      <CircularProgress className={classes.progress}/>
      :
      <div
          className={cx(
              classes.contentContainer,
              props.classNameContent
          )}>
        {props.details.map((value) => {
          return (
              <div>
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
              </div>)
        })}
      </div>);
  
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
