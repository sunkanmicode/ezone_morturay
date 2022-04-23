import React, { useEffect, useState } from 'react';
import {
  Box,
  Collapse,
  IconButton,
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
} from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { useSelector } from 'react-redux';
import { FuseScrollbars, FuseAnimate } from '@fuse';
import { withRouter } from 'react-router-dom';
import _ from '@lodash';
import moment from 'moment';
import ReportsTableHead from './ReportsTableHead';
import PDFButton from './Button';

function ReportsList(props) {
  const ref = React.createRef();
  const [open, setOpen] = useState('');
  const searchText = '';

  const branches = useSelector(({ ezone }) => ezone.branches.branches);
  const form = useSelector(({ reportsApp }) => reportsApp.reports.form);
  const vaultData = useSelector(({ reportsApp }) => reportsApp.reports.vaults);
  const vaults = vaultData.vaults;
  const totalItems = vaultData.totalItems;
  const currentPage = vaultData.currentPage;

  console.log(vaultData, 'vaultData');

  const [selected, setSelected] = useState([]);
  const [data, setData] = useState(vaults);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState({ direction: 'asc', id: null });

  useEffect(() => {
    setData(
      searchText.length === 0
        ? vaults
        : _.filter(vaults, (item) =>
            item.vault_number.toLowerCase().includes(searchText.toLowerCase())
          )
    );
  }, [vaults, searchText]);

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

  const handleOpen = (id) => {
    open === id ? setOpen('') : setOpen(id);
  };

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
                Daily Vault Report
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
                    <React.Fragment key={n.id}>
                      <TableRow
                        className='h-64 cursor-pointer'
                        hover
                        role='checkbox'
                        aria-checked={isSelected}
                        tabIndex={-1}
                        selected={isSelected}
                      >
                        <TableCell component='th' scope='row'>
                          <span>
                            {n.deceased?.length}
                            <IconButton
                              aria-label='expand row'
                              size='small'
                              onClick={() => handleOpen(n.id)}
                            >
                              {open === n.id ? (
                                <KeyboardArrowUpIcon />
                              ) : (
                                <KeyboardArrowDownIcon />
                              )}
                            </IconButton>
                          </span>
                        </TableCell>

                        <TableCell
                          className='truncate'
                          component='th'
                          scope='row'
                        >
                          {n.vault_number}
                        </TableCell>

                        <TableCell component='th' scope='row' align='left'>
                          {n.vault_type}
                        </TableCell>

                        <TableCell component='th' scope='row' align='left'>
                          {n.purchaser_one ? n.purchaser_one?.name : '—'}
                        </TableCell>

                        <TableCell component='th' scope='row' align='left'>
                          {n.purchaser_two ? n.purchaser_two?.name : '—'}
                        </TableCell>

                        <TableCell component='th' scope='row' align='left'>
                          {n.branch_id
                            ? branches.find((b) => b.id === n.branch_id)?.name
                            : '—'}
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell
                          style={{ paddingBottom: 0, paddingTop: 0 }}
                          colSpan={6}
                        >
                          <Collapse
                            in={Boolean(open === n.id)}
                            timeout='auto'
                            unmountOnExit
                          >
                            <Box margin={1}>
                              <h3 className='text-lg font-bold text-gray-800'>
                                Deceased
                              </h3>
                              <TableContainer component={Paper}>
                                <Table size='small' aria-label='purchases'>
                                  <TableHead>
                                    <TableRow>
                                      <TableCell>Name of deceased</TableCell>
                                      <TableCell>Date buried</TableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    {n.deceased?.map((d, key) => (
                                      <TableRow key={key}>
                                        <TableCell component='th' scope='row'>
                                          {d.name_of_deceased}
                                        </TableCell>
                                        <TableCell>
                                          {d.date_buried
                                            ? moment(d.date_buried).format('ll')
                                            : '—'}
                                        </TableCell>
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              </TableContainer>
                            </Box>
                          </Collapse>
                        </TableCell>
                      </TableRow>
                    </React.Fragment>
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
