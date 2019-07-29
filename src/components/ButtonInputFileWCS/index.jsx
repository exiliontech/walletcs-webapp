import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  chooseFileInput: {
    width: '0.1px',
    height: '0.1px',
    opacity: 0,
    overflow: 'hidden',
    position: 'absolute',
    zIndex: '-1',
    '&+label': {
      fontSize: '0.875rem',
      textTransform: 'uppercase',
      color: '#26CD58',
      cursor: 'pointer',
      marginTop: 10,
      '&:hover': {
        cursor: 'pointer',
      },
    },
    '&:disabled+label': {
      '&:hover': {
        cursor: 'default',
      },
      color: 'rgba(0, 0, 0, 0.26)',
    },
  },
  chooseFileWrapper: {
    marginTop: 7,
    marginLeft: 185,
  },
});

const ButtonInputFile = ({ className, ...props }) => {
  const { classes, onAttachFile, accept, disabled } = props;
  return (
      <div className={classes.chooseFileWrapper}>
        <input className={classes.chooseFileInput}
               type="file"
               accept={accept}
               id="file"
               name="file"
               onChange={onAttachFile}
               disabled={disabled}/>
        <label htmlFor="file">{props.children}</label>
      </div>
  );
};

ButtonInputFile.propTypes = {
  classes: PropTypes.object.isRequired,
  onAttachFile: PropTypes.object.isRequired,
  accept: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

export default withStyles(styles)(ButtonInputFile);
