import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles";
import Table from '@material-ui/core/Table';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CancelIcon from './CancelIcon';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root:{
    width: 467,
    display: 'flex',
    alignSelf: 'center'
    },
  table:{
    width: 467,
    },
  tableRow:{
    padding: 5
  },
  tableCell:{
    padding: 10,
    paddingRight: 5,
    '&:last-child': {
      paddingRight: 0
    }
  },
  close:{
    padding: 5
      },
  icon: {
    fontSize: 15,
    color: theme.palette.primary.main
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  }
});

const TableWCS = ({className, ...props}) => {
  const {classes, rows, headers, isDelete} = props;
  
  const onDelete = (e) => {
  
  };
  
  return (
      <>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead >
              <TableRow className={classes.tableRow}>
                {headers.map((val) => {
                  return  <TableCell className={classes.tableCell} style={{fontWeight: 'bold'}}>{val}</TableCell>
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                  <TableRow key={row.id}>
                    <TableCell className={classes.tableCell}>{row.contract}</TableCell>
                    <TableCell className={classes.tableCell}>{row.method}
                      {isDelete? (<IconButton
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        className={classes.close}
                        onClick={onDelete}>
                        <CancelIcon className={classes.icon} />
                        </IconButton>): ''}
                    </TableCell>
                  </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </>
  )
};

TableWCS.propTypes = {
  classes: PropTypes.object.isRequired,
  headers: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
};

export default withStyles(styles)(TableWCS);
