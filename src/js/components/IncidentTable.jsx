import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const IncidentTable = props => (
  <Paper
    style={{
      maxWidth: '80%',
      maxHeight: '400px',
      overflowX: 'auto',
      marginBottom: 20,
      marginTop: 'auto',
    }}
  >
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Reason</TableCell>
          <TableCell>Nearby Streets</TableCell>
          <TableCell>Date</TableCell>
        </TableRow>
      </TableHead>
      {props.incidents && (
        <TableBody>
          {props.incidents.map(row => {
            return (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.type}
                </TableCell>
                <TableCell>{row.street}</TableCell>
                <TableCell>{row.date}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      )}
    </Table>
  </Paper>
);

export default IncidentTable;
