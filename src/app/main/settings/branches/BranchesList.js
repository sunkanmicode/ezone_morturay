import React, { useEffect, useState } from 'react';
import {
  Icon,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { FuseScrollbars } from '@fuse';
import { withRouter } from 'react-router-dom';
import * as Actions from '../store/actions';
import _ from '@lodash';
import BranchesTableHead from './BranchesTableHead';
import BranchDialog from './BranchDialog';

function BranchList(props) {
  const dispatch = useDispatch();
  const searchText = '';

  const branches = useSelector(({ ezone }) => ezone.branches.branches);

  const [selected, setSelected] = useState([]);
  const [data, setData] = useState(branches);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState({ direction: 'asc', id: null });

  useEffect(() => {
    setData(
      searchText.length === 0
        ? branches
        : _.filter(branches, (item) =>
            item.name.toLowerCase().includes(searchText.toLowerCase())
          )
    );
  }, [branches, searchText]);

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

  // function handleClick(item) {
  //   // props.history.push('/settings/branches/' + item.id);
  // }

  function handleChangePage(event, page) {
    setPage(page);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(event.target.value);
  }

  console.log(branches, 'branches');

  return (
    <div className='w-full flex flex-col'>
      <FuseScrollbars className='flex-grow overflow-x-auto'>
        <Table className='min-w-xl' aria-labelledby='tableTitle'>
          <BranchesTableHead
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
                      {n.name}
                    </TableCell>

                    <TableCell className='truncate' component='th' scope='row'>
                      {n.description || '—'}
                    </TableCell>

                    <TableCell component='th' scope='row' align='left'>
                      {n.address || '—'}
                    </TableCell>

                    <TableCell component='th' scope='row' align='left'>
                      <IconButton
                        onClick={() => dispatch(Actions.openBranchDialog(n.id))}
                        size='small'
                      >
                        <Icon>edit</Icon>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </FuseScrollbars>

      <TablePagination
        component='div'
        count={branches.length}
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

      <BranchDialog />
    </div>
  );
}

export default withRouter(BranchList);
