import React, { useEffect, useState } from 'react';
import { connect, useSelector, useDispatch } from "react-redux";
import moment from "moment";
import {
  Chip,
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
import DeceasedTableHead from './DeceasedTableHead';
import TableRowSkeleton from './TableRowSkeleton';
import * as Actions from '../store/actions';

const statuses = ['RELEASED', 'ADMITTED']

function DeceasedList(props) {
  const { searchText, branches } = props;
  const dispatch = useDispatch();
  const deceasedReducer = useSelector(({deceasedApp}) => deceasedApp.deceased);
  const loading = deceasedReducer.loading
  const deceasedData = deceasedReducer.allDeceased
  const deceased = deceasedData.deceased
  const count = deceasedData.count
  const currentPage = deceasedData.currentPage

console.log({ deceasedData, deceasedReducer },"all");
    
   

  const [selected, setSelected] = useState([]);
  const [data, setData] = useState(deceased);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [order, setOrder] = useState({ direction: 'asc', id: null });

  useEffect(() => {
    dispatch(Actions.getAllDeceased());
  }, [dispatch]);

  useEffect(() => {
    //search
    deceased.forEach((d) => {
          d.deceased_Id = `DSOHQOOOO${d.id}`;
      branches.forEach((branch) => {
        if (d.customer.branchId === branch.id) {
          d.branch_name = branch.name;
        }  
      });
    });
    // console.log(deceased, 'dec444')
    setData(
      searchText.length === 0
        ? deceased
        : _.filter(deceased, (item) =>
            item.first_name.toLowerCase().includes(searchText.toLowerCase()) ||
            item.last_name.toLowerCase().includes(searchText.toLowerCase()) ||
            item.branch_name.toLowerCase().includes(searchText.toLowerCase()) ||
            item.deceased_Id.toString().toLowerCase().includes(searchText.toLowerCase())
          )
    );
  }, [deceased, searchText]);

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
    props.history.push('/deceased/' + item.id);
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
    dispatch(Actions.getAllDeceased(page));
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(event.target.value);
    dispatch(Actions.getAllDeceased(0, event.target.value));
  }

  return (
    <div className='w-full flex flex-col'>
      <FuseScrollbars className='flex-grow overflow-x-auto'>
        <Table className='min-w-xl' aria-labelledby='tableTitle'>
          <DeceasedTableHead
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
              .map((n) => {
                const isSelected = selected.indexOf(n.id) !== -1;
                return (
                  <TableRow
                    className="h-64 cursor-pointer"
                    hover
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={n.id}
                    selected={isSelected}
                    onClick={(event) => handleClick(n)}
                  >
                    <TableCell
                      className="w-48 px-4 sm:px-12"
                      padding="checkbox"
                    >
                      <Checkbox
                        checked={isSelected}
                        onClick={(event) => event.stopPropagation()}
                        onChange={(event) => handleCheck(event, n.id)}
                      />
                    </TableCell>

                    <TableCell component="th" scope="row">
                      {`${n.first_name} ${n.last_name}`}
                    </TableCell>

                    <TableCell className="truncate" component="th" scope="row">
                      {n.gender}
                    </TableCell>

                    <TableCell component="th" scope="row" align="left">
                      {n.age}
                    </TableCell>

                    <TableCell component="th" scope="row" align="left">
                      {/* {`DS0HQ0000${n.id}`} */}
                      {n.deceased_Id}
                    </TableCell>

                    <TableCell component="th" scope="row" align="left">
                      {n.branch_name}
                      {/* {n.customer.branchId
                        ? branches.find((b) => b.id === n.customer.branchId)?.name
                        : "—"} */}
                    </TableCell>

                    <TableCell component="th" scope="row" align="left">
                      {moment(n.dateof_assertion).format("Do MMM, yyyy")}
                    </TableCell>

                    <TableCell component="th" scope="row" align="left">
                      {<Chip label={statuses[n.status]} />}
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
                  <TableCell colSpan={7}><p className="text-lg font-bold text-gray-600 text-center">No record found</p></TableCell>
                </TableRow>
              }
          </TableBody>
        </Table>
      </FuseScrollbars>

      <TablePagination
        component='div'
        count={count}
        rowsPerPage={rowsPerPage}
        page={currentPage}
        rowsPerPageOptions={[50, 100, 200, 300, 500]}
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
const mapStateToProps = ({ deceasedApp, ezone }) => {
  const { deceased } = deceasedApp;

  return {
    // loading: customer.loading,
    searchText: deceased.searchText,
    branches: ezone.branches.branches,
  };
};

export default withRouter(connect(mapStateToProps)(DeceasedList));
