import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter, useRouteMatch } from 'react-router-dom';
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
import moment from 'moment';
import InvoiceTableHead from './InvoiceTableHead';
import * as Actions from '../store/actions';
import * as InvoiceAction from '../../invoice/store/actions'
import { connect } from 'react-redux';
import Pdf from 'react-to-pdf';

const useStyles = makeStyles((theme) => ({
  table: {
    '& .MuiTableRow-root': {
      borderLeft: `1px solid ${theme.palette.divider}`,
      borderRight: `1px solid ${theme.palette.divider}`,
    },
  },
}));

function InvoiceList(props) {
  const { invoice, user, branches, bankDetailsByBranch } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const match = useRouteMatch();
  const printRef = React.createRef();
  const [selectedBranch, setSelectedBranch] = useState({});

  const [selected, setSelected] = useState([]);
  const data = invoice ? invoice.service : [];

  console.log(invoice, 'proforma invoice by id');
  console.log(user, 'auth user');


  useEffect(() => {
    setSelectedBranch(branches?.find((b) => b.id === invoice?.branch_id));
  }, [branches, invoice]);

  useEffect(() => {
    dispatch(Actions.getProformaInvoiceById(match.params.id));
  }, [dispatch, match.params.id]);


  useEffect(() => {
    (async () => {
      try {
        if (selectedBranch?.id) {
          const response = await dispatch(
            Actions.getBankDetailsByBranch({ branchId: selectedBranch.id })
          );
        }
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, [selectedBranch]);


  function handleSelectAllClick(event) {
    if (event.target.checked) {
      setSelected(data.map((n) => n.id));
      return;
    }
    setSelected([]);
  }

  console.log({bankDetailsByBranch});
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


  const options = {
    orientation: 'portrait',
    unit: 'in',
    format: [9, 14],
  };

  return (
    <div className="flex flex-col p-24">
      <FuseAnimate delay={100}>
        <div className="flex flex-col flex-wrap mt-0 mb-24 relative">
          <div className="absolute right-0 top-0 bg-orange-lighter">
            <Pdf
              targetRef={printRef}
              filename={`${invoice?.proforma_invoice_number}.pdf`}
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
            className="w-9/12 mx-auto bg-white overflow-hidden sm:rounded-lg"
            ref={printRef}
          >
            <div className="flex justify-between px-4 py-0 sm:px-6">
              <h1>
                <img
                  className="h-96"
                  src="/assets/images/profile/omega-homes.svg"
                  alt=""
                />
              </h1>
              <div>
                <dl className="space-y-16 text-right text-xs">
                  <div>
                    {/*  <dt className='capitalize'>
                      {user.organisation?.city} Location
                    </dt> */}
                    <dt>{user.organisation?.companyName}</dt>
                    <dt>
                      {/* {
                        branches?.find((b) => b.id === invoice?.branch_id)
                          ?.address
                      } */}
                      <dt>{selectedBranch?.name} Branch</dt>
                      <dt>{selectedBranch?.address}</dt>
                    </dt>
                    {/* <dt>
                      {user.organisation?.city}, {user.organisation?.state}
                    </dt>
                    <dt>{user.organisation?.country}</dt> */}
                    <dt>
                      <div className="space-x-8">
                        <span>
                          {[
                            user.organisation?.phoneNumber,
                            user.organisation?.contactPersonTel,
                            user.organisation?.contactPersonPhone,
                          ]
                            .filter((n) => n)
                            .join(", ")}
                        </span>
                      </div>
                    </dt>
                    <dt>{user.organisation?.emailAddress}</dt>
                    <dt>
                      <hr className="my-16 border-0 border-t border-grey-lightest" />
                    </dt>
                    {!Boolean(bankDetailsByBranch?.length) ? (
                      <dt>No bank info</dt>
                    ) : (
                      bankDetails
                    )}
                  </div>
                  <div className="text-gray-600">
                    <dt>
                      {moment(invoice?.invoice_date).format(
                        "dddd, MMMM Do, YYYY"
                      )}
                    </dt>
                    <dt>{invoice?.invoice_number}</dt>
                  </div>
                </dl>
              </div>
            </div>

            <div className="text-center">
              <h2 className="uppercase text-lg italic text-gray-900">
                Proforma Invoice{" "}
                <span className="uppercase text-lg italic text-gray-600">
                  (#{invoice?.proforma_invoice_number})
                </span>
              </h2>
            </div>

            <div className="p-24 border border-solid border-grey-light">
              <dl>
                <div className="bg-gray-100 px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-bold text-gray-600">
                    Family Name :
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {invoice?.family_name}
                  </dd>
                </div>
                <div className="bg-white px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-bold text-gray-600">
                    Contact Person :
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {invoice?.contact_person}
                  </dd>
                </div>
                <div className="bg-gray-100 px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-bold text-gray-600">Address :</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {invoice?.address}
                  </dd>
                </div>
                <div className="bg-white px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-bold text-gray-600">Phone :</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {invoice?.phone_number}
                  </dd>
                </div>
                <div className="bg-gray-100 px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-bold text-gray-600">Email :</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {invoice?.email}
                  </dd>
                </div>
              </dl>

              <FuseScrollbars className="flex-grow overflow-x-auto">
                <Table
                  className={clsx(classes.table, "mt-24")}
                  aria-labelledby="tableTitle"
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
                          className="h-48"
                          aria-checked={isSelected}
                          tabIndex={-1}
                          key={i}
                          selected={isSelected}
                        >
                          <TableCell component="th" scope="row">
                            {i + 1}
                          </TableCell>

                          <TableCell
                            className="truncate"
                            component="th"
                            scope="row"
                          >
                            {n.service?.serviceName}
                          </TableCell>

                          <TableCell component="th" scope="row" align="left">
                            {FuseUtils.formatCurrency(n.rate)}
                          </TableCell>

                          <TableCell component="th" scope="row" align="left">
                            {n.qty}
                          </TableCell>

                          <TableCell component="th" scope="row" align="right">
                            {FuseUtils.formatCurrency(n.rate * n.qty)}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                    <TableRow className="h-48">
                      <TableCell component="th" scope="row" align="left">
                        <strong>Grand Total</strong>
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        align="right"
                        colSpan={4}
                      >
                        {FuseUtils.formatCurrency(
                          data.reduce(
                            (store, row) =>
                              store + Number(row.rate) * Number(row.qty),
                            0
                          )
                        )}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </FuseScrollbars>
            </div>

            <div className="flex flex-col space-y-1 text-red font-style: italic text-xs font-bold">
              Terms And Conditions
              <ul className="list-disc">
                <li>
                  Cash payment is not accepted, only bank transfers and POS are
                  acceptable and as such, please allow up to a minimum of 15
                  minutes to 24 hours for transaction confirmation.{" "}
                </li>
                <li>
                  Once a deposit is paid, the balance needs to be paid before
                  the body will be released.
                </li>
                <li>
                  Viewing of corpse will only be allowed if an authorized member
                  of the family gives his/her approval. In the absence of the
                  authorized member, a written and signed approval by the
                  authorized person will only be acknowledged.
                </li>
                <li>
                  Please call to book for viewing and in respect to this, our
                  viewing times are between 10.00am to 4.00pm daily.{" "}
                </li>
                <li>
                  Casket and clothing should be delivered at least a day before
                  the collection of loved one and should be done before 5.00pm.
                </li>
                <li>
                  Note that the authorized family member will be required to
                  view the body of their loved ones before departure from Omega
                  Funeral Home premises.
                </li>
                <li>
                  The picture of the authorized family member will be taken
                  alone at the time of admission and with the remains at the
                  point of discharge.{" "}
                </li>
                <li>
                  {" "}
                  Relations are not allowed in the embalming room during bathing
                  and dressing of corpse. For hygienic purposes we DO NOT ACCEPT
                  TOILETRIES.
                </li>
                <li>
                  On the day of collection, authorized family member should be
                  in possession of the original admission form as this will be
                  collected and replaced with a discharge form.
                </li>
                <li>
                  {" "}
                  Please get expert information on the size of the corpse in
                  relation with the chosen casket as we will not be responsible
                  for any misappropriation.
                </li>
                <li>
                  We do not advice any form of payment to be made in advance
                  (excluding cemetery).
                </li>
                <li>
                  In the event of a refund (mortuary, funeral, or cemetery), 2%
                  mobilization fee applies to the amount to be refunded. Money
                  refunded will only be paid into the same account details that
                  made the initial payment.
                </li>
                <li>
                  NOTE: THE DEATH CERTIFICATE IS A PREREQUISUITE FOR ADMISSION
                  OF CORPSE
                </li>
              </ul>
            </div>
          </div>
        </div>
      </FuseAnimate>
    </div>
  );
}

const mapStateToProps = ({ proformaApp,  auth, ezone }) => {
  const { invoices, services } = proformaApp;

  return {
    searchText: invoices.searchText,
    invoice: invoices.proformaInvoice,
    services: services.services.services,
    branches: ezone.branches.branches,
    user: auth.user.data,
    bankDetailsByBranch: invoices.bankDetailsByBranch,
  };
};

export default withRouter(connect(mapStateToProps)(InvoiceList));
