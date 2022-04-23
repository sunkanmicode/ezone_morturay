import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import { withRouter, useRouteMatch } from 'react-router-dom';
import * as Actions from '../../store/actions';
import _ from 'lodash';
import moment from 'moment';
import clsx from 'clsx';
import {
  Icon,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FuseScrollbars, FuseAnimate, FuseUtils } from '@fuse';
import InvoiceTableHead from './VoucherTableHead';
import Pdf from 'react-to-pdf';

const useStyles = makeStyles((theme) => ({
  table: {
    '& .MuiTableRow-root': {
      borderLeft: `1px solid ${theme.palette.divider}`,
      borderRight: `1px solid ${theme.palette.divider}`,
    },
  },
}));

function VoucherList(props) {
  const { voucher, user, branches, bankDetailsByBranch } = props;
  const [selectedBranch, setSelectedBranch] = React.useState({});
  const classes = useStyles();
  const dispatch = useDispatch();
  const match = useRouteMatch();
  const printRef = React.createRef();

  const [selected, setSelected] = useState([]);
  const data = voucher?.voucher || [];

  console.log(branches, voucher, selectedBranch, 'branches111');

  useEffect(() => {
    dispatch(Actions.getVoucherById(match.params.id));
  }, [dispatch, match.params.id]);


  useEffect(() =>  {
    (async () => {
      try {
        if (user?.organisation?.id) {
           await dispatch(
            Actions.getBranches({
              orgId: user?.organisation?.id,
            })
          );
        }
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, [user])


  useEffect(() => {
   
    if (voucher?.branchId) {
     const selectedBranch = branches.find(branch =>  branch.id === voucher.branchId);
     setSelectedBranch(selectedBranch);
    }
 
}, [voucher, branches]);

  useEffect(() => {
    (async () => {
      try {
        if (voucher.branchId) {
           await dispatch(
            Actions.getBankDetailsByBranch({
              branchId: voucher.branchId,
            })
          );
        }
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, [voucher]);

  const bankDetails = [...bankDetailsByBranch].map((bankDetail, index) => {
    return (
      <div key={index} className="text-red font-bold">
        <dt>{bankDetail?.accountName}</dt>
        <dt>{bankDetail?.bank?.name}</dt>
        <dt>{bankDetail?.accountNumber}</dt>
        <dt>
          <hr className="my-16 border-0 border-t border-grey-darkest" />
        </dt>
      </div>
    );
  });


  function handleSelectAllClick(event) {
    if (event.target.checked) {
      setSelected(data.map((n) => n.id));
      return;
    }
    setSelected([]);
  }

  const options = {
    orientation: 'portrait',
    unit: 'in',
    format: [9, 14],
  };

  console.log(voucher, 'voucher');

  return (
    <div className='flex flex-col p-24'>
      <FuseAnimate delay={100}>
        <div className='flex flex-col flex-wrap mt-0 mb-24 relative'>
          <div className='absolute right-0 top-0 bg-orange-lighter'>
            <Pdf
              targetRef={printRef}
              filename={`${voucher?.familyName}.pdf`}
              options={options}
              x={0.4}
              y={0.4}
              scale={0.92}
            >
              {({ toPdf }) => (
                <IconButton onClick={toPdf}>
                  <Icon>cloud_download</Icon>
                </IconButton>
              )}
            </Pdf>
          </div>

          <div
            className='w-9/12 mx-auto bg-white overflow-hidden sm:rounded-lg'
            ref={printRef}
          >
            <div className='flex justify-between px-4 py-0 sm:px-6'>
              <h1>
                <img
                  className='h-96'
                  src='/assets/images/profile/omega-homes.svg'
                  alt=''
                />
              </h1>
              <div>
                <dl className='space-y-16 text-right text-xs'>
                  <div>
                  {/*   <dt className='capitalize'>
                      {user.organisation?.city} Location
                    </dt> */}
                    <dt>{user.organisation?.companyName}</dt>
                    <dt>{selectedBranch?.name} Branch</dt>
                    <dt>{selectedBranch?.address}</dt>
                    {/* <dt>
                      {
                        branches?.find((b) => b.id === voucher?.branchId)
                          ?.address
                      }
                    </dt> */}
                    {/* <dt>
                      {user.organisation?.city}, {user.organisation?.state}
                    </dt>
                    <dt>{user.organisation?.country}</dt> */}
                    <dt>
                      <div className='space-x-8'>
                        <span>
                          {[
                            user.organisation?.phoneNumber,
                            user.organisation?.contactPersonTel,
                            user.organisation?.contactPersonPhone,
                          ]
                            .filter((n) => n)
                            .join(', ')}
                        </span>
                      </div>
                    </dt>
                    <dt>{user.organisation?.emailAddress}</dt>
                    <dt>
                      <hr className='my-16 border-0 border-t border-grey-lightest' />
                    </dt>
                    {/* <div className='text-red font-bold'>
                      <dt>A/C NAME: OMEGA FUNERAL HOME</dt>
                      <dt>GTBank 0174644878</dt>
                      <dt>Polaris Bank 1771874077</dt>
                    </div> */}
                    {!Boolean(bankDetailsByBranch.length) ? (
                      <dt>No bank info</dt>
                    ) : (
                      bankDetails
                    )}
                  </div>
                  <div className='text-gray-600'>
                    <dt>
                      {moment(voucher?.date).format('dddd, MMMM Do, YYYY')}
                    </dt>
                  </div>
                </dl>
              </div>
            </div>

            <div className='text-center'>
              <h2 className='uppercase text-lg italic text-gray-900'>
                Funeral Voucher
              </h2>
            </div>

            <div className='p-24 border border-solid border-grey-light'>
              <dl>
                <div className='bg-gray-100 px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                  <dt className='text-sm font-bold text-gray-600'>
                    Family Name :
                  </dt>
                  <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                    {voucher?.familyName}
                  </dd>
                </div>
                <div className='bg-white px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                  <dt className='text-sm font-bold text-gray-600'>
                    Initiator :
                  </dt>
                  <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                    {voucher?.initiator}
                  </dd>
                </div>
                <div className='bg-gray-100 px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                  <dt className='text-sm font-bold text-gray-600'>
                    Funeral Coordinator :
                  </dt>
                  <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                    {voucher?.funeralCoordinator}
                  </dd>
                </div>
                <div className='bg-white px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                  <dt className='text-sm font-bold text-gray-600'>
                    Funeral Location :
                  </dt>
                  <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                    {voucher?.funeralLocation}
                  </dd>
                </div>
                <div className='bg-gray-100 px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                  <dt className='text-sm font-bold text-gray-600'>Branch :</dt>
                  <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                    {_.find(branches, { id: voucher?.branchId })?.name}
                  </dd>
                </div>
              </dl>

              <FuseScrollbars className='flex-grow overflow-x-auto'>
                <Table
                  className={clsx(classes.table, 'mt-24')}
                  aria-labelledby='tableTitle'
                >
                  <InvoiceTableHead
                    numSelected={selected.length}
                    onSelectAllClick={handleSelectAllClick}
                    rowCount={data.length}
                  />

                  <TableBody>
                    {data.map((n, i) => {
                      const isSelected = selected.indexOf(n.id) !== -1;
                      return (
                        <TableRow
                          className='h-48'
                          aria-checked={isSelected}
                          tabIndex={-1}
                          key={i}
                          selected={isSelected}
                        >
                          <TableCell component='th' scope='row'>
                            {i + 1}
                          </TableCell>

                          <TableCell
                            className='truncate'
                            component='th'
                            scope='row'
                          >
                            {n.serviceType}
                          </TableCell>

                          <TableCell
                            className='truncate'
                            component='th'
                            scope='row'
                          >
                            {n.description}
                          </TableCell>

                          <TableCell component='th' scope='row' align='right'>
                            {FuseUtils.formatCurrency(n.cost)}
                          </TableCell>

                          <TableCell component='th' scope='row' align='right'>
                            {n.qty}
                          </TableCell>

                          <TableCell component='th' scope='row' align='right'>
                            {FuseUtils.formatCurrency(n.total)}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                    <TableRow className='h-48'>
                      <TableCell component='th' scope='row' align='left'>
                        <strong>Grand Total</strong>
                      </TableCell>
                      <TableCell
                        component='th'
                        scope='row'
                        align='right'
                        colSpan={5}
                      >
                        {FuseUtils.formatCurrency(
                          data.reduce(
                            (store, row) => store + Number(row.total),
                            0
                          )
                        )}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </FuseScrollbars>
            </div>

            <div className='flex flex-col space-y-1 mt-16 text-red font-bold uppercase text-xs'>
              <span>No cash payment accepted</span>
              <span>
                We never accept payment for our products & services via our
                employees personal account numbers.{' '}
              </span>
              <span>All payment must be made to Omega Funeral Home</span>
            </div>
          </div>
        </div>
      </FuseAnimate>
    </div>
  );
}

const mapStateToProps = ({ vouchersApp, auth, ezone }) => {
  const { vouchers } = vouchersApp;
  return {
    user: auth.user.data,
    voucher: vouchers.voucher,
    branches: vouchers.branches,
    bankDetailsByBranch: vouchers.bankDetailsByBranch,

  };
};

export default withRouter(connect(mapStateToProps)(VoucherList));
