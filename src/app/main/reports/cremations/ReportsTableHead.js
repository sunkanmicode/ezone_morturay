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
    id: 'deceased-full-name',
    align: 'left',
    disablePadding: false,
    label: 'Deceased full name',
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
    id: 'date-of-death',
    align: 'left',
    disablePadding: false,
    label: 'Date of death',
    sort: true,
  },
  {
    id: 'date-of-cremation',
    align: 'left',
    disablePadding: false,
    label: 'Date of cremation',
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
