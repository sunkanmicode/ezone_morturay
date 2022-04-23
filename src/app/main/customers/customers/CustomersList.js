import React, { useEffect, useState } from 'react';
import { connect, useSelector } from "react-redux"
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
import CustomersTableHead from './CustomersTableHead';
import * as Actions from '../store/actions';
import { useDispatch } from 'react-redux';
import TableRowSkeleton from './TableRowSkeleton';

function CustomersList(props) {
  const { searchText, loading, branches } = props
  const dispatch = useDispatch();
  const customerReducer = useSelector(({customerApp}) => customerApp.customer);
  const customersData = customerReducer.customers
  const customers = customersData.customers
  const count = customersData.count
  const currentPage = customersData.currentPage

  const customer22 = useSelector(
    ({ customerApp }) => customerApp
  );
  console.log(customer22, "customer22");

   

  const [selected, setSelected] = useState([]);
  const [data, setData] = useState(customers);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [order, setOrder] = useState({ direction: 'asc', id: null });

  useEffect(() => {
  }, [dispatch]);

  useEffect(() => {
    customers.forEach((customer)=>{
      branches.forEach((branch)=>{
        if(customer.branch_id === branch.id){
          customer.branch_name = branch.name;
        }
      })
    })
 
    setData(
      searchText.length === 0
        ? customers
        : _.filter(customers, (item) =>
            item.first_name.toLowerCase().includes(searchText.toLowerCase()) ||
            item.last_name.toLowerCase().includes(searchText.toLowerCase()) ||
            item.branch_name.toLowerCase().includes(searchText.toLowerCase()) ||
            item.customer_number.toLowerCase().includes(searchText.toLowerCase()) 
          )
    );
  }, [customers, searchText]);
  

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
    props.history.push('/customers/' + item.id);
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
    dispatch(Actions.getCustomers(page))
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(event.target.value);
    dispatch(Actions.getCustomers(0, event.target.value))
  }

  return (
    <div className='w-full flex flex-col'>
      <FuseScrollbars className='flex-grow overflow-x-auto'>
        <Table className='min-w-xl' aria-labelledby='tableTitle'>
          <CustomersTableHead
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
                      {n.first_name} {n.last_name}
                    </TableCell>

                    <TableCell component="th" scope="row">
                      {n.other_name}
                    </TableCell>

                    <TableCell className="truncate" component="th" scope="row">
                      {n.customer_number}
                    </TableCell>

                    <TableCell component="th" scope="row" align="left">
                      {n.branch_id
                        ? branches.find((b) => b.id === n.branch_id)?.name
                        : "—"}
                    </TableCell>

                    <TableCell component="th" scope="row" align="left">
                      {n.phone_number}
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

const mapStateToProps = ({ customerApp, ezone }) => {
  const { customer } = customerApp;
  return {
    loading: customer.loading,
    searchText: customer.searchText,
    branches: ezone.branches.branches,
  };
};

export default withRouter(connect(mapStateToProps)(CustomersList));
