import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ContentCardWCS from '../../components/ContentCardWCS';
import ButtonWCS from '../../components/ButtonWCS';
import GroupInputsSingleTxBitcoin from '../GroupInputsBitcoin';
import RedirectMainNet from '../../components/RedirectMainNet';

const styles = theme => ({
});

const AddBitcoinTransaction = ({ className, ...props }) => {
  const { classes, stateParent, dispatchParent } = props;

  return (
      <ContentCardWCS
          className={cx(
            classes.content,
            className,
          )}>
          <div className={classes.inputContainer}>
           <GroupInputsSingleTxBitcoin
               classes={classes}
               dispatch={dispatchParent}
               state={stateParent}/>
               <div className={classes.containerButtons}>
                 <ButtonWCS
                     className={classes.button}
                     disabled={!(!!stateParent.amount && !!stateParent.from_address && !!stateParent.to_address)}
                     onClick={(e) => {
                       dispatchParent(
                         {
                           type: 'add_to_table',
                           payload: {
                             params: [
                               { value: stateParent.amount, name: 'amount' },
                               { value: stateParent.from_address, name: 'from_address' },
                               { value: stateParent.to_address, name: 'to_address' },
                             ],
                           },
                         }
);
                       props.onCancel(e);
                     }}>
                   Save
                 </ButtonWCS>
                 <ButtonWCS
                     className={classes.button}
                     onClick={props.onCancel}>
                   Cancel
                 </ButtonWCS>
               </div>
               <RedirectMainNet />
          </div>
      </ContentCardWCS>
  );
};

AddBitcoinTransaction.propTypes = {
  classes: PropTypes.object.isRequired,
  stateParent: PropTypes.object.isRequired,
  dispatchParent: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddBitcoinTransaction);
