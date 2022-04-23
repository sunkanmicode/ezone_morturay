import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
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
import VaultsTableHead from './VaultsTableHead';
import TableRowSkeleton from './TableRowSkeleton';
import * as Actions from '../store/actions';
import VaultDialog from './VaultDialog';

function VaultsList(props) {
  const { loading, branches, searchText, vaultsData } = props;
  const dispatch = useDispatch();

  const vaults = vaultsData.vaults;
  const count = vaultsData.count;
  const currentPage = vaultsData.currentPage;

  const [selected, setSelected] = useState([]);
  const [data, setData] = useState(vaults);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [order, setOrder] = useState({ direction: 'asc', id: null });

 

  useEffect(() => {
    vaults.forEach((vault)=>{
      let deceasedVault = vault.deceased
      deceasedVault.forEach((d)=>{
          vault.deceased_name = d.name_of_deceased
      })
    })
  
    
    setData(
      searchText.length === 0
        ? vaults
        : _.filter(vaults, (item) =>
            item.vault_number.toString().toLowerCase().includes(searchText.toLowerCase()) ||
            item.deceased_name.toLowerCase().includes(searchText.toLowerCase())

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

  function handleClick(item) {
    props.history.push('/vaults/' + item.id);
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
    dispatch(Actions.getVaults(page));
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(event.target.value);
    dispatch(Actions.getVaults(0, event.target.value));
  }

  return (
    <div className="w-full flex flex-col">
      <FuseScrollbars className="flex-grow overflow-x-auto">
        <Table className="min-w-xl" aria-labelledby="tableTitle">
          <VaultsTableHead
            numSelected={selected.length}
            order={order}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={data.length}
          />
         
          <TableBody colSpan={6}>
            {_.orderBy(
              data,
              [
                (o) => {
                  switch (order.id) {
                    case "categories": {
                      return o.categories[0];
                    }
                    default: {
                      return o[order.id];
                    }
                  }
                },
              ],
              [order.direction]
            ).map((n, i) => {
              const isSelected = selected.indexOf(n.id) !== -1;
              return (
                <TableRow
                  className="h-64 cursor-pointer"
                  hover
                  role="checkbox"
                  aria-checked={isSelected}
                  tabIndex={-1}
                  key={i}
                  selected={isSelected}
                  onClick={(event) => handleClick(n)}
                >
                  <TableCell className="w-48 px-4 sm:px-12" padding="checkbox">
                    <Checkbox
                      checked={isSelected}
                      onClick={(event) => event.stopPropagation()}
                      onChange={(event) => handleCheck(event, n.id)}
                    />
                  </TableCell>

                  <TableCell component="th" scope="row">
                    {n.vault_number}
                  </TableCell>

                  <TableCell className="truncate" component="th" scope="row">
                    {n.vault_type}
                  </TableCell>

                  <TableCell component="th" scope="row" align="left">
                    {n.deceased?.length}
                  </TableCell>

                  <TableCell component="th" scope="row" align="left">
                    {n.branch_id
                      ? branches.find((b) => b.id === n.branch_id)?.name
                      : "—"}
                  </TableCell>

                  <TableCell
                    component="th"
                    scope="row"
                    align="left"
                  >
                    {n.deceased?.map((b) => (
                      <p>{b.name_of_deceased}</p>
                    ))}
                  </TableCell>

                  <TableCell component="th" scope="row" align="left">
                    {n.deceased?.map((c) => (
                      <h6>{moment(c.date_buried).format("Do MMM, YYYY")}</h6>
                    ))}
                    {/* {moment(n.deceased?.date_buried).format("Do MMM, YYYY")} */}
                  </TableCell>
                </TableRow>
              );
            })}

            {loading && _.range(6).map((k) => <TableRowSkeleton key={k} />)}
            {data.length === 0 && (
              <TableRow>
                <TableCell colSpan={7}>
                  <p className="text-lg font-bold text-gray-600 text-center">
                    No record found
                  </p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </FuseScrollbars>

      <TablePagination
        component="div"
        count={count}
        rowsPerPage={rowsPerPage}
        page={currentPage}
        backIconButtonProps={{
          "aria-label": "Previous Page",
        }}
        nextIconButtonProps={{
          "aria-label": "Next Page",
        }}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />

      <VaultDialog />
    </div>
  );
}

const mapStateToProps = ({ vaultsApp, ezone }) => {
  const { vaults } = vaultsApp;
  return {
    loading: vaults.loading,
    searchText: vaults.searchText,
    vaultsData: vaults.vaults,
    branches: ezone.branches.branches,
  };
};

export default withRouter(connect(mapStateToProps)(VaultsList));
