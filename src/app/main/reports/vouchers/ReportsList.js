import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import { FuseScrollbars, FuseAnimate } from '@fuse';
import { withRouter } from 'react-router-dom';
import _ from '@lodash';
import moment from 'moment';
import ReportsTableHead from './ReportsTableHead';
import PDFButton from './Button';

function ReportsList(props) {
  const ref = React.createRef();
  const searchText = '';

  const branches = useSelector(({ ezone }) => ezone.branches.branches);
  const form = useSelector(({ reportsApp }) => reportsApp.reports.form);
  const voucherData = useSelector(
    ({ reportsApp }) => reportsApp.reports.vouchers
  );
  const vouchers = voucherData.voucherList;
  const totalItems = voucherData.totalItems;
  const currentPage = voucherData.currentPage;

  console.log(voucherData, 'voucherData');

  const [selected, setSelected] = useState([]);
  const [data, setData] = useState(vouchers);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState({ direction: 'asc', id: null });

  useEffect(() => {
    setData(
      searchText.length === 0
        ? vouchers
        : _.filter(vouchers, (item) =>
            item.name.toLowerCase().includes(searchText.toLowerCase())
          )
    );
  }, [vouchers, searchText]);

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

  function handleChangePage(event, page) {
    setPage(page);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(event.target.value);
  }

  return (
    <div className='relative w-full'>
      <div className='absolute right-0 top-0 bg-orange-lighter'>
        <PDFButton ref={ref} />
      </div>
      <div className='w-full flex flex-col' ref={ref}>
        <FuseAnimate delay={100}>
          <div className='flex justify-center flex-wrap mt-4 mb-16'>
            <div className='px-4 pb-5 sm:px-6 text-center'>
              <img
                className='h-72'
                src='/assets/images/profile/omega-homes.svg'
                alt=''
              />
              <h3 className='text-base leading-4 font-bold text-gray-900'>
                Daily Voucher Report
              </h3>
              <p className='text-sm'>
                {form.startDate &&
                  `As of ${moment(form.startDate).format('Do MMM, YYYY')}`}
              </p>
            </div>
          </div>
        </FuseAnimate>
        <FuseScrollbars className='flex-grow overflow-x-auto'>
          <Table className='min-w-xl' aria-labelledby='tableTitle'>
            <ReportsTableHead
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
                    >
                      <TableCell component='th' scope='row'>
                        {n.voucherNumber}
                      </TableCell>

                      <TableCell
                        className='truncate'
                        component='th'
                        scope='row'
                      >
                        {n.familyName}
                      </TableCell>

                      <TableCell
                        className='truncate'
                        component='th'
                        scope='row'
                      >
                        {n.funeralCoordinator}
                      </TableCell>

                      <TableCell
                        className='truncate'
                        component='th'
                        scope='row'
                      >
                        {n.funeralLocation}
                      </TableCell>

                      <TableCell
                        className='truncate'
                        component='th'
                        scope='row'
                      >
                        {n.initiator}
                      </TableCell>

                      <TableCell
                        className='truncate'
                        component='th'
                        scope='row'
                      >
                        {n.payee}
                      </TableCell>

                      <TableCell
                        className='truncate'
                        component='th'
                        scope='row'
                      >
                        {n.date ? moment(n.date).format('ll') : '—'}
                      </TableCell>

                      <TableCell component='th' scope='row' align='left'>
                        {n.duration}
                      </TableCell>

                      <TableCell component='th' scope='row' align='left'>
                        {n.branchId
                          ? branches.find((b) => b.id === n.branchId)?.name
                          : '—'}
                      </TableCell>
                    </TableRow>
                  );
                })}
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
    </div>
  );
}

export default withRouter(ReportsList);
