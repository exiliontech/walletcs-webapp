import React, {useContext} from "react";
import ContentCardWCS from "../../components/ContentCardWCS";
import InputWCS from "../../components/InputWCS";
import ModalWrappedWCS from "../../components/ModalWCS";
import TableWCS from "../../components/TableWCS";
import ButtonWCS from "../../components/ButtonWCS";
import SnackbarWCS from "../../components/SnackbarWCS";
import UploadCloudIcon from '@material-ui/icons/CloudUpload';
import {IconButton, InputAdornment} from "@material-ui/core";
import GlobalReducerContext from "../../contexts/GlobalReducerContext"
import cx from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
});

const BroadcastWCS = ({className, ...props}) => {
  const {stateGlobal, dispatchGlobal} = useContext(GlobalReducerContext);
  const {classes, parentState} = props;

  const clearError = () => {
    dispatchGlobal({type: 'set_global_error', payload: undefined})
  };
  
  const clearSuccess = () => {
    dispatchGlobal({type: 'set_global_success', payload: undefined})
  };
  
  return (
      <React.Fragment>
        <ContentCardWCS
            className={cx(
                classes.content,
                className
            )} key="broadcastTransaction">
          <div className={classes.inputContainer}>
            <InputWCS
                key="loadFiles"
                className={classes.input}
                label={parentState.filename? '': 'Load Transactions File'}
                value={parentState.filename}
                disabled={true}
                InputProps={{endAdornment: (
                      <InputAdornment position="end">
                        <IconButton  htmlFor="input-file-download" component="label">
                          <UploadCloudIcon className={classes.uploadIcon}/>
                          <input
                              id="input-file-download"
                              type="file"
                              style={{display: 'none'}}
                              onChange={props.onAttachFile} />
                        </IconButton>
                      </InputAdornment>
                  )}}/>
            <TableWCS
                headers={['CONTRACT', 'METHOD']}
                isDelete={true}
                onDelete={props.onDelete}
                onClick={props.onOpenModal}
                rows={parentState.rows || []}/>
            <ButtonWCS
                className={classes.button}
                disabled={!parentState.table.length}
                onClick={props.onBroadcast}>
              Broadcast Transaction
            </ButtonWCS>
          </div>
        </ContentCardWCS>
        {stateGlobal.error ?
            <SnackbarWCS
                key="LoadTransactionError"
                message={stateGlobal.error}
                variant='error'
                isOpen={true}
                onExited={clearError}
                onClose={clearError}/> : ''}
                
        {stateGlobal.success ?
            <SnackbarWCS
                key="LoadTransactionSuccess"
                message={stateGlobal.success}
                variant='success'
                isOpen={true}
                onExited={clearSuccess}
                onClose={clearSuccess}/> : ''}
      
        {parentState.modalIsOpen ?
            <ModalWrappedWCS
                isOpen={parentState.modalIsOpen}
                onClose={props.onCloseModal}
                data={{header: 'Transaction information', details: parentState.modalData}}/>: '' }
      </React.Fragment>
  )
};

BroadcastWCS.propTypes = {
  classes: PropTypes.object.isRequired,
  onAttachFile: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onOpenModal: PropTypes.func.isRequired,
  onBroadcast: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
  clearSuccess: PropTypes.func.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  parentState: PropTypes.object.isRequired,
};

export default withStyles(styles)(BroadcastWCS);
