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
  const { admissions, totalItems, currentPage }= useSelector(
    ({ reportsApp }) => reportsApp.reports.admissions
  );
  /* const admissions = admissionData.admissions;
  const totalItems = admissionData.totalItems;
  const currentPage = admissionData.currentPage; */

  const [selected, setSelected] = useState([]);
  //const [data, setData] = useState(admissions);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState({ direction: 'asc', id: null });

  /* useEffect(() => {
    setData(
      searchText.length === 0
        ? admissions
        : _.filter(admissions, (item) =>
            item.name.toLowerCase().includes(searchText.toLowerCase())
          )
    );
  }, [admissions, searchText]); */

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
      setSelected(admissions.map((n) => n.id));
      return;
    }
    setSelected([]);
  }

  // function handleClick(item) {
  //   // props.history.push('/reports/admissions/' + item.id);
  // }

  function handleChangePage(event, page) {
    setPage(page);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(event.target.value);
  }


  console.log({admissions});
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
                Daily Admission Report
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
              rowCount={admissions.length}
            />

            <TableBody>
              {_.orderBy(
                admissions,
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
                      // onClick={(event) => handleClick(n)}
                    >
                      <TableCell component='th' scope='row'>
                        {n.formNumber}
                      </TableCell>

                      <TableCell
                        className='truncate'
                        component='th'
                        scope='row'
                      >
                        {n.deceasedName}
                      </TableCell>

                      <TableCell component='th' scope='row' align='left'>
                        {n.deceasedAge}
                      </TableCell>

                      <TableCell component='th' scope='row' align='left'>
                        {n.deceasedGender}
                      </TableCell>

                      <TableCell component='th' scope='row' align='left'>
                        {n.customerName}
                      </TableCell>

                      <TableCell component='th' scope='row' align='left'>
                        {n.branchId
                          ? branches.find((b) => b.id === n.branchId)?.name
                          : '—'}
                      </TableCell>

                      <TableCell component='th' scope='row' align='left'>
                        {n.date
                          ? moment(n.date).format('ll')
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
