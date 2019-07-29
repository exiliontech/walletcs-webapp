import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Tooltip } from '@material-ui/core';

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
    margin: '0 0',
  },
});

const ToolTipWCS = ({ className, ...props }) => {
  const { classes, children } = props;
  const [arrowRef, setArrowRef] = useState(undefined);

  const handleArrowRef = (node) => {
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
          }}>
        {children}
      </Tooltip>
  );
};

ToolTipWCS.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ToolTipWCS);
