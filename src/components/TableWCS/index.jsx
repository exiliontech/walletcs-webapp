import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import IconButton from '@material-ui/core/IconButton';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CancelIcon from './CancelIcon';

const styles = theme => ({
  root: {
    width: 624,
    display: 'flex',
    alignSelf: 'center',
    boxShadow: 'none',
    borderRadius: 0,
    backgroundColor: '#F2F2F2 !important',
  },
  table: {
    width: 624,
  },
  tableRow: {
    padding: 5,
  },
  tableCell: {
    padding: 10,
    paddingRight: 5,
    fontWeight: 'normal !important',
    '&:last-child': {
      paddingRight: 10,
      textAlign: 'right',
    },
  },
  close: {
    padding: 5,
  },
  icon: {
    fontSize: 15,
    color: theme.palette.primary.main,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});

const TableWCS = ({ className, ...props }) => {
  const {
    classes, rows, headers, isDelete, onDelete, onClick,
  } = props;
  console.warn(rows);

  return (
      <>
        <Paper
            className={classes.root}>
          <Table
              className={classes.table}>
              {rows.length
                ? <TableHead>
                  <TableRow className={classes.tableRow}>
                  {headers.map(val => <TableCell
                        className={classes.tableCell}
                        style={{ fontWeight: 'bold' }}>{val}</TableCell>)}
                  </TableRow>
              </TableHead> : ''}
            <TableBody>
              {rows.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell
                        className={classes.tableCell}
                        onClick={() => onClick(index)}
                        style={{ cursor: 'pointer' }}>
                      <a style={ { textDecoration: 'underline' } }>{row ? row.contractAddress || row.params.filter(val => val.name.startsWith('to'))[0].value : ''}</a>
                    </TableCell>
                    <TableCell
                        align="right"
                        className={classes.tableCell}>{row ? row.methodName || 'Transfer' : ''}
                      {isDelete ? <IconButton
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        className={classes.close}
                        onClick={() => onDelete(index)}>
                        <CancelIcon className={classes.icon} />
                        </IconButton> : ''}
                    </TableCell>
                  </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </>
  );
};

TableWCS.propTypes = {
  classes: PropTypes.object.isRequired,
  headers: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  onClick: PropTypes.func,
  onDelete: PropTypes.func,
};

export default withStyles(styles)(TableWCS);
