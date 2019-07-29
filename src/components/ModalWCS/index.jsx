import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';


const styles = theme => ({
  paper: {
    position: 'absolute',
    width: 670,
    height: 567,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
  },
  detailsWrapper: {
    width: 670,
  },
  modalTitle: {
    paddingBottom: 26,
    color: theme.palette.primary.main,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  closeButton: {
    position: 'absolute',
    color: theme.palette.primary.main,
    right: theme.spacing.unit,
    top: theme.spacing.unit,
  },
  contractAddressTitle: {
    color: '#828282',
    marginLeft: 20,
  },
  contractAddress: {
    marginLeft: 20,
  },
});

const ModalWCS = ({ className, ...props }) => {
  const {
    classes, data, isOpen, onClose,
  } = props;

  const getModalStyle = () => {
    const top = 50;
    const left = 50;

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  };
  return (
      <div>
        <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={isOpen}
            onClose={onClose}
        >
          {data ? <div style={getModalStyle()} className={classes.paper}>
            <Typography variant="h6" className={classes.modalTitle}>
              {data.header}
              <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
                <CloseIcon />
              </IconButton>
            </Typography>
            {data.details.contractAddress
              ? <>
                  <Typography className={classes.contractAddressTitle}>
                    Contract Address
                  </Typography>
                  <Typography variant="subtitle1"
                              className={classes.contractAddress}>
                    {data.details.contractAddress}
                  </Typography>
                </>
              : ''}
            {data.details ? data.details.details.map(val => (
                 <React.Fragment>
                   <Typography className={classes.contractAddressTitle}>
                     {val.key}
                   </Typography>
                   <Typography variant="subtitle1" className={classes.contractAddress}>
                     {val.value}</Typography>
                 </React.Fragment>)) : '' }
            <ModalWrappedWCS />
          </div> : '' }
        </Modal>
      </div>
  );
};

ModalWCS.propTypes = {
  classes: PropTypes.object.isRequired,
};

const ModalWrappedWCS = withStyles(styles)(ModalWCS);

export default ModalWrappedWCS;
