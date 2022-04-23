import React, { useEffect, useCallback } from 'react';
import {
  IconButton,
  CircularProgress,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
  Toolbar,
  AppBar,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import CloseIcon from '@material-ui/icons/Close';
import { useForm } from '@fuse/hooks';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../store/actions';
import * as appActions from '../../../store/actions';


const defaultFormState = {
  partyId: '',
  bankId: '',
  accountName: '',
  accountNumber: '',
};

function BranchDialog(props) {
  const dispatch = useDispatch();
  const branchDialog = useSelector(
    ({ settingsApp }) => settingsApp.branch.branchDialog
  );
  const loading = useSelector(({ settingsApp }) => settingsApp.branch.loading);
  const banks = useSelector(({ settingsApp }) => settingsApp.banks.banks);


  const { form, setForm } = useForm(defaultFormState);

  const initDialog = useCallback(() => {
    if (branchDialog.data) {
      const { id, bankAccount } = branchDialog.data;

      setForm({
        ...defaultFormState,
        partyId: id,
        bankId: bankAccount ? bankAccount.bank.id : '',
        accountName: bankAccount ? bankAccount.accountName : '',
        accountNumber: bankAccount ? bankAccount.accountNumber : '',
      });
    }
  }, [branchDialog.data, setForm]);

  useEffect(() => {
    if (branchDialog.props.open) {
      initDialog();
    }
  }, [branchDialog.props.open, initDialog]);

 

  function closeComposeDialog() {
    dispatch(Actions.closeBranchDialog());
  }

  function canBeSubmitted() {
    return form.bankId && form.accountName && form.accountNumber;
  }

  const handleSelectChange = (value, name) => {
    setForm(_.set({ ...form }, name, value ? value.id : null));
  };

  const handleChange = (event) => {
    setForm(_.set({ ...form }, event.target.name, event.target.value));
  };

  function handleSubmit(event) {
    event.preventDefault();
    console.log('BANK FORM', form);
    dispatch(appActions.updateBranch(form));
    closeComposeDialog();
  }

  console.log(branchDialog, 'branchDialog');
  console.log(banks, 'banks');
  console.log(form, 'form');

  return (
    <Dialog
      classes={{
        paper: 'm-24',
      }}
      {...branchDialog.props}
      onClose={closeComposeDialog}
      fullWidth
      maxWidth='sm'
    >
      <AppBar position='static' elevation={1}>
        <Toolbar className='flex justify-between'>
          <Typography variant='subtitle1' color='inherit'>
            Update branch
          </Typography>
          <IconButton size='small' color='inherit' onClick={closeComposeDialog}>
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <form
        noValidate
        onSubmit={handleSubmit}
        className='flex flex-col overflow-hidden'
      >
        <DialogContent classes={{ root: 'p-24' }}>
          <div className='pb-16'>
            <div className='flex items-center space-x-2'>
              <Autocomplete
                className='w-full mb-24'
                id='bank-name'
                value={form.bankId ? _.find(banks, { id: form.bankId }) : null}
                onChange={(ev, value) => handleSelectChange(value, 'bankId')}
                getOptionSelected={(option) => option.id === form.bankId}
                placeholder='Select bank'
                options={banks}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField {...params} label='Banks' variant='outlined' />
                )}
              />
            </div>

            <div className='flex space-x-2'>
              <TextField
                className='mb-24'
                label='Account name'
                id='account-name'
                name='accountName'
                value={form.accountName}
                onChange={handleChange}
                variant='outlined'
                required
                fullWidth
              />

              <TextField
                className='mb-24'
                label='Account number'
                id='account-number'
                name='accountNumber'
                value={form.accountNumber}
                onChange={handleChange}
                variant='outlined'
                required
                fullWidth
              />
            </div>
          </div>
        </DialogContent>

        <DialogActions className='justify-end pr-24'>
          <Button
            variant='contained'
            color='primary'
            type='submit'
            onClick={handleSubmit}
            disabled={loading ? loading : !canBeSubmitted()}
            endIcon={loading && <CircularProgress size={16} />}
          >
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default BranchDialog;
