import React from 'react';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/es/styles';
import SvgIcon from '@material-ui/core/SvgIcon';
import PropTypes from 'prop-types';

const MENU_ICON = {
  fontSize: 'inherit',
  viewBox: '0 0 16 16',
};

const styles = theme => ({
  default: {
    width: 16,
    height: 16,
    padding: 8,
    '& path': {
      '&:hover': {
        fill: 'black !important',
      },
    },
  },
});

const QuestionIcon = ({ className, ...props }) => {
  const { classes } = props;

  return (
      <SvgIcon
          className={cx(
            classes.default,
            className,
          )}
          viewBox={MENU_ICON.viewBox}
          {...props}>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM8.99915 8.98492C8.99864 8.97941 8.99825 8.97532 8.99929 8.97163C9.00229 8.96094 9.01723 8.95361 9.07542 8.92504C9.11276 8.90671 9.1679 8.87965 9.24911 8.83735C9.35158 8.78437 9.41371 8.75211 9.47222 8.72077C10.4683 8.18717 11 7.45921 11 6.14286C11 4.42193 9.67286 3 8 3C6.38377 3 5 4.0241 5 5.5C5 6.05228 5.44772 6.5 6 6.5C6.55228 6.5 7 6.05228 7 5.5C7 5.28145 7.38029 5 8 5C8.53628 5 9 5.49685 9 6.14286C9 6.64198 8.92458 6.74523 8.52778 6.95781C8.48255 6.98204 8.43413 7.00718 8.32524 7.06352C7.44966 7.51956 7 8.0135 7 9C7 9.55229 7.44772 10 8 10C8.55229 10 9 9.55229 9 9C9 8.99391 8.99954 8.98902 8.99915 8.98492ZM9 12C9 12.5523 8.55229 13 8 13C7.44772 13 7 12.5523 7 12C7 11.4477 7.44772 11 8 11C8.55229 11 9 11.4477 9 12Z" fill="#9198A0"/>
      </SvgIcon>
  );
};

QuestionIcon.porpTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(QuestionIcon);
