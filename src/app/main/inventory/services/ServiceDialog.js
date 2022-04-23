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
import { FuseUtils, FuseChipSelect } from '@fuse';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../store/actions';
import { types } from "./Services"

const defaultFormState = {
  id: '',
  service_name: "",
  service_type: null,
  amount: "",
};

function ServiceDialog(props) {
  const dispatch = useDispatch();
  const serviceDialog = useSelector(
    ({ inventoryApp }) => inventoryApp.services.serviceDialog
  );

  const { form, handleChange, setForm } = useForm(defaultFormState);

  const initDialog = useCallback(() => {
    /**
     * Dialog type: 'edit'
     */
    if (serviceDialog.type === 'edit' && serviceDialog.data) {
      setForm({ ...serviceDialog.data });
    }

    /**
     * Dialog type: 'new'
     */
    if (serviceDialog.type === 'new') {
      setForm({
        ...defaultFormState,
        ...serviceDialog.data,
        id: FuseUtils.generateGUID(),
      });
    }
  }, [serviceDialog.data, serviceDialog.type, setForm]);

  useEffect(() => {
    /**
     * After Dialog Open
     */
    if (serviceDialog.open) {
      initDialog();
    }
  }, [serviceDialog.open, initDialog]);

  function closeComposeDialog() {
    serviceDialog.type === 'edit'
      ? dispatch(Actions.closeServiceDialog())
      : dispatch(Actions.closeServiceDialog());
  }

  function canBeSubmitted() {
    return form.service_name.length > 0;
  }

  function handleChipChange(value, name) {
    console.log(value, "value")
    setForm({...form, [name]: value.value})
  };

  function onSubmit(event) {
    event.preventDefault();

    if (serviceDialog.type === 'new') {
      dispatch(Actions.createService(form));
    } else {
      dispatch(Actions.updateService(form));
    }
    closeComposeDialog();
  }

  console.log(form, "form")

  return (
    <Dialog
      classes={{
        paper: 'm-24',
      }}
      open={serviceDialog.open}
      onClose={closeComposeDialog}
      fullWidth
      maxWidth='xs'
    >
      <AppBar position='static' elevation={1}>
        <Toolbar className='flex w-full'>
          <Typography variant='subtitle1' color='inherit'>
            {serviceDialog.type === 'edit' ? 'Update Service' : ''}
          </Typography>
        </Toolbar>
      </AppBar>
      <form
        noValidate
        onSubmit={onSubmit}
        className='flex flex-col overflow-hidden'
      >
        <DialogContent classes={{ root: 'p-24' }}>
          <div className='flex flex-col space-y-2'>
            <div className='min-w-48 pt-20'>
              <Typography>Service name</Typography>
            </div>

            <TextField
              className='mb-24'
              label='Service name'
              autoFocus
              id='service_name'
              name='service_name'
              value={form.service_name}
              onChange={handleChange}
              variant='outlined'
              required
              fullWidth
            />
          </div>

          <div className='flex flex-col space-y-2'>
            <div className='min-w-48 pt-20'>
              <Typography>Service type</Typography>
            </div>
            
            <FuseChipSelect
              className='mt-8 mb-24'
              value={types.find(type => type.id === Number(form.service_type))}
              onChange={(value) => handleChipChange(value, 'service_type')}
              placeholder='Select service type'
              textFieldProps={{
                label: 'Service Type',
                InputLabelProps: {
                  shrink: true,
                },
                variant: 'outlined',
              }}
              options={types}
            />
          </div>

          <div className='flex flex-col space-y-2'>
            <div className='min-w-48 pt-20'>
              <Typography>Amount</Typography>
            </div>
            <TextField
              className='mb-24'
              label='Amount'
              id='amount'
              name='amount'
              value={form.amount}
              onChange={handleChange}
              variant='outlined'
              fullWidth
            />
          </div>
        </DialogContent>

        {serviceDialog.type === 'edit' ? (
          <DialogActions className='justify-between pl-16'>
            <Button
              variant='contained'
              color='primary'
              type='submit'
              disabled={!canBeSubmitted()}
            >
              Update
            </Button>
          </DialogActions>
        ) : ( null )}
      </form>
    </Dialog>
  );
}

export default ServiceDialog;
