import React, { useEffect, useCallback } from 'react';
import {
  CircularProgress,
  TextField,
  IconButton, Icon,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
  Toolbar,
  AppBar,
} from '@material-ui/core';
import { useForm } from '@fuse/hooks';
import { FuseChipSelect, FuseUtils } from '@fuse';
import { useDispatch, useSelector } from 'react-redux';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import moment from 'moment';
import _ from 'lodash';
import * as Actions from '../store/actions';
import InvoiceUploadImage from './InvoiceUploadImage';
import { MenuItem } from '@material-ui/core';

const defaultFormState = {
  account_to_deposit: "",
  amount_received: 0,
  bank_changes: "",
  customer_name: "",
  file: "",
  notes: "",
  org_key: "",
  payment_date: moment().format("YYYY-MM-DD"),
  payment_method: "CASH",
  receipt_number: ""
};

const paymentMethods = [
  "CASH",
  "CHEQUE",
  "BANK_TRANSFER",
  "CREDIT_DEBIT_CARD",
  "INTERNET_BANKING",
].map((method) => ({
  label: method.replaceAll("_", " "),
  value: method,
}));

function RecordPaymentDialog(props) {
  const dispatch = useDispatch();
  const loading = useSelector(({ invoicesApp }) => invoicesApp.invoices.loading);
  const recordPaymentDialog = useSelector(({ invoicesApp }) => invoicesApp.invoices.recordPaymentDialog);
  

  const { form, handleChange, setForm } = useForm(defaultFormState);

  const initDialog = useCallback(() => {
    /**
     * Dialog type: 'new'
     */
    if (recordPaymentDialog.data) {
  
      
      const { customer, receipt_number, receipt_id } = recordPaymentDialog.data
      setForm({
        ...defaultFormState,
        customer_name: customer?.firstName + " " + customer?.lastName,
        receipt_id: receipt_id,
        receipt_number: receipt_number,
      });
    }
  }, [recordPaymentDialog.data, setForm]);

  


  useEffect(() => {
    /**
     * After Dialog Open
     */
    if (recordPaymentDialog.props.open) {
      initDialog();
    }
  }, [recordPaymentDialog.props.open, initDialog]);

  function closeComposeDialog() {
    dispatch(Actions.closeNewRecordPaymentDialog());
  }

  function canBeSubmitted() {
    return (
      form.customer_name.length > 0 &&
      form.amount_received.length > 0 &&
      form.payment_method.length > 0 &&
      form.payment_date &&
      form.notes.length > 0
    );
  }

  const handleDateChange = (name) => (date) => {
    setForm({ ...form, [name]: moment(date).format('YYYY-MM-DD') })
  };

  const handleChipChange = (value, name) => {
    setForm({ ...form, [name]: value.value })
  };

  const handleFileCancel = () => {
    setForm({ ...form, file: "" })
  };
  
  const handleImageUpload = (event) => {
    const files = event.target.files;
    const name = event.target.name;
    FuseUtils.toBase64(files[0]).then(data => {
      setForm(_.set({ ...form }, name, data));
    })
  }

  function handleSubmit(event) {
    event.preventDefault();
    const { invoice } = recordPaymentDialog.data

    dispatch(Actions.recordInvoicePayment(form, invoice.id));
    closeComposeDialog();
  }

  return (
    <Dialog
      classes={{
        paper: 'm-24',
      }}
      {...recordPaymentDialog.props}
      onClose={closeComposeDialog}
      fullWidth
      maxWidth='xs'
    >
      <AppBar position='static' elevation={1}>
        <Toolbar className='flex'>
          <Typography variant='subtitle1' color='inherit'>
            Payment for <em>{recordPaymentDialog.data?.invoice?.invoiceNumber}</em>
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
              label='Customer'
              autoFocus
              id='customer-name'
              name='customer_name'
              disabled
              value={form.customer_name}
              onChange={handleChange}
              variant='outlined'
              required
              fullWidth
            /> 

            <TextField
              className='mb-24'
              label='Receipt Number'
              id='receipt-number'
              name='receipt_number'
              disabled
              value={form.receipt_number}
              onChange={handleChange}
              variant='outlined'
              required
              fullWidth
            />
          </div>

          <div className='flex'>
            <TextField
              className='mb-24'
              label='Amount Received (NGN)'
              id='amount_received'
              name='amount_received'
              value={form.amount_received}
              onChange={handleChange}
              variant='outlined'
              fullWidth
            />
          </div>

          <div className='flex space-x-2'>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                inputVariant='outlined'
                format='MM/dd/yyyy'
                id='payment-date'
                label='Payment Date'
                fullWidth
                value={form.payment_date}
                onChange={handleDateChange("payment_date")}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>

            <TextField
              className='mb-24'
              select
              label='Account receivable'
              id='account_to_deposit'
              name='account_to_deposit'
              disabled
              value={form.account_to_deposit}
              onChange={handleChange}
              variant='outlined'
              required
              fullWidth
            >
              <MenuItem value="">Select account receivable</MenuItem>  
            </TextField>  
          </div>
          <div className='flex items-center'>
            <FuseChipSelect
              className='mt-0 mb-20 w-full'
              value={_.find(paymentMethods, { value: form.payment_method })}
              onChange={(value) => handleChipChange(value, 'payment_method')}
              placeholder='Method'
              textFieldProps={{
                label: 'Payment Method',
                InputLabelProps: {
                  shrink: true,
                },
                variant: 'outlined',
              }}
              options={paymentMethods}
            />
          </div>

          <div className='flex flex-col'>
            <div className='min-w-48 mb-8'>
              <Typography>Notes</Typography>
            </div>
            <TextField
              className='mb-24'
              label='Notes'
              id='notes'
              name='notes'
              value={form.notes}
              onChange={handleChange}
              variant='outlined'
              multiline
              rows={5}
              fullWidth
            />
          </div>
          <div className='flex'>
            <InvoiceUploadImage handleImageUpload={handleImageUpload} />
            {form?.file && 
              <div className="border border-solid border-grey-light rounded-lg p-1 mx-4 relative">
                <IconButton onClick={handleFileCancel} className="absolute right-0" size="small">
                  <Icon>cancel</Icon>
                </IconButton>
                <img src={`data:image/jpg;base64,${form?.file}`} alt="" className="h-72 w-auto rounded-md" />
              </div>
            }
          </div>
        </DialogContent>

        <DialogActions className='justify-end pr-32 py-16'>
          <Button
            variant='contained'
            color='primary'
            onClick={handleSubmit}
            type='submit'
            disabled={loading ? loading : !canBeSubmitted()}
            endIcon={loading && <CircularProgress />}
          >
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default RecordPaymentDialog;
