import React from 'react'
import { TableRow, TableCell } from "@material-ui/core"
import { Skeleton } from "@material-ui/lab"

function TableRowSkeleton() {
    return (
        <TableRow className="h-64 cursor-pointer">
            <TableCell><Skeleton variant="rect" width={20} height={20} style={{margin: "0 auto"}} /></TableCell>
            <TableCell><Skeleton variant="text" width={200} /></TableCell>
            <TableCell><Skeleton variant="text" width={64} /></TableCell>
            <TableCell><Skeleton variant="text" width={150} /></TableCell>
            <TableCell><Skeleton variant="text" width={150} /></TableCell>
            <TableCell><Skeleton variant="text" width={150} /></TableCell>
        </TableRow>
    )
}

export default TableRowSkeleton
