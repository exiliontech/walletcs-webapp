import React, {useState} from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import QuestionIcon from './QuestionIcon';
import { withStyles } from "@material-ui/core/styles";
import { IconButton, Tooltip } from "@material-ui/core";

const DEFAULT_SETTING = {
  root: 'root'
};

function arrowGenerator(color) {
  return {
    '&[x-placement*="bottom"] $arrow': {
      top: 0,
      left: 0,
      marginTop: '-0.95em',
      width: '3em',
      height: '1em',
      '&::before': {
        borderWidth: '0 1em 1em 1em',
        borderColor: `transparent transparent ${color} transparent`,
      },
    },
    '&[x-placement*="top"] $arrow': {
      bottom: 0,
      left: 0,
      marginBottom: '-0.95em',
      width: '3em',
      height: '1em',
      '&::before': {
        borderWidth: '1em 1em 0 1em',
        borderColor: `${color} transparent transparent transparent`,
      },
    },
    '&[x-placement*="right"] $arrow': {
      left: 0,
      marginLeft: '-0.95em',
      height: '3em',
      width: '1em',
      '&::before': {
        borderWidth: '1em 1em 1em 0',
        borderColor: `transparent ${color} transparent transparent`,
      },
    },
    '&[x-placement*="left"] $arrow': {
      right: 0,
      marginRight: '-0.95em',
      height: '3em',
      width: '1em',
      '&::before': {
        borderWidth: '1em 0 1em 1em',
        borderColor: `transparent transparent transparent ${color}`,
      },
    },
  };
}

const styles = theme => ({
  default: {
  
  },
  arrow: {
    position: 'absolute',
    fontSize: 6,
    width: '3em',
    height: '3em',
    '&::before': {
      content: '""',
      margin: 'auto',
      display: 'block',
      width: 0,
      height: 0,
      borderStyle: 'solid',
    },
  },
  bootstrapPopper: arrowGenerator(theme.palette.common.black),
  bootstrapTooltip: {
    backgroundColor: theme.palette.common.black,
    fontSize: 14,
    fontWeight: 500,
    padding: 15,
  },
  bootstrapPlacementLeft: {
    margin: '0 8px',
  },
  bootstrapPlacementRight: {
    margin: '0 8px',
  },
  bootstrapPlacementTop: {
    margin: '8px 0',
  },
  bootstrapPlacementBottom: {
    margin: '18px 0',
  },
  iconButton: {
    width: 16,
    height: 16,
    marginBottom: 16,
    '&:hover': {
      backgroundColor: '#FFFFFF'
    }
  }
});

const QuestionToolTipWCS = ({className, ...props}) => {
  const {classes} = props;
  const [arrowRef, setArrowRef] = useState(undefined);
  
  const handleArrowRef = node => {
    setArrowRef(node);
  };
  
  return (
      <Tooltip
          title={
            <React.Fragment>
              {props.text}
              <span className={classes.arrow} ref={handleArrowRef} />
            </React.Fragment>
          }
          classes={{
            tooltip: classes.bootstrapTooltip,
            popper: classes.bootstrapPopper,
            tooltipPlacementLeft: classes.bootstrapPlacementLeft,
            tooltipPlacementRight: classes.bootstrapPlacementRight,
            tooltipPlacementTop: classes.bootstrapPlacementTop,
            tooltipPlacementBottom: classes.bootstrapPlacementBottom,
          }}
          PopperProps={{
            popperOptions: {
              modifiers: {
                arrow: {
                  enabled: Boolean(arrowRef),
                  element: arrowRef,
                },
              },
            },
          }}
      >
        <IconButton aria-label="Toggle tip" className={classes.iconButton}>
          <QuestionIcon/>
        </IconButton>
      </Tooltip>
  )
};

QuestionToolTipWCS.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(QuestionToolTipWCS);
