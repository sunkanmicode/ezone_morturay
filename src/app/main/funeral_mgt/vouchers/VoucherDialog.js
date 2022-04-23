import React, { useEffect, useCallback } from 'react';
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Link,
  Typography,
  Toolbar,
  AppBar,
} from '@material-ui/core';
import { useForm } from '@fuse/hooks';
import FuseUtils from '@fuse/FuseUtils';
import { FuseChipSelect } from '@fuse';
import { useDispatch, useSelector } from 'react-redux';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import moment from 'moment';
import * as Actions from '../store/actions';

const defaultFormState = {
  id: '',
  customer: '',
  receiptNumber: '',
  amountReceived: '',
  bankCharges: '',
  paymentDate: moment().format('YYYY-MM-DDTHH:mm:ss'),
  amountDeposit: '',
  paymentMethod: '',
  notes: '',
};

function VoucherDialog(props) {
  const dispatch = useDispatch();
  const voucherDialog = useSelector(
    ({ vouchersApp }) => vouchersApp.vouchers.voucherDialog
  );

  const { form, handleChange, setForm } = useForm(defaultFormState);

  const initDialog = useCallback(() => {
    /**
     * Dialog type: 'edit'
     */
    if (voucherDialog.type === 'edit' && voucherDialog.data) {
      setForm({ ...voucherDialog.data });
    }

    /**
     * Dialog type: 'new'
     */
    if (voucherDialog.type === 'new') {
      setForm({
        ...defaultFormState,
        ...voucherDialog.data,
        id: FuseUtils.generateGUID(),
      });
    }
  }, [voucherDialog.data, voucherDialog.type, setForm]);

  useEffect(() => {
    /**
     * After Dialog Open
     */
    if (voucherDialog.props.open) {
      initDialog();
    }
  }, [voucherDialog.props.open, initDialog]);

  function closeComposeDialog() {
    voucherDialog.type === 'edit'
      ? dispatch(Actions.closeVoucherDialog())
      : dispatch(Actions.closeVoucherDialog());
  }

  function canBeSubmitted() {
    return form.customer.length > 0;
  }

  const handleDateChange = (name) => (date) => {
    setForm({ ...form, [name]: moment(date).format('YYYY-MM-DDTHH:mm:ss') });
  };

  const handleChipChange = () => {};

  function handleSubmit(event) {
    event.preventDefault();

    if (voucherDialog.type === 'new') {
      dispatch(Actions.generateVoucher(form));
    } else {
      dispatch(Actions.generateVoucher(form));
    }
    closeComposeDialog();
  }

  return (
    <Dialog
      classes={{
        paper: 'm-24',
      }}
      {...voucherDialog.props}
      onClose={closeComposeDialog}
      fullWidth
      maxWidth='xs'
    >
      <AppBar position='static' elevation={1}>
        <Toolbar className='flex w-full'>
          <Typography variant='subtitle1' color='inherit'>
            {voucherDialog.type === 'new' ? 'New Voucher' : 'Edit Payment'}
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
              id='customer'
              name='customer'
              value={form.customer}
              onChange={handleChange}
              variant='outlined'
              required
              fullWidth
            />

            <TextField
              className='mb-24'
              label='Receipt Number'
              autoFocus
              id='receipt-number'
              name='receiptNumber'
              value={form.receiptNumber}
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
              id='amountReceived'
              name='amount-received'
              value={form.amountReceived}
              onChange={handleChange}
              variant='outlined'
              fullWidth
            />
          </div>

          <div className='flex space-x-2'>
            <TextField
              className='mb-24'
              label='Bank Charges'
              id='bank-charges'
              name='bankCharges'
              value={form.bankCharges}
              onChange={handleChange}
              variant='outlined'
              fullWidth
            />
          </div>

          <div className='flex space-x-2'>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                variant='inline'
                inputVariant='outlined'
                format='dd/MM/yyyy'
                id='payment-date'
                label='Payment Date'
                fullWidth
                value={form.paymentDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>
            <FuseChipSelect
              className='mt-0 mb-24 w-full'
              value={form.amountDeposit}
              onChange={(value) => handleChipChange(value, 'amount')}
              placeholder=''
              textFieldProps={{
                label: 'Amount to Deposit',
                InputLabelProps: {
                  shrink: true,
                },
                variant: 'outlined',
              }}
              options={['Cash', 'Transfer'].map((method) => ({
                label: method,
                value: method,
              }))}
              isMulti
            />
          </div>
          <div className='flex items-center space-x-2'>
            <FuseChipSelect
              className='mt-0 mb-24 w-full'
              value={form.paymentMethod}
              onChange={(value) => handleChipChange(value, 'paymentMethod')}
              placeholder='Method'
              textFieldProps={{
                label: 'Payment Method',
                InputLabelProps: {
                  shrink: true,
                },
                variant: 'outlined',
              }}
              options={['Cash', 'Transfer'].map((method) => ({
                label: method,
                value: method,
              }))}
              isMulti
            />
            <Link className='whitespace-no-wrap' href='/'>
              Add new
            </Link>
          </div>

          <div className='flex flex-col'>
            <div className='min-w-48 pt-20 mb-8'>
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
        </DialogContent>

        {voucherDialog.type === 'new' ? (
          <DialogActions className='justify-between pl-16'>
            <Button
              variant='contained'
              color='primary'
              onClick={handleSubmit}
              type='submit'
              disabled={!canBeSubmitted()}
            >
              Add
            </Button>
          </DialogActions>
        ) : (
          <DialogActions className='justify-between pl-16'>
            <Button
              variant='contained'
              color='primary'
              type='submit'
              onClick={handleSubmit}
              disabled={!canBeSubmitted()}
            >
              Save
            </Button>
          </DialogActions>
        )}
      </form>
    </Dialog>
  );
}

export default VoucherDialog;
