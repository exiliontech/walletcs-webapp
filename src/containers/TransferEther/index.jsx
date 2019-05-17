import React from 'react';
import TransferEtherFields from './TransferEtherFields';
import TransferSingleEtherButton from './TransferSingleEtherButton';

const TransferEther = props => {
    return (
        <TransferEtherFields {...props}>
            <TransferSingleEtherButton />
        </TransferEtherFields>
    )
}


export default TransferEther;