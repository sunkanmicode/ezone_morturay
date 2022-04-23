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
    id: 'voucher-number',
    align: 'left',
    disablePadding: false,
    label: 'Voucher number',
    sort: true,
  },
  {
    id: 'family-name',
    align: 'left',
    disablePadding: false,
    label: 'Family name',
    sort: true,
  },
  {
    id: 'funeral-coordinator',
    align: 'left',
    disablePadding: false,
    label: 'Funeral coordinator',
    sort: true,
  },
  {
    id: 'funeral-location',
    align: 'left',
    disablePadding: false,
    label: 'Funeral-location',
    sort: true,
  },
  {
    id: 'initiator',
    align: 'left',
    disablePadding: false,
    label: 'Initiator',
    sort: true,
  },
  {
    id: 'payee',
    align: 'left',
    disablePadding: false,
    label: 'Payee',
    sort: true,
  },
  {
    id: 'date',
    align: 'left',
    disablePadding: false,
    label: 'Date',
    sort: true,
  },
  {
    id: 'duration',
    align: 'left',
    disablePadding: false,
    label: 'Duration',
    sort: true,
  },
  {
    id: 'Branch',
    align: 'left',
    disablePadding: false,
    label: 'Branch',
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
