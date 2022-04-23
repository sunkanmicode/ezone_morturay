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
} from '@material-ui/core';
import { useForm } from '@fuse/hooks';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../store/actions';
import InvoiceUploadImage from './InvoiceUploadImage';

const defaultFormState = {
  from: '',
  bill_to: '',
  subject: '',
  message: '',
  invoice: null
};

function SendInvoiceDialog(props) {
  const dispatch = useDispatch();
  const invoiceDialog = useSelector(({ invoicesApp }) => invoicesApp.invoices.sendInvoiceDialog);
  const user = useSelector(({ auth }) => auth.user.data);
  ;

  
 


  const { form, handleChange, setForm } = useForm(defaultFormState);
 console.log(form, 'fromsend');

  const initDialog = useCallback(() => {
  /**
   * Dialog type: 'new'
   */
  console.log(invoiceDialog, 'invoiceDialog.data');
  const { customer } = invoiceDialog.data 
    setForm({
      ...defaultFormState,
      bill_to: customer?.email,
      from: user?.organisation?.emailAddress,
      invoice: invoiceDialog.data
    });
  }, [invoiceDialog.data, user, setForm]);

  useEffect(() => {
    /**
     * After Dialog Open
     */
    if (invoiceDialog.props.open) {
      initDialog();
    }
  }, [invoiceDialog.props.open, initDialog]);

  function closeComposeDialog() {
    dispatch(Actions.closeSendInvoiceDialog());
  }

  function canBeSubmitted() {
    return form.message.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    const { invoice: { customer: {id} } } = form
    dispatch(Actions.sendInvoice(form, id));
    closeComposeDialog();
  }

  return (
    <Dialog
      classes={{
        paper: 'm-24',
      }}
      {...invoiceDialog.props}
      onClose={closeComposeDialog}
      fullWidth
      maxWidth='xs'
    >
      <AppBar position='static' elevation={1}>
        <Toolbar className='flex'>
          <Typography variant='subtitle1' color='inherit'>
            Send Invoice
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
            <div className='min-w-48'>
              <Typography>From</Typography>
            </div>

            <TextField
              className='mb-24'
              label='From'
              autoFocus
              InputProps={{disabled: true}}
              id='from'
              name='from'
              value={form.from}
              variant='outlined'
              required
              fullWidth
            />
          </div>

          <div className='flex space-x-2'>
            <div className='min-w-48'>
              <Typography>To</Typography>
            </div>
            <TextField
              className='mb-16'
              label='To'
              id='to'
              InputProps={{disabled: true}}
              name='bill_to'
              value={form.bill_to}
              onChange={handleChange}
              variant='outlined'
              fullWidth
            />
          </div>

          <div className='flex flex-col space-y-2'>
            <div className='min-w-48'>
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

          <div className='flex flex-col space-y-2'>
            <div className='min-w-48 pt-20'>
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
          <div className='flex mt-16'>
            <InvoiceUploadImage />
          </div>
        </DialogContent>

        <DialogActions className='justify-end pr-24'>
          <Button
            variant='contained'
            color='primary'
            onClick={handleSubmit}
            type='submit'
            disabled={!canBeSubmitted()}
          >
            Send invoice
          </Button>
          <Button
            variant='outlined'
            color='default'
            onClick={closeComposeDialog}
          >
            Cancel
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default SendInvoiceDialog;
