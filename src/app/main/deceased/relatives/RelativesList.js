import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux"
import {
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  Checkbox,
} from '@material-ui/core';
import { FuseScrollbars } from '@fuse';
import { withRouter, useRouteMatch } from 'react-router-dom';
import _ from '@lodash';
import CustomersTableHead from './RelativesTableHead';
import TableRowSkeleton from './TableRowSkeleton';
import * as Actions from '../store/actions';
import { useDispatch } from 'react-redux';

function RelativesList(props) {
  const dispatch = useDispatch();
  const relativesReducer = useSelector(({deceasedApp}) => deceasedApp.relatives);
  const relatives = relativesReducer.relatives
  const match = useRouteMatch();
  const searchText = '';

  console.log(relatives, "relatives")

  const [selected, setSelected] = useState([]);
  const [data, setData] = useState(relatives);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState({ direction: 'asc', id: null });

  useEffect(() => {
    dispatch(Actions.getDeceasedRelatives(match.params.id));
  }, [dispatch, match.params.id]);

  useEffect(() => {
    setData(
      searchText.length === 0
        ? relatives
        : _.filter(relatives, (item) =>
            item.name.toLowerCase().includes(searchText.toLowerCase())
          )
    );
  }, [relatives, searchText]);

  function handleRequestSort(event, property) {
    const id = property;
    let direction = 'desc';

    if (order.id === property && order.direction === 'desc') {
      direction = 'asc';
    }

    setOrder({ direction, id });
  }

  function handleSelectAllClick(event) {
    if (event.target.checked) {
      setSelected(data.map((n) => n.id));
      return;
    }
    setSelected([]);
  }

  function handleClick(item) {
    props.history.push('/deceased/' + match.params.id + '/relatives/' + item.id);
  }

  function handleCheck(event, id) {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  }

  function handleChangePage(event, page) {
    setPage(page);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(event.target.value);
  }

  return (
    <div className='w-full flex flex-col'>
      <FuseScrollbars className='flex-grow overflow-x-auto'>
        <Table className='min-w-xl' aria-labelledby='tableTitle'>
          <CustomersTableHead
            numSelected={selected.length}
            order={order}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={data.length}
          />

          <TableBody>
            {_.orderBy(
              data,
              [
                (o) => {
                  switch (order.id) {
                    case 'categories': {
                      return o.categories[0];
                    }
                    default: {
                      return o[order.id];
                    }
                  }
                },
              ],
              [order.direction]
            )
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((n) => {
                const isSelected = selected.indexOf(n.id) !== -1;
                return (
                  <TableRow
                    className='h-64 cursor-pointer'
                    hover
                    role='checkbox'
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={n.id}
                    selected={isSelected}
                    onClick={(event) => handleClick(n)}
                  >
                    <TableCell
                      className='w-48 px-4 sm:px-12'
                      padding='checkbox'
                    >
                      <Checkbox
                        checked={isSelected}
                        onClick={(event) => event.stopPropagation()}
                        onChange={(event) => handleCheck(event, n.id)}
                      />
                    </TableCell>

                    <TableCell component='th' scope='row'>
                      {n.first_name} {n.last_name}
                    </TableCell>

                    <TableCell component='th' scope='row'>
                      {n.other_name}
                    </TableCell>

                    <TableCell className='truncate' component='th' scope='row'>
                      {n.deceased?.firstName} {n.deceased?.lastName}
                    </TableCell>

                    <TableCell component='th' scope='row' align='left'>
                      {n.email}
                    </TableCell>

                    <TableCell component='th' scope='row' align='left'>
                      {n.phone_number}
                    </TableCell>
                  </TableRow>
                );
              })}

              {data.length === 0 && 
                _.range(6).map(k => 
                  <TableRowSkeleton key={k} />
              )}
          </TableBody>
        </Table>
      </FuseScrollbars>

      <TablePagination
        component='div'
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          'aria-label': 'Previous Page',
        }}
        nextIconButtonProps={{
          'aria-label': 'Next Page',
        }}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  );
}

export default withRouter(RelativesList);
