import React, { useContext } from 'react';
import { withStyles } from '@material-ui/core/styles';
import cx from 'classnames';
import PropTypes from 'prop-types';

import UploadCloudIcon from '@material-ui/icons/CloudUpload';
import { IconButton, InputAdornment } from '@material-ui/core';
import ContentCardWCS from '../../components/ContentCardWCS';
import InputWCS from '../../components/InputWCS';
import ModalWrappedWCS from '../../components/ModalWCS';
import TableWCS from '../../components/TableWCS';
import ButtonWCS from '../../components/ButtonWCS';
import SnackbarWCS from '../../components/SnackbarWCS';
import GlobalReducerContext from '../../contexts/GlobalReducerContext';
import RedirectMainNet from '../../components/RedirectMainNet';


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
  const { stateGlobal, dispatchGlobal } = useContext(GlobalReducerContext);
  const {
    classes, parentState, onOpenModal, onAttachFile, onDelete,
  } = props;
  const { onCloseModal, onBroadcast } = props;

  const clearError = () => {
    dispatchGlobal({ type: 'set_global_error', payload: null });
  };

  const clearSuccess = () => {
    dispatchGlobal({ type: 'set_global_success', payload: null });
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
            <TableWCS
                headers={['CONTRACT', 'METHOD']}
                isDelete={true}
                onDelete={onDelete}
                onClick={onOpenModal}
                rows={parentState.rows || []}/>
            <ButtonWCS
                className={classes.button}
                disabled={!parentState.table.length || parentState.success}
                onClick={onBroadcast}>
              Broadcast Transaction
            </ButtonWCS>
            <RedirectMainNet />
          </div>
        </ContentCardWCS>
        {stateGlobal.error
          ? <SnackbarWCS
                key="LoadTransactionError"
                message={stateGlobal.error}
                variant='error'
                isOpen={true}
                onExited={clearError}
                onClose={clearError}/> : ''}

        {stateGlobal.success
          ? <SnackbarWCS
                key="LoadTransactionSuccess"
                message={stateGlobal.success}
                variant='success'
                isOpen={true}
                onExited={clearSuccess}
                onClose={clearSuccess}/> : ''}

        {parentState.modalIsOpen
          ? <ModalWrappedWCS
                isOpen={parentState.modalIsOpen}
                onClose={onCloseModal}
                data={{ header: 'Transaction information', details: parentState.modalData }}/> : '' }
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
};

export default withStyles(styles)(BroadcastWCS);
