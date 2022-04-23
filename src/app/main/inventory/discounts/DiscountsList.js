import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import {
  Icon,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  Checkbox,
} from '@material-ui/core';
import { FuseScrollbars } from '@fuse';
import { withRouter } from 'react-router-dom';
import _ from '@lodash';
import DiscountsTableHead from './DiscountsTableHead';
import TableRowSkeleton from './TableRowSkeleton';
import * as Actions from '../store/actions';
import DiscountDialog from "./DiscountDialog"

function DiscountsList(props) {
  const { searchText, loading } = props
  const dispatch = useDispatch();
  const discountReducer = useSelector(({inventoryApp}) => inventoryApp.discounts)
  const discounts = discountReducer.discounts;

  const [selected, setSelected] = useState([]);
  const [data, setData] = useState(discounts);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState({ direction: 'asc', id: null });

  useEffect(() => {
  }, [dispatch]);

  useEffect(() => {
    setData(
      searchText.length === 0
        ? discounts
        : _.filter(discounts, (item) =>
            String(item.amount).includes(searchText)
          )
    );
  }, [discounts, searchText]);

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
          <DiscountsTableHead
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
                    role='checkbox'
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={n.id}
                    selected={isSelected}
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

                    {/* <TableCell component='th' scope='row'>
                      {n.discount_name}
                    </TableCell> */}

                    <TableCell component='th' scope='row' align='left'>
                      {n.amount || 0}%
                    </TableCell>

                    <TableCell component='th' scope='row' align='left'>
                      {n.created_by}
                    </TableCell>

                    <TableCell component='th' scope='row' align='left'>
                      <IconButton size="small" onClick={() => dispatch(Actions.openEditDiscountDialog(n))}><Icon>edit</Icon></IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}

            {loading && 
              _.range(6).map(k => 
                <TableRowSkeleton key={k} />
            )}
            {(data.length === 0 && !loading) &&
              <TableRow>
                <TableCell colSpan={6}><p className="text-lg font-bold text-gray-600 text-center">No record found</p></TableCell>
              </TableRow>
            }
            
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

      <DiscountDialog />
    </div>
  );
}

const mapStateToProps = ({inventoryApp}) => {
  const { discounts } = inventoryApp
  return {
    loading: discounts.loading,
    searchText: discounts.searchText,
  }
}

export default withRouter(connect(mapStateToProps)(DiscountsList));
