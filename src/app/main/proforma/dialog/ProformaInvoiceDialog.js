import React, { useEffect } from 'react';
import { FuseAnimate, FuseScrollbars, FuseUtils } from '@fuse';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import {
  Icon,
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  Toolbar,
  AppBar,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../store/actions';
import ReactToPdf from 'react-to-pdf';

function ProformaInvoiceDialog(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const ref = React.createRef();
  const invoiceDialog = useSelector(
    ({ proformaApp }) => proformaApp.invoices.proformainvoiceDialog
  );
  const branches = useSelector(({ ezone }) => ezone.branches.branches);
  const user = useSelector(({ auth }) => auth.user.data);

  const options = {
    orientation: 'portrait',
    unit: 'in',
    format: [9, 14],
  };

  console.log(invoiceDialog, 'invoiceDialog');

  useEffect(() => {
    /**
     * After Dialog Open
     */
    if (invoiceDialog.props.open) {
    }
  }, [invoiceDialog.props.open]);

  function closeComposeDialog() {
    dispatch(Actions.closeProformaInvoiceDialog());
    history.push('/proforma');
  }

  return (
    <Dialog
      classes={{
        paper: "m-24",
      }}
      {...invoiceDialog.props}
      onClose={closeComposeDialog}
      fullWidth
      maxWidth="md"
    >
      <AppBar position="static" elevation={1}>
        <Toolbar className="flex justify-between">
          <Typography variant="subtitle1" color="inherit">
            Proforma Invoice Summary
          </Typography>
          <div className="flex items-center" aria-label="Toggle star">
            <FuseAnimate animation="transition.expandIn" delay={100}>
              <IconButton color="inherit" onClick={() => {}}>
                <Icon>mail</Icon>
              </IconButton>
            </FuseAnimate>
            <FuseAnimate animation="transition.expandIn" delay={100}>
              <ReactToPdf
                targetRef={ref}
                filename={`${invoiceDialog.data?.proforma_invoice_number}.pdf`}
                options={options}
                x={0.1}
                y={0.1}
                scale={0.94}
              >
                {({ toPdf }) => (
                  <IconButton
                    color="inherit"
                    disabled={!invoiceDialog.data}
                    onClick={toPdf}
                  >
                    <Icon className="text-white">print</Icon>
                  </IconButton>
                )}
              </ReactToPdf>
            </FuseAnimate>
          </div>
        </Toolbar>
      </AppBar>

      <DialogContent classes={{ root: "p-24" }}>
        <FuseAnimate delay={100}>
          <div className="flex flex-wrap mt-0 mb-24" ref={ref}>
            <div className="w-10/12 mx-auto bg-white overflow-hidden sm:rounded-lg">
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
                      <dt className="capitalize">
                        {user.organisation?.city} Location
                      </dt>
                      <dt>{user.organisation?.companyName}</dt>
                      <dt>
                        {
                          branches?.find(
                            (b) => b.id === invoiceDialog?.data?.branch_id
                          )?.address
                        }
                      </dt>
                      {/* <dt>{user.organisation?.city}, {user.organisation?.state}</dt>
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
                        <hr className="my-16 border-0 border-t border-solid border-grey-light" />
                      </dt>
                      <div className="text-red font-bold">
                        <dt>A/C NAME: OMEGA FUNERAL HOMES</dt>
                        <dt>GTBank 0174644878</dt>
                        <dt>Polaris Bank 1771874077</dt>
                      </div>
                    </div>
                    <div className="text-gray-600">
                      <dt>{moment().format("dddd, MMMM Do, YYYY")}</dt>
                      <dt>{invoiceDialog?.data?.proforma_invoice_number}</dt>
                    </div>
                  </dl>
                </div>
              </div>

              <div className="text-center">
                <h2 className="uppercase text-lg italic text-gray-900">
                  Proforma Invoice
                </h2>
              </div>

              <div className="p-24 border border-solid border-grey-light">
                <dl>
                  <div className="bg-gray-50 px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-bold text-gray-600">
                      Family Name :
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {invoiceDialog?.data?.family_name}
                    </dd>
                  </div>
                  <div className="bg-gray-50 px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-bold text-gray-600">
                      Contact Person :
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {invoiceDialog?.data?.contact_person}
                    </dd>
                  </div>
                  <div className="bg-gray-50 px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-bold text-gray-600">
                      Address :
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {invoiceDialog?.data?.address}
                    </dd>
                  </div>
                  <div className="bg-gray-50 px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-bold text-gray-600">
                      Phone number :
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {invoiceDialog?.data?.phone_number}
                    </dd>
                  </div>
                  <div className="bg-gray-50 px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-bold text-gray-600">Email :</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {invoiceDialog?.data?.email}
                    </dd>
                  </div>
                </dl>

                <FuseScrollbars className="flex-grow overflow-x-auto">
                  <Table
                    className="mt-24"
                    size="small"
                    aria-labelledby="tableTitle"
                  >
                    <TableHead>
                      <TableRow className="h-48">
                        <TableCell>S/N</TableCell>
                        <TableCell>Product/Service</TableCell>
                        <TableCell>Rate</TableCell>
                        <TableCell>Qty</TableCell>
                        <TableCell>SubTotal</TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {invoiceDialog?.data?.service.map((s, i) => {
                        return (
                          <TableRow
                            className="h-48 cursor-pointer"
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={i}
                          >
                            <TableCell component="th" scope="row">
                              {i + 1}
                            </TableCell>

                            <TableCell
                              className="truncate"
                              component="th"
                              scope="row"
                            >
                              {s.service?.serviceName}
                            </TableCell>

                            <TableCell component="th" scope="row">
                              {FuseUtils.formatCurrency(s.rate)}
                            </TableCell>

                            <TableCell component="th" scope="row">
                              {s.qty}
                            </TableCell>

                            <TableCell component="th" scope="row">
                              {FuseUtils.formatCurrency(s.rate * s.qty)}
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
                            invoiceDialog?.data?.service.reduce(
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
                    Cash payment is not accepted, only bank transfers and POS
                    are acceptable and as such, please allow up to a minimum of
                    15 minutes to 24 hours for transaction confirmation.{" "}
                  </li>
                  <li>
                    Once a deposit is paid, the balance needs to be paid before
                    the body will be released.
                  </li>
                  <li>
                    Viewing of corpse will only be allowed if an authorized
                    member of the family gives his/her approval. In the absence
                    of the authorized member, a written and signed approval by
                    the authorized person will only be acknowledged.
                  </li>
                  <li>
                    Please call to book for viewing and in respect to this, our
                    viewing times are between 10.00am to 4.00pm daily.{" "}
                  </li>
                  <li>
                    Casket and clothing should be delivered at least a day
                    before the collection of loved one and should be done before
                    5.00pm.
                  </li>
                  <li>
                    Note that the authorized family member will be required to
                    view the body of their loved ones before departure from
                    Omega Funeral Home premises.
                  </li>
                  <li>
                    The picture of the authorized family member will be taken
                    alone at the time of admission and with the remains at the
                    point of discharge.{" "}
                  </li>
                  <li>
                    {" "}
                    Relations are not allowed in the embalming room during
                    bathing and dressing of corpse. For hygienic purposes we DO
                    NOT ACCEPT TOILETRIES.
                  </li>
                  <li>
                    On the day of collection, authorized family member should be
                    in possession of the original admission form as this will be
                    collected and replaced with a discharge form.
                  </li>
                  <li>
                    {" "}
                    Please get expert information on the size of the corpse in
                    relation with the chosen casket as we will not be
                    responsible for any misappropriation.
                  </li>
                  <li>
                    We do not advice any form of payment to be made in advance
                    (excluding cemetery).
                  </li>
                  <li>
                    In the event of a refund (mortuary, funeral, or cemetery),
                    2% mobilization fee applies to the amount to be refunded.
                    Money refunded will only be paid into the same account
                    details that made the initial payment.
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
      </DialogContent>

      <DialogActions className="pr-24 justify-end">
        <Button
          variant="contained"
          color="primary"
          onClick={closeComposeDialog}
          type="submit"
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ProformaInvoiceDialog;
