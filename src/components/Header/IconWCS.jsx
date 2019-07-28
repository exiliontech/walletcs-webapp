import React from 'react';
import cx from 'classnames';
import {withStyles} from "@material-ui/core/es/styles";
import SvgIcon from '@material-ui/core/SvgIcon';
import PropTypes from "prop-types";


const ICON = {
  viewBox: '0 0 50 34'
};

const styles = theme => ({
  default:{
  }
});

const IconWCS =({className, ...props}) => {
  const { classes } = props;
  
  return (
      <SvgIcon
          className={cx(
              classes.default,
              className
          )}
          {...props}
          viewBox={ICON.viewBox}>
        <svg width="52" height="34" viewBox="0 0 52 34" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 5.00078V28.7545C0 31.5163 2.23893 33.7553 5.00078 33.7553H46.8823C49.6442 33.7553 51.8831 31.5163 51.8831 28.7545V5.00078C51.8831 2.23893 49.6442 0 46.8823 0H5.00078C2.23893 0 0 2.23893 0 5.00078Z" fill="#5B9BD5"/>
          <path d="M30.0049 13.752C30.0049 10.2996 32.4837 7.50098 35.5415 7.50098H49.3829V26.2539H35.5415C32.4837 26.2539 30.0049 23.4552 30.0049 20.0029V13.752Z" fill="#5B9BD5"/>
          <path d="M51.8831 7.50107H30.0047C27.5881 7.50107 25.629 9.46013 25.629 11.8768V22.5034C25.629 24.92 27.5881 26.8791 30.0047 26.8791H51.8675M51.8675 27.5042H30.0047C27.2428 27.5042 25.0039 25.2653 25.0039 22.5034V11.8768C25.0039 9.1149 27.2428 6.87598 30.0047 6.87598H51.8831" stroke="white" stroke-width="2"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M44.4633 16.8778C44.118 16.8778 43.8422 16.5965 43.8003 16.2538C43.5177 13.9458 41.6879 12.1159 39.3798 11.8333C39.0371 11.7914 38.7559 11.5156 38.7559 11.1703V10.6268C38.7559 10.2815 39.0367 9.9987 39.3805 10.0297C42.6796 10.3267 45.3069 12.954 45.6039 16.2531C45.6349 16.597 45.3521 16.8778 45.0068 16.8778H44.4633Z" fill="white"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M38.1307 11.1703C38.1307 11.5156 37.8495 11.7914 37.5068 11.8333C35.1987 12.1159 33.3688 13.9458 33.0863 16.2538C33.0443 16.5965 32.7685 16.8778 32.4233 16.8778H31.8797C31.5345 16.8778 31.2516 16.597 31.2826 16.2531C31.5797 12.954 34.2069 10.3267 37.506 10.0297C37.8499 9.9987 38.1307 10.2815 38.1307 10.6268V11.1703Z" fill="white"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M38.7559 23.2103C38.7559 22.8651 39.0371 22.5893 39.3798 22.5473C41.6879 22.2648 43.5177 20.4349 43.8003 18.1268C43.8422 17.7842 44.118 17.5029 44.4633 17.5029H45.0068C45.3521 17.5029 45.6349 17.7837 45.6039 18.1276C45.3069 21.4267 42.6796 24.0539 39.3805 24.351C39.0367 24.382 38.7559 24.0991 38.7559 23.7539V23.2103Z" fill="white"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M32.4233 17.5029C32.7685 17.5029 33.0443 17.7842 33.0863 18.1268C33.3688 20.4349 35.1987 22.2648 37.5068 22.5473C37.8495 22.5893 38.1307 22.8651 38.1307 23.2103V23.7539C38.1307 24.0991 37.8499 24.382 37.506 24.351C34.2069 24.0539 31.5797 21.4267 31.2826 18.1276C31.2516 17.7837 31.5345 17.5029 31.8797 17.5029H32.4233Z" fill="white"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M38.4433 18.7531C39.3064 18.7531 40.0061 18.0535 40.0061 17.1904C40.0061 16.3273 39.3064 15.6276 38.4433 15.6276C37.5802 15.6276 36.8806 16.3273 36.8806 17.1904C36.8806 18.0535 37.5802 18.7531 38.4433 18.7531ZM38.4433 20.0033C39.9969 20.0033 41.2562 18.7439 41.2562 17.1904C41.2562 15.6368 39.9969 14.3774 38.4433 14.3774C36.8898 14.3774 35.6304 15.6368 35.6304 17.1904C35.6304 18.7439 36.8898 20.0033 38.4433 20.0033Z" fill="white"/>
        </svg>
      </SvgIcon>
  )
};

IconWCS.porpTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IconWCS);