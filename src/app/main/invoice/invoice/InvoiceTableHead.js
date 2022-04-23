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
    id: 'services',
    align: 'left',
    disablePadding: false,
    label: 'Products/Services',
    sort: true,
  },
  {
    id: 'discount',
    align: 'left',
    disablePadding: false,
    label: 'Discount(%)',
    sort: true,
  },
  {
    id: 'days',
    align: 'left',
    disablePadding: false,
    label: 'Days/Qty',
    sort: true,
  },
  {
    id: 'rate',
    align: 'left',
    disablePadding: false,
    label: 'Rate',
    sort: true,
  },
  {
    id: 'total',
    align: 'right',
    disablePadding: false,
    label: 'Sub Total',
    sort: true,
  },
  {
    id: 'discounted-total',
    align: 'right',
    disablePadding: false,
    label: 'Total',
    sort: true,
  },
];

function CustomersTableHead(props) {

  return (
    <TableHead className='table-auto'>
      <TableRow className="h-24 bg-blue">
        {rows.map((row) => {
          return (
            <TableCell
              key={row.id}
              className="text-white"
              align={row.align}
              padding={row.disablePadding ? "none" : "default"}
            >
              {row.sort && (
                <Tooltip
                  title="Sort"
                  placement={
                    row.align === "right" ? "bottom-end" : "bottom-start"
                  }
                  enterDelay={300}
                >
                  <TableSortLabel>{row.label}</TableSortLabel>
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
