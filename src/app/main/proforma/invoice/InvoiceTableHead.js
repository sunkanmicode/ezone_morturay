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
    id: 'description',
    align: 'left',
    disablePadding: false,
    label: 'Products/Services',
    sort: true,
  },
  {
    id: 'price',
    align: 'left',
    disablePadding: false,
    label: 'Price',
    sort: true,
  },
  {
    id: 'qty',
    align: 'left',
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
