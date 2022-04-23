import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import {
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  Checkbox,
} from '@material-ui/core';
import DoneIcon from "@material-ui/icons/Done";
import ClearIcon from "@material-ui/icons/Clear";
import { FuseScrollbars, FuseUtils } from '@fuse';
import { withRouter } from 'react-router-dom';
import _ from '@lodash';
import ServicesTableHead from './ServicesTableHead';
import TableRowSkeleton from './TableRowSkeleton';
import * as Actions from '../../store/actions';
import { types } from "./../Services"

function ServicesList(props) {
  const { searchText, loading } = props
  const dispatch = useDispatch();
  const serviceReducer = useSelector(({inventoryApp}) => inventoryApp.services)
  const servicesData = serviceReducer.services;
  const services = servicesData.services;
  const count = servicesData.count;
  const currentPage = servicesData.currentPage;

  console.log(services, "services")
  console.log(searchText, "searchText")

  const [selected, setSelected] = useState([]);
  const [data, setData] = useState(services);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState({ direction: 'asc', id: null });

  useEffect(() => {
  }, [dispatch]);

  useEffect(() => {
    setData(
      searchText.length === 0
        ? services
        : _.filter(services, (item) =>
            item.service_name.toLowerCase().includes(searchText.toLowerCase())
          )
    );
  }, [services, searchText]);

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
    props.history.push('/inventory/services/' + item.id);
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
    dispatch(Actions.getServices(page))
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(event.target.value);
    dispatch(Actions.getServices(0, event.target.value))
  }

  return (
    <div className='w-full flex flex-col'>
      <FuseScrollbars className='flex-grow overflow-x-auto'>
        <Table className='min-w-xl' aria-labelledby='tableTitle'>
          <ServicesTableHead
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
                    case 'service_name': {
                      return o.service_name;
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
                      {n.service_name}
                    </TableCell>

                    <TableCell className='truncate' component='th' scope='row'>
                      {_.find(types, { id: Number(n.service_type) })?.label}
                    </TableCell>

                    <TableCell component='th' scope='row' align='left'>
                      {FuseUtils.formatCurrency(n.amount)}
                    </TableCell>

                    <TableCell component='th' scope='row' align='left'>
                      {n.created_by}
                    </TableCell>

                    <TableCell component='th' scope='row' align='left'>
                      {n.is_admisson ? <DoneIcon /> : <ClearIcon />}
                    </TableCell>

                    <TableCell component='th' scope='row' align='left'>
                      {n.is_customer_image ? <DoneIcon /> : <ClearIcon />}
                    </TableCell>

                    <TableCell component='th' scope='row' align='left'>
                      {n.request_customer_signature ? <DoneIcon /> : <ClearIcon />}
                    </TableCell>
                  </TableRow>
                );
              })}
              
              {loading && 
                _.range(6).map(k => 
                  <TableRowSkeleton key={k} />
              )}
              {(data.length === 0 && !loading) && 
                <TableRow>
                  <TableCell colSpan={8}><p className="text-lg font-bold text-gray-600 text-center">No record found</p></TableCell>
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
        rowsPerPageOptions={[10, 25, 50, 100, 200, 500]}
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

const mapStateToProps = ({inventoryApp}) => {
  const { services } = inventoryApp
  return {
    loading: services.loading,
    searchText: services.searchText
  }
}

export default withRouter(connect(mapStateToProps)(ServicesList));
