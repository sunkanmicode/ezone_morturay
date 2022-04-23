import React, { useState } from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  Checkbox,
} from '@material-ui/core';
import { FuseScrollbars, FuseAnimate } from '@fuse';
import { withRouter } from 'react-router-dom';
import _ from '@lodash';
import InvoiceTableHead from './InvoiceTableHead';
// import * as Actions from '../store/actions';
import { connect } from 'react-redux';

function InvoiceList(props) {
  // const { searchText } = props
  // const dispatch = useDispatch();

  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState({ direction: 'asc', id: null });
  const data = [];

  // useEffect(() => {
  //   dispatch(Actions.getProducts());
  // }, [dispatch]);

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
    props.history.push('/invoice/' + item.id + '/' + item.handle);
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
    <div className='flex flex-col'>
      <FuseAnimate delay={100}>
        <div className='flex flex-wrap mt-8 mb-24'>
          <div className='w-full bg-white overflow-hidden sm:rounded-lg'>
            <div className='px-4 py-5 sm:px-6'>
              <h1>
                <img
                  className='h-72'
                  src='/assets/images/profile/omega-homes.svg'
                  alt=''
                />
              </h1>
              <h3 className='text-xl leading-6 font-bold text-gray-900'>
                Invoice
              </h3>
            </div>
            <div className='border-t border-gray-200'>
              <Table className='min-w-xl' size='small'>
                <TableHead>
                  <TableRow>
                    <TableCell />
                    <TableCell className='text-lg font-bold'>Bill to</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow className='h-64'>
                    <TableCell component='th' scope='row'>
                      <dl>
                        <div className='bg-gray-50 px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                          <dt className='text-sm font-medium text-gray-500'>
                            Invoice Number
                          </dt>
                          <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                            INV/2093746382
                          </dd>
                        </div>
                        <div className='bg-gray-50 px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                          <dt className='text-sm font-medium text-gray-500'>
                            Invoice date
                          </dt>
                          <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                            5th April 2021
                          </dd>
                        </div>
                        <div className='bg-gray-50 px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                          <dt className='text-sm font-medium text-gray-500'>
                            Due date
                          </dt>
                          <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                            5th April 2021
                          </dd>
                        </div>
                      </dl>
                    </TableCell>
                    <TableCell component='th' scope='row'>
                      <dl>
                        <div className='bg-gray-50 px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                          <dt className='text-sm font-medium text-gray-500'>
                            Name
                          </dt>
                          <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                            John Well
                          </dd>
                        </div>
                        <div className='bg-gray-50 px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                          <dt className='text-sm font-medium text-gray-500'>
                            Company
                          </dt>
                          <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                            Holder’s Limited
                          </dd>
                        </div>
                        <div className='bg-gray-50 px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                          <dt className='text-sm font-medium text-gray-500'>
                            Address
                          </dt>
                          <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                            3a Idowu Martins Victoria Island Lagos
                          </dd>
                        </div>
                      </dl>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan='2'>
                      <div className='bg-gray-50 px-1 py-1 sm:grid sm:grid-cols-1 sm:gap-4 sm:px-0'>
                        <h3 className='text-sm font-medium text-gray-500'>
                          Notes
                        </h3>
                        <p className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </FuseAnimate>

      <FuseScrollbars className='flex-grow overflow-x-auto'>
        <Table className='min-w-xl' aria-labelledby='tableTitle'>
          <InvoiceTableHead
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
                      {n.services}
                    </TableCell>

                    <TableCell className='truncate' component='th' scope='row'>
                      {n.discount}
                    </TableCell>

                    <TableCell component='th' scope='row' align='left'>
                      {n.days}
                    </TableCell>

                    <TableCell component='th' scope='row' align='left'>
                      {n.rate}
                    </TableCell>

                    <TableCell component='th' scope='row' align='right'>
                      {n.amount}
                    </TableCell>
                  </TableRow>
                );
              })}
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

const mapStateToProps = ({invoicesApp}) => {
  const { invoices } = invoicesApp
  console.log(invoices, "invoices")
  return {
    searchText: invoices.searchText
  }
}

export default withRouter(connect(mapStateToProps)(InvoiceList));
