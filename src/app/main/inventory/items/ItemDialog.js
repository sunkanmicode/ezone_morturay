import React, { useEffect, useCallback } from 'react';
import _ from "lodash";
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
import FuseUtils from '@fuse/FuseUtils';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../store/actions';

const defaultFormState = {
  id: '',
  item_name: "",
  unit_price: "",
  stock_at_hand: ""
};

function ItemDialog(props) {
  const dispatch = useDispatch();
  const itemDialog = useSelector(
    ({ inventoryApp }) => inventoryApp.items.itemDialog
  );

  console.log(itemDialog, "itemDialog")
  console.log(_.omit(itemDialog.data, ['item_id', 'org_key']), "itemDialog omit")

  const { form, handleChange, setForm } = useForm(defaultFormState);

  const initDialog = useCallback(() => {
    /**
     * Dialog type: 'edit'
     */
    if (itemDialog.type === 'edit' && itemDialog.data) {
      setForm({ ...itemDialog.data });
    }

    /**
     * Dialog type: 'new'
     */
    if (itemDialog.type === 'new') {
      setForm({
        ...defaultFormState,
        ...itemDialog.data,
        id: FuseUtils.generateGUID(),
      });
    }
  }, [itemDialog.data, itemDialog.type, setForm]);

  useEffect(() => {
    /**
     * After Dialog Open
     */
    if (itemDialog.open) {
      initDialog();
    }
  }, [itemDialog.open, initDialog]);

  function closeComposeDialog() {
    itemDialog.type === 'edit'
      ? dispatch(Actions.closeItemDialog())
      : dispatch(Actions.closeItemDialog());
  }

  function canBeSubmitted() {
    return form.item_name.length > 0;
  }

  function onSubmit(event) {
    event.preventDefault();

    if (itemDialog.type === 'new') {
      dispatch(Actions.createItem(form));
    } else {
      dispatch(Actions.updateItem(form));
    }
    closeComposeDialog();
  }

  console.log(form, "form")

  return (
    <Dialog
      classes={{
        paper: 'm-24',
      }}
      open={itemDialog.open}
      onClose={closeComposeDialog}
      fullWidth
      maxWidth='xs'
    >
      <AppBar position='static' elevation={1}>
        <Toolbar className='flex w-full'>
          <Typography variant='subtitle1' color='inherit'>
            {itemDialog.type === 'edit' ? 'Update Item' : ''}
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
              <Typography>Item name</Typography>
            </div>

            <TextField
              className='mb-24'
              label='Item name'
              autoFocus
              id='item_name'
              name='item_name'
              value={form.item_name}
              onChange={handleChange}
              variant='outlined'
              required
              fullWidth
            />
          </div>

          <div className='flex flex-col space-y-2'>
            <div className='min-w-48 pt-20'>
              <Typography>Unit price</Typography>
            </div>
            <TextField
              className='mb-24'
              label='Unit price'
              id='unit_price'
              name='unit_price'
              value={form.unit_price}
              onChange={handleChange}
              variant='outlined'
              fullWidth
            />
          </div>

          <div className='flex flex-col space-y-2'>
            <div className='min-w-48 pt-20'>
              <Typography>Stock at hand</Typography>
            </div>
            <TextField
              className='mb-24'
              label='Stock at hand'
              id='stock_at_hand'
              name='stock_at_hand'
              value={form.stock_at_hand}
              onChange={handleChange}
              variant='outlined'
              fullWidth
            />
          </div>
        </DialogContent>

        {itemDialog.type === 'edit' ? (
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

export default ItemDialog;
