import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from "react-redux"
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
import moment from 'moment';
import PlotsTableHead from './PlotsTableHead';
import TableRowSkeleton from './TableRowSkeleton';
import * as appActions from '../../../store/actions';
import * as Actions from '../store/actions';

function PlotsList(props) {
  const { searchText, plotsData, branches } = props
  const dispatch = useDispatch();
  const plots = plotsData.plots
  const count = plotsData.count
  const currentPage = plotsData.currentPage

  const [selected, setSelected] = useState([]);
  const [data, setData] = useState(plots);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState({ direction: 'asc', id: null });

  console.log(plots, "plots")

  useEffect(() => {
    dispatch(Actions.getVouchers());
    dispatch(appActions.getBranches())
  }, [dispatch]);

  useEffect(() => {
    setData(
      searchText.length === 0
        ? plots
        : _.filter(plots, (item) =>
            item.plotName.toLowerCase().includes(searchText.toLowerCase())
          )
    );
  }, [plots, searchText]);

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
    props.history.push('/plots/' + item.id);
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
    dispatch(Actions.getVouchers(page))
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(event.target.value);
    dispatch(Actions.getVouchers(0, event.target.value))
  }

  return (
    <div className='w-full flex flex-col'>
      <FuseScrollbars className='flex-grow overflow-x-auto'>
        <Table className='min-w-xl' aria-labelledby='tableTitle'>
          <PlotsTableHead
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

                    <TableCell className='truncate' component='th' scope='row'>
                      {n.plotName}
                    </TableCell>

                    <TableCell component='th' scope='row'>
                      {n.plotNumber}
                    </TableCell>

                    <TableCell component='th' scope='row' align='left'>
                      {_.find(branches, {id: n.branchId})?.name}
                    </TableCell>

                    <TableCell component='th' scope='row' align='left'>
                      {moment(n.created_at).format("Do MMM, YYYY")}
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
        count={count}
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

const mapStateToProps = ({ plotsApp }) => {
  const { plots, branches } = plotsApp
  return {
    searchText: plots.searchText,
    plotsData: plots.plots,
    branches: branches.branches
  }
}

export default withRouter(connect(mapStateToProps)(PlotsList));
