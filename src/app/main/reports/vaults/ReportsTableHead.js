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
    id: 'deceased',
    align: 'left',
    disablePadding: false,
    label: 'Deceased',
    sort: true,
  },
  {
    id: 'vault-number',
    align: 'left',
    disablePadding: false,
    label: 'Vault number',
    sort: true,
  },
  {
    id: 'vault-type',
    align: 'left',
    disablePadding: false,
    label: 'Vault type',
    sort: true,
  },
  {
    id: 'purchaser-one',
    align: 'left',
    disablePadding: false,
    label: 'Purchaser one',
    sort: true,
  },
  {
    id: 'purchaser-two',
    align: 'left',
    disablePadding: false,
    label: 'Purchaser two',
    sort: true,
  },
  {
    id: 'branch',
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
