import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { withRouter, useRouteMatch } from "react-router-dom";
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  IconButton,
  Icon,
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { FuseScrollbars, FuseAnimate, FuseUtils } from "@fuse";
import _ from "@lodash";
import moment from "moment";
import InvoiceTableHead from "./InvoiceTableHead";
import * as Actions from "../store/actions";
import { connect } from "react-redux";
import converter from "number-to-words";
import { useReactToPrint } from "react-to-print";
import AddServicesDialog from "../dialog/AddServicesDialog";



function InvoiceList(props) {
  const { invoice, user, services, branches, bankDetailsByBranch } = props;
  
  

  const dispatch = useDispatch();
  const match = useRouteMatch();
  const [selectedBranch, setSelectedBranch] = useState({});

  const [selected, setSelected] = useState([]);
  const data = invoice ? invoice.service : [];

  useEffect(() => {
    dispatch(Actions.getInvoiceById(match.params.id));
  }, [dispatch, match.params.id]);

  useEffect(() => {
    setSelectedBranch(branches?.find((b) => b.id === invoice?.branch_id));
  }, [branches, invoice]);

  useEffect(() => {
    (async () => {
      try {
        if (selectedBranch?.id) {
           await dispatch(
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

  
   const componentRef = useRef();
   const handlePrint = useReactToPrint({
     content: () => componentRef.current,
   });

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

  // console.log({ bankDetails });

  return (
    <>
      <div className="flex flex-col p-24">
        <FuseAnimate delay={100}>
          <div className="flex flex-col flex-wrap mt-0 mb-24 relative">
            <div className="absolute right-0 top-0 bg-orange-lighter">
              <IconButton disabled={false} onClick={handlePrint}>
                <Icon>cloud_download</Icon>
              </IconButton>
            </div>

            <div
              className="w-9/12 mx-auto bg-white overflow-hidden sm:rounded-lg"
              style={{ fontWeight: 900 }}
              // ref={ref}
              ref={componentRef}
            >
              <div className="flex justify-between px-4 py-0 sm:px-6">
                <h1>
                  <img
                    className="h-96"
                    src="/assets/images/profile/omega-homes.svg"
                    alt=""
                  />
                </h1>
                {/* <h1>
                  <img className="h-96" src={user?.organisation?.logo} alt="" />
                </h1> */}

                <div>
                  <dl className="space-y-16 text-right text-xs">
                    <div>
                      <dt>{user.organisation?.companyName}</dt>
                      <dt>{selectedBranch?.name} Branch</dt>
                      <dt>{selectedBranch?.address}</dt>

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
                        <hr className="my-16 border-0 border-t border-grey-darkest" />
                      </dt>

                      {!Boolean(bankDetailsByBranch.length) ? (
                        <dt>No bank info</dt>
                      ) : (
                        bankDetails
                      )}
                    </div>
                    <div className="text-gray-600">
                      <dt>
                        {invoice?.invoice_date
                          ? moment(invoice?.invoice_date).format(
                              "dddd, MMMM Do, YYYY"
                            )
                          : ""}
                      </dt>
                      <dt>{invoice?.invoice_number}</dt>
                    </div>
                  </dl>
                </div>
              </div>

              <div className="text-center">
                <h1 className="text-xl leading-6 uppercase font-bold italic text-gray-900">
                  Invoice{" "}
                  <span className="uppercase text-lg italic text-gray-600">
                    (#{invoice?.invoice_number})
                  </span>
                </h1>
                <dl>
                  <div className="text-center">
                    <dt>Customer Name</dt>
                    {invoice?.customer ? (
                      <dt>
                        {invoice?.customer?.firstName}{" "}
                        {invoice?.customer?.lastName} (
                        {invoice?.customer?.otherName})
                      </dt>
                    ) : (
                      <Skeleton
                        variant="text"
                        width="200px"
                        className="mx-auto"
                      />
                    )}
                  </div>
                </dl>
              </div>

              <div className="border-t border-gray-200">
                <Table className="" size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell className="text-sm font-medium">
                        Bill to
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow className="h-64">
                      <TableCell component="td" scope="row">
                        <dl>
                          <div className="bg-gray-100 px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-bold">
                              Invoice Number
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                              #{invoice?.invoice_number}
                            </dd>
                          </div>
                          <div className="bg-white px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-bold">Invoice date</dt>
                            <dd className="mt-1 text-sm font-bold sm:mt-0 sm:col-span-2">
                              {moment(invoice?.invoice_date).format(
                                "Do MMMM, YYYY"
                              )}
                            </dd>
                          </div>
                          <div className="bg-gray-100 px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-bold">Due date</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                              {moment(invoice?.invoice_date).format(
                                "Do MMMM, YYYY"
                              )}
                            </dd>
                          </div>
                        </dl>
                      </TableCell>
                      <TableCell component="td" scope="row">
                        <dl>
                          <div className="bg-gray-100 px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-bold text-gray-600">
                              Name
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                              {invoice?.customer?.firstName}{" "}
                              {invoice?.customer?.lastName}
                            </dd>
                          </div>
                          <div className="bg-white px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-bold text-gray-600">
                              Address
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                              {invoice?.bill_to}
                            </dd>
                          </div>
                        </dl>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>

                <FuseScrollbars className="flex-grow overflow-x-auto mt-16 font-bold">
                  <Table className="" aria-labelledby="tableTitle">
                    <InvoiceTableHead
                      numSelected={selected.length}
                      onSelectAllClick={handleSelectAllClick}
                      rowCount={data.length}
                    />
                    <TableBody>
                      {data.map((n) => {
                        return (
                          <TableRow
                            className="h-48 cursor-pointer"
                            hover
                            colSpan={8}
                            tabIndex={-1}
                            key={n.id}
                          >
                            <TableCell component="th" scope="row">
                              {
                                _.find(services, { id: n.serviceId })
                                  ?.service_name
                              }
                            </TableCell>

                            <TableCell
                              className="truncate"
                              component="th"
                              scope="row"
                            >
                              {n.discountAmount}% (
                              {FuseUtils.formatCurrency(
                                n.rate * n.qty * (n.discountAmount / 100) || 0
                              )}
                              )
                            </TableCell>

                            <TableCell component="th" scope="row" align="left">
                              {n.qty}
                            </TableCell>

                            <TableCell component="th" scope="row" align="left">
                              {FuseUtils.formatCurrency(n.rate)}
                            </TableCell>

                            <TableCell component="th" scope="row" align="right">
                              {FuseUtils.formatCurrency(n.rate * n.qty || 0)}
                            </TableCell>

                            <TableCell component="th" scope="row" align="right">
                              {FuseUtils.formatCurrency(
                                n.rate * n.qty -
                                  n.rate * n.qty * (n.discountAmount / 100) || 0
                              )}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                      <TableRow className="h-48">
                        <TableCell colSpan={4} />
                        <TableCell className="bg-blue-lightest font-bold">
                          Total
                        </TableCell>
                        <TableCell className="bg-blue-lightest" align="right">
                          {FuseUtils.formatCurrency(invoice?.total_amount || 0)}
                        </TableCell>
                      </TableRow>
                      <TableRow className="h-48">
                        <TableCell colSpan={4} />
                        <TableCell colSpan={2}>
                          <span className="text-xs">
                            (
                            {invoice?.total_amount
                              ? _.startCase(
                                  converter.toWords(invoice?.total_amount)
                                )
                              : 0}{" "}
                            naira only)
                          </span>
                        </TableCell>
                      </TableRow>
                      <TableRow className="h-48">
                        <TableCell colSpan={3} />
                        <TableCell colSpan={3} className="p-0">
                          <Table>
                            <TableHead>
                              <TableRow className="h-48">
                                <TableCell
                                  colSpan={3}
                                  className="text-center bg-blue text-white"
                                >
                                  Deposits
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              <TableRow className="h-48">
                                <TableCell>S/N</TableCell>
                                <TableCell align="right">Date</TableCell>
                                <TableCell align="right">Amount</TableCell>
                              </TableRow>
                              {invoice?.deposit.map((dpt, i) => (
                                <TableRow key={dpt.id} className="h-48">
                                  <TableCell>{i + 1}</TableCell>
                                  <TableCell align="right">
                                    {moment(dpt.paymentDate).format(
                                      "DD/MM/YYYY"
                                    )}
                                  </TableCell>
                                  <TableCell align="right">
                                    {FuseUtils.formatCurrency(
                                      dpt?.amountPaid || 0
                                    )}
                                  </TableCell>
                                </TableRow>
                              ))}

                              <TableRow className="h-48 bg-blue-lightest">
                                <TableCell className="font-bold">
                                  Deficit
                                </TableCell>
                                <TableCell colSpan={2} align="right">
                                  {FuseUtils.formatCurrency(
                                    invoice?.deficit || 0
                                  )}
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={6}>
                          <div className="flex flex-col space-y-1 text-red font-style: italic text-xs font-bold">
                            Terms And Conditions
                            <ul className="list-disc">
                              <li>
                                Cash payment is not accepted, only bank
                                transfers and POS are acceptable and as such,
                                please allow up to a minimum of 15 minutes to 24
                                hours for transaction confirmation.{" "}
                              </li>
                              <li>
                                Once a deposit is paid, the balance needs to be
                                paid before the body will be released.
                              </li>
                              <li>
                                Viewing of corpse will only be allowed if an
                                authorized member of the family gives his/her
                                approval. In the absence of the authorized
                                member, a written and signed approval by the
                                authorized person will only be acknowledged.
                              </li>
                              <li>
                                Please call to book for viewing and in respect
                                to this, our viewing times are between 10.00am
                                to 4.00pm daily.{" "}
                              </li>
                              <li>
                                Casket and clothing should be delivered at least
                                a day before the collection of loved one and
                                should be done before 5.00pm.
                              </li>
                              <li>
                                Note that the authorized family member will be
                                required to view the body of their loved ones
                                before departure from Omega Funeral Home
                                premises.
                              </li>
                              <li>
                                The picture of the authorized family member will
                                be taken alone at the time of admission and with
                                the remains at the point of discharge.{" "}
                              </li>
                              <li>
                                {" "}
                                Relations are not allowed in the embalming room
                                during bathing and dressing of corpse. For
                                hygienic purposes we DO NOT ACCEPT TOILETRIES.
                              </li>
                              <li>
                                On the day of collection, authorized family
                                member should be in possession of the original
                                admission form as this will be collected and
                                replaced with a discharge form.
                              </li>
                              <li>
                                {" "}
                                Please get expert information on the size of the
                                corpse in relation with the chosen casket as we
                                will not be responsible for any
                                misappropriation.
                              </li>
                              <li>
                                We do not advice any form of payment to be made
                                in advance (excluding cemetery).
                              </li>
                              <li>
                                In the event of a refund (mortuary, funeral, or
                                cemetery), 2% mobilization fee applies to the
                                amount to be refunded. Money refunded will only
                                be paid into the same account details that made
                                the initial payment.
                              </li>
                              <li>
                                NOTE: THE DEATH CERTIFICATE IS A PREREQUISUITE
                                FOR ADMISSION OF CORPSE
                              </li>
                            </ul>
                          </div>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </FuseScrollbars>
              </div>
            </div>
          </div>
        </FuseAnimate>
      </div>
      {/* <AddServicesDialog /> */}
    </>
  );
}

const mapStateToProps = ({ invoicesApp, auth, ezone }) => {
  const { invoices, services } = invoicesApp;
  return {
    searchText: invoices.searchText,
    invoice: invoices.invoice,
    services: services.services.services,
    user: auth.user.data,
    branches: ezone.branches.branches,
    bankDetailsByBranch: invoices.bankDetailsByBranch,
  };
};

export default withRouter(connect(mapStateToProps)(InvoiceList));
