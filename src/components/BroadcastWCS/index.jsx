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
    onCloseModal, onBroadcast, onDownloadReport, isBroadcasted, currency,
  } = props;
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

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
          onClick={() => closeSnackbar(key)}>
          {'Dismiss'}
        </Button>
      </React.Fragment>
  );

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
            <TableWCS
                headers={['ADDRESS', 'METHOD']}
                isDelete={true}
                onDelete={onDelete}
                onClick={onOpenModal}
                rows={parentState.rows || []}/>
                <div className={classes.containerButtons}>
                  <ButtonWCS
                      className={classes.button}
                      disabled={!parentState.table.length || isBroadcasted}
                      onClick={onBroadcast}>
                    Broadcast Transaction
                  </ButtonWCS>
                  {onDownloadReport
                    ? <ButtonWCS
                          className={classes.button}
                          disabled={!isBroadcasted}
                          onClick={onDownloadReport}>
                        Download Report
                      </ButtonWCS> : ''}
                </div>
          </div>
        </ContentCardWCS>
        {parentState.modalIsOpen
          ? <ModalWrappedWCS
                isOpen={parentState.modalIsOpen}
                onClose={onCloseModal}
                data={{ header: 'Transaction information', details: parentState.modalData }}/> : '' }
        {parentState.resultsTable
          ? parentState.resultsTable.map(
            (val) => {
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
            },
          ) : ''}
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
  onDownloadReport: PropTypes.func,
  currency: PropTypes.string,
  isBroadcasted: PropTypes.bool,
};

export default withStyles(styles)(BroadcastWCS);
