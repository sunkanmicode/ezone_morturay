import React, { useEffect, useState } from 'react';
import { connect, useSelector, useDispatch } from "react-redux"
import {
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
import moment from "moment"
import InvoicesTableHead from './InvoicesTableHead';
import TableRowSkeleton from './TableRowSkeleton';
import * as Actions from '../store/actions';

function InvoicesList(props) {
  const { searchText, loading } = props
  const dispatch = useDispatch();
  const invoicesReducer = useSelector(({proformaApp}) => proformaApp.invoices);
  const invoiceData = invoicesReducer.proformaInvoices
  const invoices = invoiceData.invoices
  const totalItems = invoiceData.totalItems
  const currentPage = invoiceData.currentPage

  const [selected, setSelected] = useState([]);
  const [data, setData] = useState(invoices);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState({ direction: 'asc', id: null });

  console.log(invoices, "invoices")

  useEffect(() => {
    dispatch(Actions.getProformaInvoices());
  }, [dispatch]);

  useEffect(() => {
    setData(
      searchText.length === 0
        ? invoices
        : _.filter(invoices, (item) =>
            item.proforma_invoice_number.toLowerCase().includes(searchText.toLowerCase())
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
    props.history.push('/proforma/' + item.id);
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
    dispatch(Actions.getProformaInvoices(page))
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(event.target.value);
    dispatch(Actions.getProformaInvoices(0, event.target.value))
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
            )
              .map((n, i) => {
                const isSelected = selected.indexOf(n.id) !== -1;
                return (
                  <TableRow
                    className='h-64 cursor-pointer'
                    hover
                    role='checkbox'
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={i}
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
                      {n.proforma_invoice_number}
                    </TableCell>

                    <TableCell className='truncate' component='th' scope='row'>
                      {n.service?.length}
                    </TableCell>

                    <TableCell component='th' scope='row' align='left'>
                      {n.contact_person}
                    </TableCell>

                    <TableCell component='th' scope='row'>
                      —
                    </TableCell>

                    <TableCell component='th' scope='row' align='left'>
                      {moment(n.created_at).format("Do MMM, YYYY")}
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
                  <TableCell colSpan={6}><p className="text-lg font-bold text-gray-600 text-center">No record found</p></TableCell>
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

const mapStateToProps = ({proformaApp}) => {
  const { invoices } = proformaApp
  return {
    loading: invoices.loading,
    searchText: invoices.searchText,
  }
}

export default withRouter(connect(mapStateToProps)(InvoicesList));
