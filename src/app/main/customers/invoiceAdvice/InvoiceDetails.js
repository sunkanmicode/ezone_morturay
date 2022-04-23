import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useRouteMatch} from "react-router-dom";
import moment from "moment"
import _ from "lodash";
import { FuseAnimate } from '@fuse';
import * as Actions from "../store/actions";
import * as invoiceActions from "../../invoice/store/actions";
import { Button, Table, TableHead, TableBody, TableRow, TableCell, TextField } from '@material-ui/core';
import InvoicePaymentDialog from "./InvoicePaymentDialog"

const defaultFormState = {
  amount_due: 0,
  bill_to: "",
  created_by: "",
  customer_id: null,
  invoice_date: moment().format("YYYY-MM-DDTHH:mm:ss"),
  invoice_number: "",
  notes: "",
  service: [
    { service_id: '', rate: '', discount_type_id: '', days: '', discount_amount: '', new_amount: '' }
  ],
  total_amount: 0
}

function PaymentAdviceDetails(props) {
  const dispatch = useDispatch();
  const [customer, setCustomer] = useState(null);
  const match = useRouteMatch();
  const paymentAdvice = useSelector(({customerApp}) => customerApp.invoices.paymentAdvice)
  const customers = useSelector(({customerApp}) => customerApp.customer.customers.customers)
  const services = useSelector(({customerApp}) => customerApp.services.services.services)
  
  const [form, setForm] = useState({ ...defaultFormState });

  console.log(form, "form")
  console.log(customer, "customer")
  console.log(services, "services")
  console.log(paymentAdvice, "paymentAdvice")

  useEffect(() => {
    dispatch(Actions.getPaymentAdvice(match.params.id));
    dispatch(Actions.getCustomers());
    dispatch(Actions.getServices());
  }, [dispatch, match.params.id]);

  useEffect(() => {
    _.set(paymentAdvice, 'customer_id', paymentAdvice?.customer);
    _.unset(paymentAdvice, 'customer');
    setForm({
      ...defaultFormState,
      ...paymentAdvice,
    })
    setCustomer(customers?.find(c => c.id === paymentAdvice?.customer_id))
  }, [paymentAdvice, customers])

  const handleChange = (event) => {
    const {name, value} = event.target
    setForm({...form, [name]: value})
  };

  const canSubmit = () => {
    const { notes } = form
    return notes.length > 0
  }

  const handleSubmit = () => {
    dispatch(invoiceActions.addInvoice(form));
  };

  return (
    <div className='flex items-center justify-between overflow-hidden'>
      <FuseAnimate delay={100}>
        <div className='flex flex-wrap mt-8'>
          <div className='w-full bg-white shadow overflow-hidden sm:rounded-lg'>
            <div className='px-4 py-2 sm:px-6'>
              <h1>
                <img
                  className='h-72'
                  src='/assets/images/profile/omega-homes.svg'
                  alt=''
                />
              </h1>
              <h3 className='text-xl leading-6 font-bold text-gray-900'>
                Invoice
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className='border-t border-gray-200'>
                <dl>
                  <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                    <dt className='text-sm font-medium text-gray-500'>
                      Invoice number:
                    </dt>
                    <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                      {paymentAdvice?.invoice_number}
                    </dd>
                  </div>
                  <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                    <dt className='text-sm font-medium text-gray-500'>
                      Invoice date:      
                    </dt>
                    <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                      {moment(paymentAdvice?.invoice_date).format("Do MMMM, YYYY")}
                    </dd>
                  </div>
                  <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                    <dt className='text-sm font-medium text-gray-500'>
                      Due date:
                    </dt>
                    <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                      {moment(paymentAdvice?.invoice_date).format("Do MMMM, YYYY")}
                    </dd>
                  </div>
                </dl>
              </div>
              <div className='border-t border-gray-200'>
                <dl>
                  <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                    <dt className='text-sm font-medium text-gray-500'>
                      Bill To:
                    </dt>
                  </div>
                  <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6'>
                    <dt className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                      {customer?.first_name} {customer?.last_name}
                    </dt>
                  </div>
                  <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                    <dt className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                      {customer?.email}
                    </dt>
                  </div>
                  <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                    <dt className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                      {paymentAdvice?.bill_to}
                    </dt>
                  </div>
                </dl>
              </div>
            </div>
            <div>
              <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                <dt className='text-sm font-medium text-gray-500 sm:col-span-1'>
                  Notes:
                </dt>
                <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                  {/* <div contentEditable spellCheck onChange={handleChange}>Hello world</div> */}
                  {paymentAdvice?.notes}
                  <TextField
                    className='mb-24'
                    id='notes'
                    label='Notes'
                    name="notes"
                    onChange={handleChange}
                    value={form.notes}
                    variant='outlined'
                    fullWidth
                  />
                </dd>
              </div>
            </div>
          </div>

          <div className='w-full bg-white shadow overflow-hidden sm:rounded-lg'>
            <div className='px-4 py-5 sm:px-6'>
              <h3 className='text-lg leading-6 font-medium text-gray-900'>
                Services
              </h3>
            </div>
            <Table className='border-t border-gray-200'>
              <TableHead>
                <TableRow>
                  <TableCell>Services</TableCell>
                  <TableCell>Discount</TableCell>
                  <TableCell>Days</TableCell>
                  <TableCell>Rate</TableCell>
                  <TableCell>Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paymentAdvice?.service.map(s => 
                  <TableRow className='' key={s.service_id}>
                    <TableCell className=''>{_.find(services, {id: s.service_id})?.service_name}</TableCell>
                    <TableCell className=''>{s.discount_amount}</TableCell>
                    <TableCell className=''>{s.days}</TableCell>
                    <TableCell className=''>{s.rate}</TableCell>
                    <TableCell className=''>{s.discount_amount}</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="w-full flex justify-end mt-8">
            <Button color="primary" variant="contained" disabled={!canSubmit()} onClick={handleSubmit}>
              Save
            </Button>
          </div>
        </div>
      </FuseAnimate>

      <InvoicePaymentDialog />
    </div>
  );
}

export default PaymentAdviceDetails;
