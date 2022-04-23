import React, { useEffect, useCallback } from 'react';
import _ from 'lodash';
import {
  AppBar,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  MenuItem,
  Typography,
  Toolbar,
  CircularProgress,
} from '@material-ui/core';
import { useForm } from '@fuse/hooks';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../store/actions';
import Dropzone from './Dropzone';

const relationships = ["Brother", "Sister", "Mother", "Father", "Son", "Daughter", "Others"].map(r => ({
  label: r,
  value: r,
}))

const defaultFormState = {
  address: "",
  branch_id: "",
  customer_image: "",
  email: "",
  first_name: "",
  id: 0,
  last_name: "",
  org_key: "",
  other_name: "",
  phone_number: "",
  relationship_with_deceased: "",
  signature: ""
};

const blacklist = ['customer_image', 'customer_number', 'document', 'deceased', 'invoice', 'service']

function CustomerDialog(props) {
  const dispatch = useDispatch();
  const branches = useSelector(({ ezone }) => ezone.branches.branches);
  const loading = useSelector(({ customerApp }) => customerApp.customer.loading);
  const customerDialog = useSelector(({ customerApp }) => customerApp.customer.customerDialog);


  const { form, handleChange, setForm } = useForm(defaultFormState);

  // const custDialog = useSelector(({ customerApp }) => customerApp.customer.customerDialog);
  

  const initDialog = useCallback(() => {
    
    if (customerDialog.data) {
      setForm({
        ...defaultFormState, 
        ..._.omit(customerDialog.data, blacklist) 
      });
    }
  }, [customerDialog.data, setForm]);

  console.log(customerDialog.data, "customerDialog.data");

  useEffect(() => {
    /**
     * After Dialog Open
     */
    if (customerDialog.props.open) {
      initDialog();
    }
  }, [customerDialog.props.open, initDialog]);

  function closeComposeDialog() {
    dispatch(Actions.closeEditCustomerDialog())
  }

  function canBeSubmitted() {
    return (
      form.first_name.length > 0 &&
      form.last_name.length > 0 &&
      form.other_name.length > 0 &&
      form.phone_number.length > 0 &&
      form.branch_id
    )
  }

  function onSubmit(event) {
    event.preventDefault();
    dispatch(Actions.updateCustomer(form.id, form));
  }

  return (
    <Dialog
      classes={{
        paper: 'm-24',
      }}
      open={customerDialog.props.open}
      onClose={closeComposeDialog}
      fullWidth
      maxWidth='xs'
    >
      <AppBar position='static' elevation={1}>
        <Toolbar className='flex'>
          <Typography variant='subtitle1' color='inherit'>
            Update Customer
          </Typography>
        </Toolbar>
      </AppBar>
      <form
        noValidate
        onSubmit={onSubmit}
        className='flex flex-col overflow-hidden'
      >
        <DialogContent classes={{ root: 'p-24' }}>
          <div className='flex space-x-2'>
            <TextField
              className='mb-16'
              label='First name'
              autoFocus
              id='first_name'
              name='first_name'
              value={form.first_name}
              onChange={handleChange}
              variant='outlined'
              required
              fullWidth
            />
            <TextField
              className='mb-16'
              label='Last name'
              autoFocus
              id='last_name'
              name='last_name'
              value={form.last_name}
              onChange={handleChange}
              variant='outlined'
              required
              fullWidth
            />
          </div>

          <div className='flex space-x-2'>
            <TextField  
              className='mb-16'
              label='Other name'
              autoFocus
              id='other_name'
              name='other_name'
              value={form.other_name}
              onChange={handleChange}
              variant='outlined'
              required
              fullWidth
            />

            <TextField
              className='mb-16'
              required
              select
              label='Relationship with deceased'
              id='relationship_with_deceased'
              name='relationship_with_deceased'
              value={form.relationship_with_deceased}
              onChange={handleChange}
              variant='outlined'
              fullWidth
            >
              <MenuItem value="">Select relation with deceased</MenuItem>
              {relationships.map(r => 
                <MenuItem key={r.value} value={r.value}>{r.value}</MenuItem>
              )}
            </TextField> 
          </div>
          
          <div className='flex'>
            <TextField  
              className='mb-16'
              label='Email'
              type="email"
              id='email'
              name='email'
              value={form.email}
              onChange={handleChange}
              variant='outlined'
              required
              fullWidth
            />
          </div>

          <div className='flex space-x-2'>
            <TextField  
              className='mb-16'
              label='Phone number'
              id='phone_number'
              name='phone_number'
              value={form.phone_number}
              onChange={handleChange}
              variant='outlined'
              required
              fullWidth
            />

            <TextField  
              className='mb-16'
              select
              label='Branch'
              id='branch_id'
              name='branch_id'
              value={form.branch_id}
              onChange={handleChange}
              variant='outlined'
              fullWidth
            >
              <MenuItem value="">Select branch</MenuItem>
              {branches.map(b => 
                <MenuItem key={b.id} value={b.id}>
                  {b.name}
                </MenuItem>
              )}
            </TextField>
          </div>

          <div className="flex">
            <TextField  
              className='mb-16'
              label='address'
              id='address'
              name='address'
              value={form.address}
              onChange={handleChange}
              variant='outlined'
              required
              multiline
              rows={2}
              fullWidth
            />
          </div>

          <div className="flex space-x-2">
            <Dropzone icon="wallpaper" disabled={!customerDialog.data} />
            <Dropzone icon="wallpaper" disabled={!customerDialog.data} />
          </div>
        </DialogContent>

        <DialogActions className='justify-end pr-24'>
          <Button
            variant='contained'
            color='primary'
            type='submit'
            disabled={!canBeSubmitted()}
            endIcon={loading && <CircularProgress size={16} />}
          >
            Update
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default CustomerDialog;
