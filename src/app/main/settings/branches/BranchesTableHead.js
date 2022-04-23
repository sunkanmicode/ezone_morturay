import React from 'react';
import {
  Icon,
  TableHead,
  TableSortLabel,
  TableCell,
  TableRow,
  Tooltip,
} from '@material-ui/core';

const rows = [
  {
    id: 'name',
    align: 'left',
    disablePadding: false,
    label: 'Name',
    sort: true,
  },
  {
    id: 'description',
    align: 'left',
    disablePadding: false,
    label: 'Description',
    sort: true,
  },
  {
    id: 'address',
    align: 'left',
    disablePadding: false,
    label: 'Address',
    sort: true,
  },
  {
    id: 'edit',
    align: 'left',
    disablePadding: false,
    label: <Icon>edit</Icon>,
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
