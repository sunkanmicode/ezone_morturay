import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as Actions from '../store/actions';
import {
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  Checkbox,
} from '@material-ui/core';
import _ from '@lodash';
import moment from "moment";
import { FuseScrollbars, FuseUtils } from '@fuse';
import InvoicesTableHead from './ReceiptsTableHead';
import TableRowSkeleton from './TableRowSkeleton';

function ReceiptsList(props) {
  const { searchText, loading } = props
  const dispatch = useDispatch();
  const receiptsReducer = useSelector(({receiptsApp}) => receiptsApp.receipts);
  const receiptData = receiptsReducer.receipts
  const receipts = receiptData.receipts
  const totalItems = receiptData.totalItems
  const currentPage = receiptData.currentPage

  console.log(receipts, "receipts")

  const [selected, setSelected] = useState([]);
  const [data, setData] = useState(receipts);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState({ direction: 'asc', id: null });

  useEffect(() => {
    dispatch(Actions.getReceipts())
  }, [dispatch]);

  useEffect(() => {
    setData(
      searchText.length === 0
        ? receipts
        : _.filter(receipts, (item) =>
              item.receiptNumber.toLowerCase().includes(searchText.toLowerCase()) ||
              (item.invoiceNumber && item.invoiceNumber.toLowerCase().includes(searchText.toLowerCase()))
          )
    );
  }, [receipts, searchText]);

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
    props.history.push('/receipts/' + item.id);
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
    dispatch(Actions.getReceipts(page))
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(event.target.value);
  }

  return (
    <div className='w-full flex flex-col'>
      <FuseScrollbars className='flex-grow overflow-x-auto'>
        <Table className='min-w-xl' aria-labelledby='tableTitle'>
          <InvoicesTableHead
            numSelected={selected.length}
            order={order}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={totalItems}
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
                      {n.receiptNumber}
                    </TableCell>

                    <TableCell className='truncate' component='th' scope='row'>
                      {n.billTo}
                    </TableCell>

                    <TableCell component='th' scope='row' align='left'>
                      {n.invoiceNumber}
                    </TableCell>

                    <TableCell component='th' scope='row' align='left'>
                      {moment(n.invoiceDate).isValid() ? moment(n.invoiceDate).format("Do MMM, yyyy") : null}
                    </TableCell>

                    <TableCell component='th' scope='row' align='left'>
                      {FuseUtils.formatCurrency(n.invoiceAmount)}
                    </TableCell>

                    <TableCell component='th' scope='row'>
                      {FuseUtils.formatCurrency(n.paymentAmount)}
                    </TableCell>
                  </TableRow>
                );
              })}

              {loading && 
                _.range(6).map(k => 
                  <TableRowSkeleton key={k} />
              )}

              {data.length === 0 &&  
                <TableRow>
                  <TableCell colSpan={8}><p className="text-lg font-bold text-gray-600 text-center">No record found</p></TableCell>
                </TableRow>
              }
          </TableBody>
        </Table>
      </FuseScrollbars>

      <TablePagination
        component='div'
        count={totalItems}
        rowsPerPage={rowsPerPage}
        page={currentPage}
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

const mapStateToProps = ({receiptsApp}) => {
  return {
    loading: receiptsApp.receipts.loading,
    searchText: receiptsApp.receipts.searchText,
  }
}

export default withRouter(connect(mapStateToProps)(ReceiptsList));
