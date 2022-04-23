import React, { useEffect, useState } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import {
  Link,
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  Checkbox,
} from '@material-ui/core';
import { FuseScrollbars, FuseUtils } from '@fuse';
import { withRouter } from 'react-router-dom';
import _ from '@lodash';
import InvoicesTableHead from './InvoicesTableHead';
import TableRowSkeleton from './TableRowSkeleton';
import * as Actions from '../store/actions';

function InvoicesList(props) {
  const dispatch = useDispatch();
  const { searchText, loading } = props;
  const invoicesReducer = useSelector(
    ({ invoicesApp }) => invoicesApp.invoices
  );
  const invoiceData = invoicesReducer.invoices;
  const invoices = invoiceData.invoices;
  const totalItems = invoiceData.totalItems;
  const currentPage = invoiceData.currentPage;

  const [selected, setSelected] = useState([]);
  const [data, setData] = useState(invoices);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState({ direction: 'asc', id: null });

 console.log(invoicesReducer, "invoicesReducer");

  useEffect(() => {
    dispatch(Actions.getInvoices());
  }, [dispatch]);

  useEffect(() => {
    setData(
      searchText.length === 0
        ? invoices
        : _.filter(invoices, (item) =>
            item.invoice_number.toLowerCase().includes(searchText.toLowerCase())
          )
    );
  }, [invoices, searchText]);

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
    props.history.push('/invoices/' + item.id);
  }

  function handleRoute(e, customer) {
    e.stopPropagation();
    props.history.push('/customers/' + customer.id);
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
    dispatch(Actions.getInvoices(page));
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(event.target.value);
    dispatch(Actions.getInvoices(0, event.target.value));
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
            ).map((n) => {
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
                  <TableCell className='w-48 px-4 sm:px-12' padding='checkbox'>
                    <Checkbox
                      checked={isSelected}
                      onClick={(event) => event.stopPropagation()}
                      onChange={(event) => handleCheck(event, n.id)}
                    />
                  </TableCell>

                  <TableCell component='th' scope='row'>
                    {n.invoice_number}
                  </TableCell>

                  <TableCell className='truncate' component='th' scope='row'>
                    {n.service?.length}
                  </TableCell>

                  <TableCell component='th' scope='row' align='left'>
                    {moment(n.invoice_date).format('Do MMMM, YYYY')}
                  </TableCell>

                  <TableCell component='th' scope='row' align='left'>
                    <Link onClick={(e) => handleRoute(e, n.customer)}>
                      {n.customer?.email}
                    </Link>
                  </TableCell>

                  <TableCell component='th' scope='row' align='left'>
                    {n.status}
                  </TableCell>

                  <TableCell component='th' scope='row' align='left'>
                    {FuseUtils.formatCurrency(n.total_amount)}
                  </TableCell>

                  <TableCell component='th' scope='row' align='left'>
                    {FuseUtils.formatCurrency(n.deficit)}
                  </TableCell>
                </TableRow>
              );
            })}

            {loading && _.range(6).map((k) => <TableRowSkeleton key={k} />)}
            {data.length === 0 && (
              <TableRow>
                <TableCell colSpan={8}>
                  <p className='text-lg font-bold text-gray-600 text-center'>
                    No record found
                  </p>
                </TableCell>
              </TableRow>
            )}
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

const mapStateToProps = ({ invoicesApp }) => {
  const { invoices } = invoicesApp;
  return {
    loading: invoices.loading,
    searchText: invoices.searchText,
  };
};

export default withRouter(connect(mapStateToProps)(InvoicesList));
