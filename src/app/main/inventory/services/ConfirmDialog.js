import React, { useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
  DialogTitle,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../store/actions';

function ConfirmDeleteDialog(props) {
  const dispatch = useDispatch();
  const serviceDialog = useSelector(
    ({ inventoryApp }) => inventoryApp.services.confirmDeleteServiceDialog
  );

  console.log(serviceDialog, "serviceDialog")

  useEffect(() => {
    /**
     * After Dialog Open
     */
    if (serviceDialog.open) {
    }
  }, [serviceDialog.open]);

  function closeComposeDialog() {
    dispatch(Actions.closeConfirmDeleteDialog())
  }

  function onSubmit(event) {
    event.preventDefault();
    dispatch(Actions.deleteService(serviceDialog.data))
  }

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
      <DialogTitle>
        Delete Service
      </DialogTitle>
      <DialogContent classes={{ root: 'p-24' }}>
        <div className='flex flex-col space-y-2'>
          <div className='min-w-48 pt-20'>
            <Typography variant="subtitle1">Are you sure you want to delete the service?</Typography>
          </div>
        </div>
      </DialogContent>

      <DialogActions className='justify-end px-16 pl-16'>
        <Button
          variant='contained'
          color='primary'
          type='submit'
          onClick={onSubmit}
          disabled={!serviceDialog.data}
        >
          Delete service
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDeleteDialog;
