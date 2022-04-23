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
    id: 'serial-no',
    align: 'left',
    disablePadding: false,
    label: 'S/N',
    sort: true,
  },
  {
    id: 'service-type',
    align: 'left',
    disablePadding: false,
    label: 'Service type',
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
    id: 'cost',
    align: 'right',
    disablePadding: false,
    label: 'Cost',
    sort: true,
  },
  {
    id: 'qty',
    align: 'right',
    disablePadding: false,
    label: 'Qty',
    sort: true,
  },
  {
    id: 'subtotal',
    align: 'right',
    disablePadding: false,
    label: 'SubTotal',
    sort: true,
  },
];

function CustomersTableHead(props) {

  const createSortHandler = (property) => (event) => {};

  return (
    <TableHead>
      <TableRow className='h-48 bg-blue'>
        {rows.map((row) => {
          return (
            <TableCell
              key={row.id}
              className="text-white"
              align={row.align}
              padding={row.disablePadding ? 'none' : 'default'}
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
