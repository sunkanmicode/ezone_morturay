import React, { useEffect, useCallback } from 'react';
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
  Toolbar,
  AppBar,
  MenuItem,
} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
import { useForm } from '@fuse/hooks';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../store/actions';
import moment from 'moment';
import InvoiceUploadImage from "./InvoiceUploadImage"

const defaultFormState = {
  account_to_deposit: "",
  amount_received: 0,
  bank_changes: "",
  customer_name: "",
  file: "",
  notes: "",
  org_key: "",
  payment_date: moment().format("YYYY-MM-DDTHH:mm:ss"),
  payment_method: "Cash", // Bank
  receipt_id: 0,
  receipt_number: ""
};

function PaymentDialog(props) {
  const dispatch = useDispatch();
  const paymentDialog = useSelector(
    ({ invoicesApp }) => invoicesApp.invoices.paymentDialog
  );

  const { form, handleChange, setForm } = useForm(defaultFormState);

  const initDialog = useCallback(() => {
    /**
     * Dialog type: 'new'
     */
    if (paymentDialog.data) {
      setForm({
        ...defaultFormState,
        ...paymentDialog.data,
      });
    }
  }, [paymentDialog.data, setForm]);

  useEffect(() => {
    /**
     * After Dialog Open
     */
    if (paymentDialog.props.open) {
      initDialog();
    }
  }, [paymentDialog.props.open, initDialog]);

  function closeComposeDialog() {
    dispatch(Actions.closeInvoicePaymentDialog())
  }

  function canBeSubmitted() {
    return form.account_to_deposit.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();

    dispatch(Actions.sendInvoice(form));
    closeComposeDialog();
  }

  return (
    <Dialog
      classes={{
        paper: 'm-24',
      }}
      {...paymentDialog.props}
      onClose={closeComposeDialog}
      fullWidth
      maxWidth='xs'
    >
      <AppBar position='static' elevation={1}>
        <Toolbar className='flex w-full'>
          <Typography variant='subtitle1' color='inherit'>
            Invoice Payment
          </Typography>
        </Toolbar>
      </AppBar>
      <form
        noValidate
        onSubmit={handleSubmit}
        className='flex flex-col overflow-hidden'
      >
        <DialogContent classes={{ root: 'p-24' }}>
          <div className='flex space-x-2'>
            <TextField
              className='mb-24'
              label='Account to deposit'
              autoFocus
              id='account_to_deposit'
              name='account_to_deposit'
              value={form.account_to_deposit}
              onChange={handleChange}
              variant='outlined'
              required
              fullWidth
            />
          </div>

          <div className='flex space-x-2'>
            <TextField
              className='mb-24'
              label='To'
              id='to'
              name='to'
              value={form.to}
              onChange={handleChange}
              variant='outlined'
              fullWidth
            />
          </div>

          <div className='flex space-x-2'>
            <TextField
              className='mb-24'
              label='CC'
              id='cc'
              name='cc'
              value={form.cc}
              onChange={handleChange}
              variant='outlined'
              fullWidth
            />
          </div>

          <div className='flex space-x-2'>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                margin='normal'
                format="dd/MM/yyyy"
                inputVariant='outlined'
                id='payment_date'
                label='Payment Date'
                value={form.payment_date}
                onChange={handleDateChange("payment_date")}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>
          </div>

          <div className='flex space-x-2'>
            <TextField
              className='mb-24'
              label='Payment Method'
              id='payment_method'
              name='payment_method'
              value={form.payment_method}
              onChange={handleChange}
              variant='outlined'
              fullWidth
            >
              <MenuItem value="">Select payment method</MenuItem>
              {["Cash", "Bank"].map(m => 
                <MenuItem key={m} value={m}>{m}</MenuItem>
              )}
            </TextField>
          </div>

          <div className='flex flex-col'>
            <InvoiceUploadImage />
          </div>
        </DialogContent>

        <DialogActions className='justify-between pl-16'>
          <Button
            variant='contained'
            color='primary'
            onClick={handleSubmit}
            type='submit'
            disabled={!canBeSubmitted()}
          >
            Pay
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default PaymentDialog;
