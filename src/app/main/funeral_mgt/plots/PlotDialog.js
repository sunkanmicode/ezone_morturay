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
  CircularProgress,
} from '@material-ui/core';
import { useForm } from '@fuse/hooks';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../store/actions';
import { MenuItem } from '@material-ui/core';

const defaultFormState = {
  address: "",
  branch_id: "",
  org_key: "",
  plot_name: "",
  plot_number: ""
};

function PlotDialog(props) {
  const dispatch = useDispatch();
  const plotDialog = useSelector(({ plotsApp }) => plotsApp.plots.plotDialog);
  const loading = useSelector(({ plotsApp }) => plotsApp.plots.loading);
  const branches = useSelector(({ plotsApp }) => plotsApp.branches.branches);

  const { form, handleChange, setForm } = useForm(defaultFormState);

  console.log(plotDialog, "plotDialog plots")
  console.log(branches, "branches plots")
  console.log(form, "form plots")

  const initDialog = useCallback(() => {
    /**
     * Dialog type: 'edit'
     */
    if (plotDialog.type === 'edit' && plotDialog.data) {
      setForm({ ...plotDialog.data });
    }

    /**
     * Dialog type: 'new'
     */
    if (plotDialog.type === 'new') {
      setForm({
        ...defaultFormState
      });
    }
  }, [plotDialog.data, plotDialog.type, setForm]);

  useEffect(() => {
    /**
     * After Dialog Open
     */
    if (plotDialog.props.open) {
      initDialog();
    }
  }, [plotDialog.props.open, initDialog]);

  function closeComposeDialog() {
    plotDialog.type === 'edit'
      ? dispatch(Actions.closePlotDialog())
      : dispatch(Actions.closePlotDialog());
  }

  function canBeSubmitted() {
    return form.plot_name.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (plotDialog.type === 'new') {
      dispatch(Actions.createPlot(form));
    } else {
      dispatch(Actions.createPlot(form));
    }
    closeComposeDialog();
  }

  return (
    <Dialog
      classes={{
        paper: 'm-24',
      }}
      {...plotDialog.props}
      onClose={closeComposeDialog}
      fullWidth
      maxWidth='xs'
    >
      <AppBar position='static' elevation={1}>
        <Toolbar className='flex'>
          <Typography variant='subtitle1' color='inherit'>
            {plotDialog.type === 'new'
              ? 'New Plot'
              : 'Edit Plot'}
          </Typography>
        </Toolbar>
      </AppBar>
      <form
        noValidate
        onSubmit={handleSubmit}
        className='flex flex-col overflow-hidden'
      >
        <DialogContent classes={{ root: 'p-24' }}>
          <div className='flex'>
            <TextField
              className='mb-24'
              label='Plot name'
              autoFocus
              id='plot_name'
              name='plot_name'
              value={form.plot_name}
              onChange={handleChange}
              variant='outlined'
              required
              fullWidth
            />
          </div>  

          <div className='flex space-x-2'>
            <TextField
              className='mb-24'
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

        <DialogActions className='justify-end pr-24 py-16'>
        {plotDialog.type === 'new' ? (
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
            Save
          </Button>
        )}
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default PlotDialog;
