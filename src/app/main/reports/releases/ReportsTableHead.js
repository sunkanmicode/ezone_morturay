import React from 'react';
import {
  TableHead,
  TableSortLabel,
  TableCell,
  TableRow,
  Tooltip,
} from '@material-ui/core';

const rows = [
  {
    id: 'name-of-deceased',
    align: 'left',
    disablePadding: false,
    label: 'Deceased name',
    sort: true,
  },
  {
    id: 'age',
    align: 'left',
    disablePadding: false,
    label: 'Age',
    sort: true,
  },
  {
    id: 'gender',
    align: 'left',
    disablePadding: false,
    label: 'Gender',
    sort: true,
  },
  {
    id: 'place-of-death',
    align: 'left',
    disablePadding: false,
    label: 'Place of death',
    sort: true,
  },
  {
    id: 'destinationOfCorpse',
    align: 'left',
    disablePadding: false,
    label: 'Corpse destination',
    sort: true,
  },
  {
    id: 'death-certified-by',
    align: 'left',
    disablePadding: false,
    label: 'Death certified by',
    sort: true,
  },
  {
    id: 'dateAdmitted',
    align: 'left',
    disablePadding: false,
    label: 'Date admitted',
    sort: true,
  },
  {
    id: 'discharged',
    align: 'left',
    disablePadding: false,
    label: 'Date discharged',
    sort: true,
  },
];

function CustomersTableHead(props) {
  const createSortHandler = (property) => (event) => {
    props.onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow className='h-64'>
        {rows.map((row) => {
          return (
            <TableCell
              className='whitespace-no-wrap'
              key={row.id}
              align={row.align}
              padding={row.disablePadding ? 'none' : 'default'}
              sortDirection={
                props.order.id === row.id ? props.order.direction : false
              }
            >
              {row.sort && (
                <Tooltip
                  title='Sort'
                  placement={
                    row.align === 'right' ? 'bottom-end' : 'bottom-start'
                  }
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={props.order.id === row.id}
                    direction={props.order.direction}
                    onClick={createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              )}
            </TableCell>
          );
        }, this)}
      </TableRow>
    </TableHead>
  );
}

export default CustomersTableHead;
