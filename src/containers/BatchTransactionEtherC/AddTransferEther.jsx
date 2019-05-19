import React from "react";
import { withStyles } from "@material-ui/core/styles";
import  TransferEtherFields from '../TransferEther/TransferEtherFields';
import  TransferBatchEtherButton from '../TransferEther/TransferBatchEtherButton.jsx';
import RedirectMainNet from '../../components/RedirectMainNet';

const styles = theme => ({
  progress: {
    position: 'absolute',
    top: '50%',
    left: '50%'
  }
});

const AddTransferEther = ({className, ...props}) => {

  return (
      <TransferEtherFields { ...props }>
        <TransferBatchEtherButton />
        <RedirectMainNet />
      </TransferEtherFields>
  )
};

export default withStyles(styles)(AddTransferEther);
