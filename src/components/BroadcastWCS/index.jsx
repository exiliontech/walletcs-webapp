import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import cx from 'classnames';
import PropTypes from 'prop-types';

import UploadCloudIcon from '@material-ui/icons/CloudUpload';
import { IconButton, InputAdornment, Button } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import ContentCardWCS from '../../components/ContentCardWCS';
import InputWCS from '../../components/InputWCS';
import ModalWrappedWCS from '../../components/ModalWCS';
import TableWCS from '../../components/TableWCS';
import ButtonWCS from '../../components/ButtonWCS';
import CurrencyViewer from '../../utils';


const styles = theme => ({
  uploadIcon: {
    color: 'rgb(145, 152, 160) !important',
    '& path': {
      '&:hover': {
        fill: 'black !important',
      },
    },
  },
});

const BroadcastWCS = ({ className, ...props }) => {
  const {
    classes, parentState, onOpenModal, onAttachFile, onDelete,
  } = props;
  const {
    onCloseModal, onBroadcast, isBroadcasted, currency,
  } = props;
  const { parentDispatch } = props;
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const filterVisibleMessages = (table, message) => {
    if (table) {
      table.map((value) => {
        if (message.hash === value.transaction_id
          || message.error_details === value.error_details) {
          value.isVisible = false;
        }
        return value;
      });
    }
    return table;
  };

  const action = (key, val) => (
      <React.Fragment>
        {val.success
          ? <Button
            color="primary"
            onClick={() => { CurrencyViewer[currency].redirect(val.transaction_id); }}>
          {'Click to see'}
        </Button> : '' }
        <Button
          color="primary"
          onClick={() => {
            parentDispatch({ type: 'set_show_result', payload: filterVisibleMessages(parentState.resultsBroadcastTable, val) });
            closeSnackbar(key);
          }}>
          {'Dismiss'}
        </Button>
      </React.Fragment>
  );

  const showVisibleMessage = () => {
    parentState.resultsBroadcastTable.filter(v => v.isVisible).map((val) => {
      if (val.isVisible) {
        const message = val.success
          ? `Successfully broadcasted. Tx: ${val.hash.slice(0, 10)}...`
          : val.error_details;
        enqueueSnackbar(message,
          {
            variant: val.success
              ? 'success'
              : 'error',
            action: key => action(key, val),
          });
      }
    });
  };

  return (
      <React.Fragment>
        <ContentCardWCS
            className={cx(
              classes.content,
              className,
            )} key="broadcastTransaction">
          <div className={classes.inputContainer}>
            <InputWCS
                key="loadFiles"
                className={classes.input}
                label={parentState.filename ? '' : 'Load Transactions File'}
                value={parentState.filename}
                disabled={true}
                InputProps={{
                  endAdornment: (
                      <InputAdornment position="end">
                        <IconButton htmlFor="input-file-download" component="label">
                          <UploadCloudIcon className={classes.uploadIcon}/>
                          <input
                              id="input-file-download"
                              type="file"
                              style={{ display: 'none' }}
                              onChange={onAttachFile} />
                        </IconButton>
                      </InputAdornment>
                  ),
                }}/>
           <div className={classes.containerButtons}>
            <ButtonWCS
              className={classes.button}
              disabled={!parentState.table || !parentState.table.length || isBroadcasted}
              onClick={onBroadcast}
            >
              Broadcast Transaction
            </ButtonWCS>
            </div>
            <TableWCS
                headers={['ADDRESS', 'METHOD']}
                isDelete={true}
                onDelete={onDelete}
                onClick={onOpenModal}
                rows={parentState.rows || []}/>
          </div>
        </ContentCardWCS>
        {parentState.modalIsOpen
          ? <ModalWrappedWCS
                isOpen={parentState.modalIsOpen}
                onClose={onCloseModal}
                data={{ header: 'Transaction information', details: parentState.modalData }}/> : '' }
        {parentState.resultsBroadcastTable
          ? showVisibleMessage() : ''}
      </React.Fragment>
  );
};

BroadcastWCS.propTypes = {
  classes: PropTypes.object.isRequired,
  onAttachFile: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onOpenModal: PropTypes.func.isRequired,
  onBroadcast: PropTypes.func.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  parentState: PropTypes.object.isRequired,
  parentDispatch: PropTypes.func.isRequired,
  currency: PropTypes.string,
  isBroadcasted: PropTypes.bool,
};

export default withStyles(styles)(BroadcastWCS);
