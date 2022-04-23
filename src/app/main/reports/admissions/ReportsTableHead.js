import React from "react";
import {
  TableHead,
  TableSortLabel,
  TableCell,
  TableRow,
  Tooltip,
} from "@material-ui/core";

const rows = [
  {
    id: "form-number",
    align: "left",
    disablePadding: false,
    label: "Form number",
    sort: true,
  },
  {
    id: "deceased-name",
    align: "left",
    disablePadding: false,
    label: "Deceased name",
    sort: true,
  },
  {
    id: "deceased-age",
    align: "left",
    disablePadding: false,
    label: "Deceased age",
    sort: true,
  },
  {
    id: "deceased-gender",
    align: "left",
    disablePadding: false,
    label: "Deceased gender",
    sort: true,
  },
  {
    id: "customer-name",
    align: "left",
    disablePadding: false,
    label: "Customer name",
    sort: true,
  },
  {
    id: "branch",
    align: "left",
    disablePadding: false,
    label: "Branch",
    sort: true,
  },
  {
    id: "admission -date",
    align: "left",
    disablePadding: false,
    label: "Admission Date",
    sort: false,
  },
];

function CustomersTableHead(props) {
  const createSortHandler = (property) => (event) => {
    props.onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow className="h-64">
        {rows.map((row) => {
          return (
            <TableCell
              className="whitespace-no-wrap"
              key={row.id}
              align={row.align}
              padding={row.disablePadding ? "none" : "default"}
              sortDirection={
                props.order.id === row.id ? props.order.direction : false
              }
            >
              {row.sort ? (
                <Tooltip
                  title="Sort"
                  placement={
                    row.align === "right" ? "bottom-end" : "bottom-start"
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
              ) : (
                <TableSortLabel
                  active={props.order.id === row.id}
                  direction={props.order.direction}
                  onClick={createSortHandler(row.id)}
                >
                  {row.label}
                </TableSortLabel>
              )}
            </TableCell>
          );
        }, this)}
      </TableRow>
    </TableHead>
  );
}

export default CustomersTableHead;
