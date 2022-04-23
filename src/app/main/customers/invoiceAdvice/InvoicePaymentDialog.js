import React, { useEffect, useCallback } from 'react';
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Icon,
  IconButton,
  Typography,
  Toolbar,
  AppBar,
} from '@material-ui/core';
import { useForm } from '@fuse/hooks';
import FuseUtils from '@fuse/FuseUtils';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../store/actions';

const defaultFormState = {
  id: '',
  from: '',
  to: '',
  cc: '',
  subject: '',
  message: '',
};

function InvoicePaymentDialog(props) {
  const dispatch = useDispatch();
  const invoiceDialog = useSelector(
    ({ customerApp }) => customerApp.payments.paymentDialog
  );

  const { form, handleChange, setForm } = useForm(defaultFormState);

  const initDialog = useCallback(() => {
    /**
     * Dialog type: 'edit'
     */
    if (invoiceDialog.type === 'edit' && invoiceDialog.data) {
      setForm({ ...invoiceDialog.data });
    }

    /**
     * Dialog type: 'new'
     */
    if (invoiceDialog.type === 'new') {
      setForm({
        ...defaultFormState,
        ...invoiceDialog.data,
        id: FuseUtils.generateGUID(),
      });
    }
  }, [invoiceDialog.data, invoiceDialog.type, setForm]);

  useEffect(() => {
    /**
     * After Dialog Open
     */
    if (invoiceDialog.open) {
      initDialog();
    }
  }, [invoiceDialog.open, initDialog]);

  function closeComposeDialog() {
    invoiceDialog.type === 'edit'
      ? dispatch(Actions.closeInvoicePaymentDialog())
      : dispatch(Actions.closeInvoicePaymentDialog());
  }

  function canBeSubmitted() {
    return form.from.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (invoiceDialog.type === 'new') {
      // dispatch(Actions.addInvoice(form));
    } else {
      // dispatch(Actions.updateInvoice(form));
    }
    closeComposeDialog();
  }

  function handleRemove() {
    // dispatch(Actions.removeInvoice(form.id));
    closeComposeDialog();
  }

  return (
    <Dialog
      classes={{
        paper: 'm-24',
      }}
      open={invoiceDialog.open}
      onClose={closeComposeDialog}
      fullWidth
      maxWidth='xs'
    >
      <AppBar position='static' elevation={1}>
        <Toolbar className='flex w-full'>
          <Typography variant='subtitle1' color='inherit'>
            {invoiceDialog.type === 'new' ? 'Send Invoice' : 'Edit Invoice'}
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
            <div className='min-w-48 pt-20'>
              <Typography>From</Typography>
            </div>

            <TextField
              className='mb-24'
              label='From'
              autoFocus
              id='from'
              name='from'
              value={form.from}
              onChange={handleChange}
              variant='outlined'
              required
              fullWidth
            />
          </div>

          <div className='flex space-x-2'>
            <div className='min-w-48 pt-20'>
              <Typography>To</Typography>
            </div>
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
            <div className='min-w-48 pt-20'>
              <Typography>CC</Typography>
            </div>
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
            <div className='min-w-48 pt-20'>
              <Typography>Subject</Typography>
            </div>
            <TextField
              className='mb-24'
              label='Subject'
              id='subject'
              name='subject'
              value={form.subject}
              onChange={handleChange}
              variant='outlined'
              fullWidth
            />
          </div>

          <div className='flex flex-col'>
            <div className='min-w-48 pt-20 mb-8'>
              <Typography>Message</Typography>
            </div>
            <TextField
              className='mb-24'
              label='Message'
              id='message'
              name='message'
              value={form.message}
              onChange={handleChange}
              variant='outlined'
              multiline
              rows={5}
              fullWidth
            />
          </div>
        </DialogContent>

        {invoiceDialog.type === 'new' ? (
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
            <IconButton onClick={handleRemove}>
              <Icon>delete</Icon>
            </IconButton>
          </DialogActions>
        )}
      </form>
    </Dialog>
  );
}

export default InvoicePaymentDialog;
