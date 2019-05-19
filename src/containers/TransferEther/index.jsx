import React from 'react';
import TransferEtherFields from './TransferEtherFields';
import TransferSingleEtherButton from './TransferSingleEtherButton';
import RedirectMainNet from '../../components/RedirectMainNet';

const TransferEther = props => {
    return (
        <TransferEtherFields {...props}>
            <TransferSingleEtherButton />
            <RedirectMainNet />
        </TransferEtherFields>
    )
}


export default TransferEther;