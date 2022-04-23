import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { FuseScrollbars, FuseAnimate } from '@fuse';
import { withRouter } from 'react-router-dom';
import _ from '@lodash';
import moment from 'moment';
import ReportsTableHead from './ReportsTableHead';
import PDFButton from './Button';

function ReportsList(props) {
  const ref = React.createRef();
  const dispatch = useDispatch();
  const searchText = '';

  const { invoices, totalItems, currentPage} = useSelector(
    ({ reportsApp }) => reportsApp.reports.releases
  );
  /* const invoices = releaseData.invoices;
  const totalItems = releaseData.totalItems;
  const currentPage = releaseData.currentPage; */

  console.log(invoices, 'invoices releases');

  const [selected, setSelected] = useState([]);
  //const [data, setData] = useState(invoices);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState({ direction: 'asc', id: null });

  useEffect(() => {}, [dispatch]);

  /* useEffect(() => {
    setData(
      searchText.length === 0
        ? invoices
        : _.filter(invoices, (item) =>
            item.nameOfDeceased.toLowerCase().includes(searchText.toLowerCase())
          )
    );
  }, [invoices, searchText]); */

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
      setSelected(invoices.map((n) => n.id));
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
                Daily Release Report
              </h3>
              {/* <p className='text-sm'>As of 20th Jul, 2020</p> */}
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
              rowCount={invoices?.length ?? 0}
            />

            <TableBody>
              {_.orderBy(
                invoices,
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
                        {n.nameOfDeceased}
                      </TableCell>

                      <TableCell component='th' scope='row'>
                        {n.age}
                      </TableCell>

                      <TableCell component='th' scope='row'>
                        {n.gender}
                      </TableCell>

                      <TableCell component='th' scope='row'>
                        {n.placeOfDeath}
                      </TableCell>

                      <TableCell component='th' scope='row'>
                        {n.destinationOfCorpse}
                      </TableCell>

                      <TableCell component='th' scope='row'>
                        {n.deathCertifiedBy}
                      </TableCell>

                      <TableCell component='th' scope='row' align='left'>
                        {n.dateAdmitted
                          ? moment(n.dateAdmitted).format('ll')
                          : '—'}
                      </TableCell>

                      <TableCell component='th' scope='row' align='left'>
                        {n.discharged ? moment(n.discharged).format('ll') : '—'}
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
