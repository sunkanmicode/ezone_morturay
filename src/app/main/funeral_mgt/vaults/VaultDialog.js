import React, { useState, useEffect, useCallback } from 'react';
import {
  TextField,
  Button,
  Divider,
  IconButton,
  Icon,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
  Toolbar,
  AppBar,
  CircularProgress,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import moment from 'moment';
import _ from '@lodash';
import * as Actions from '../store/actions';
import { MenuItem } from '@material-ui/core';

const defaultFormState = {
  address: '',
  branch_id: '',
  // email_address: '',
  // phone_number: '',
  purchaser_one: { name: '', email: '', phone_number: '' },
  purchaser_two: { name: '', email: '', phone_number: '' },
  vault_number: '',
  vault_type: '',
  deceased: [],
};

const vaultTypes = [
  { label: 'SINGLE', value: 'SINGLE_VAULT', num: 1 },
  { label: 'DOUBLE', value: 'DOUBLE_VAULT', num: 2 },
  { label: 'TRIPLE', value: 'TRIPLE_VAULT', num: 3 },
];

const vaultTypeDropdown = vaultTypes.map((plot) => (
  <MenuItem key={plot.value} value={plot.label}>
    {plot.label}
  </MenuItem>
));

function VaultDialog(props) {
  const dispatch = useDispatch();
  const vaultDialog = useSelector(
    ({ vaultsApp }) => vaultsApp.vaults.vaultDialog
  );
  const loading = useSelector(({ vaultsApp }) => vaultsApp.vaults.loading);
  const branches = useSelector(({ ezone }) => ezone.branches.branches);
  

  const [form, setForm] = useState(defaultFormState);

  const handleChange = (event) => {
    event.persist();
    if (event.target.name === 'vault_type') {
      let deceased = [];
      let num = _.find(vaultTypes, { label: event.target.value })?.num;
      _.range(0, num).forEach((n, i) => {
        deceased = [...deceased, { name_of_deceased: '', date_buried: null }];
      });
      setForm({ ...form, [event.target.name]: event.target.value, deceased });
    } else {
      setForm((form) =>
        _.set({ ...form }, event.target.name, event.target.value)
      );
    }
  };

  const handleMultiChange = (i) => (event) => {
    const prevDeceased = [...form.deceased];
    prevDeceased[i][event.target.name] = event.target.value;
    setForm({ ...form, deceased: prevDeceased });
  };

  const handleDateChange = (name, index) => (date) => {
    const nextDeceased = [...form.deceased];
    nextDeceased[index][name] = moment(date).format('YYYY-MM-DDTHH:mm:ss');
    setForm({ ...form, deceased: nextDeceased });
  };


  const initDialog = useCallback(() => {
    /**
     * Dialog type: 'edit'
     */
    if (vaultDialog.type === 'edit' && vaultDialog.data) {
      setForm({ ...vaultDialog.data });
    }

    /**
     * Dialog type: 'new'
     */
    if (vaultDialog.type === 'new') {
      setForm({
        ...defaultFormState,
      });
    }
  }, [vaultDialog.data, vaultDialog.type, setForm]);

  useEffect(() => {
    /**
     * After Dialog Open
     */
    if (vaultDialog.props.open) {
      initDialog();
    }
  }, [vaultDialog.props.open, initDialog]);

  function closeComposeDialog() {
    vaultDialog.type === 'edit'
      ? dispatch(Actions.closeVaultDialog())
      : dispatch(Actions.closeVaultDialog());
  }

  function canBeSubmitted() {
    return (
      form.vault_type &&
      form.deceased.length > 0 &&
      !_.every(form.purchaser_one, _.isEmpty)
    );
  }

  const addDeceased = () => {
    const deceasedObject = { name_of_deceased: '', date_buried: null };

    setForm({ ...form, deceased: [...form.deceased, deceasedObject] });
  };

  const removeDeceased = (i) => () => {
    const newDeceased = [...form.deceased];
    newDeceased.splice(i, 1);
    setForm({ ...form, deceased: newDeceased });
  };

  function handleSubmit(event) {
    event.preventDefault();

    if (vaultDialog.type === 'new') {
      dispatch(Actions.createVault(form));
    } else {
      dispatch(Actions.updateVault(form, form.id));
    }
    closeComposeDialog();
  }

  return (
    <Dialog
      classes={{
        paper: 'm-24',
      }}
      {...vaultDialog.props}
      onClose={closeComposeDialog}
      fullWidth
      maxWidth='sm'
    >
      <AppBar position='static' elevation={1}>
        <Toolbar className='flex'>
          <Typography variant='subtitle1' color='inherit'>
            {vaultDialog.type === 'new' ? 'New Vault' : 'Edit Vault'}
          </Typography>
        </Toolbar>
      </AppBar>
      <form
        noValidate
        onSubmit={handleSubmit}
        className='flex flex-col overflow-hidden'
      >
        <DialogContent classes={{ root: 'p-24' }}>
          <div className='flex space-x-4'>
            <TextField
              className='mb-16'
              required
              select
              label='Branch'
              id='branch_id'
              name='branch_id'
              value={form.branch_id}
              onChange={handleChange}
              variant='outlined'
              fullWidth
            >
              <MenuItem value=''>Select branch</MenuItem>
              {branches.map((b) => (
                <MenuItem key={b.id} value={b.id}>
                  {b.name}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              className='mb-24'
              required
              select
              label='Vault type'
              autoFocus
              id='vault_type'
              name='vault_type'
              value={form.vault_type}
              onChange={handleChange}
              variant='outlined'
              fullWidth
            >
              <MenuItem value=''>Select plot type</MenuItem>
              {vaultTypeDropdown}
            </TextField>
          </div>

          {form.deceased.length > 0 && (
            <label className='block text-sm font-bold mb-8'>Deceased</label>
          )}
          {form.deceased.map((n, i) => (
            <div key={i} className='flex items-center space-x-8'>
              <TextField
                className='mb-16'
                label='Name of deceased'
                id={`name_of_deceased-${i}`}
                name='name_of_deceased'
                value={n.name_of_deceased}
                onChange={handleMultiChange(i)}
                variant='outlined'
                fullWidth
              />

              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  className='mb-16'
                  inputVariant='outlined'
                  format='MM/dd/yyyy'
                  id={`date_buried-${i}`}
                  label='Date buried'
                  fullWidth
                  value={n.date_buried}
                  onChange={handleDateChange('date_buried', i)}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
              {form.vault_type === 'FAMILY' && (
                <IconButton onClick={removeDeceased(i)}>
                  <Icon>close</Icon>
                </IconButton>
              )}
            </div>
          ))}
          {form.vault_type === 'FAMILY' && (
            <Button
              className='mb-24'
              variant='contained'
              disableElevation
              onClick={addDeceased}
              startIcon={<Icon>add</Icon>}
            >
              Add
            </Button>
          )}

          {form.deceased.length > 0 && <Divider className='mb-24 mt-8' />}

          {/* <div className='flex space-x-4'>
            <TextField
              className='mb-24'
              label='Email address'
              id='email_address'
              type='email'
              name='email_address'
              value={form.email_address}
              onChange={handleChange}
              variant='outlined'
              fullWidth
            />

            <TextField
              className='mb-24'
              label='Phone number'
              id='phone_number'
              name='phone_number'
              value={form.phone_number}
              type='number'
              onChange={handleChange}
              variant='outlined'
              fullWidth
            />
          </div> */}

          <div className='flex flex-col'>
            <label className='text-sm font-medium mb-2'>Purchaser one</label>
            <div className='grid grid-cols-6 gap-x-2'>
              <div className='sm:col-span-3 col-span-6'>
                <TextField
                  className='mb-16'
                  required
                  label='Name'
                  id='purchaser_one_name'
                  name='purchaser_one.name'
                  value={form.purchaser_one.name}
                  onChange={handleChange}
                  variant='outlined'
                  fullWidth
                />
              </div>
              <div className='sm:col-span-3 col-span-6'>
                <TextField
                  className='mb-16'
                  required
                  label='Email'
                  type='email'
                  id='purchaser_one_email'
                  name='purchaser_one.email'
                  value={form.purchaser_one.email}
                  onChange={handleChange}
                  variant='outlined'
                  fullWidth
                />
              </div>
              <div className='sm:col-span-3 col-span-6'>
                <TextField
                  className='mb-16'
                  required
                  label='Phone number'
                  id='purchaser_one_phone_number'
                  name='purchaser_one.phone_number'
                  value={form.purchaser_one.phone_number}
                  onChange={handleChange}
                  variant='outlined'
                  fullWidth
                />
              </div>
            </div>
          </div>

          <div className='flex flex-col'>
            <label className='text-sm font-medium mb-2'>Purchaser two</label>
            <div className='grid grid-cols-6 gap-x-2'>
              <div className='sm:col-span-3 col-span-6'>
                <TextField
                  className='mb-24'
                  label='Name'
                  id='purchaser_two_name'
                  name='purchaser_two.name'
                  value={form.purchaser_two.name}
                  onChange={handleChange}
                  variant='outlined'
                  fullWidth
                />
              </div>
              <div className='sm:col-span-3 col-span-6'>
                <TextField
                  className='mb-24'
                  label='Email'
                  type='email'
                  id='purchaser_two_email'
                  name='purchaser_two.email'
                  value={form.purchaser_two.email}
                  onChange={handleChange}
                  variant='outlined'
                  fullWidth
                />
              </div>
              <div className='sm:col-span-3 col-span-6'>
                <TextField
                  className='mb-24'
                  label='Phone number'
                  id='purchaser_two_phone_number'
                  name='purchaser_two.phone_number'
                  value={form.purchaser_two.phone_number}
                  onChange={handleChange}
                  variant='outlined'
                  fullWidth
                />
              </div>
            </div>
          </div>

          <div className='flex flex-col'>
            <div className='min-w-48 pt-0 mb-8'>
              <Typography>Address</Typography>
            </div>
            <TextField
              className='mb-8'
              label='Address'
              id='address'
              name='address'
              value={form.address}
              onChange={handleChange}
              variant='outlined'
              multiline
              rows={2}
              fullWidth
            />
          </div>
        </DialogContent>

        <DialogActions className='justify-end pr-24 pb-16'>
          {vaultDialog.type === 'new' ? (
            <Button
              variant='contained'
              color='primary'
              onClick={handleSubmit}
              type='submit'
              disabled={!canBeSubmitted()}
              endIcon={loading && <CircularProgress size={16} />}
            >
              Add
            </Button>
          ) : (
            <Button
              variant='contained'
              color='primary'
              type='submit'
              onClick={handleSubmit}
              disabled={!canBeSubmitted()}
              endIcon={loading && <CircularProgress size={16} />}
            >
              Update
            </Button>
          )}
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default VaultDialog;
