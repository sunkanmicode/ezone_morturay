import React, { useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FuseAnimate, FusePageCarded, FuseScrollbars } from '@fuse';
import { withStyles } from '@material-ui/core/styles';
import withReducer from 'app/store/withReducer';
import reducer from '../store/reducers';
import * as Actions from '../store/actions';
import { Button, Icon, TextField, Typography } from '@material-ui/core';

const styles = (theme) => ({
  layoutRoot: {},
});

function AddItems(props) {
  const { classes, createItem } = props;

  const [form, setForm] = useState({
    item_name: "",
    unit_price: "",
    stock_at_hand: ""
  });

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = () => {
    createItem(form);
  };

  console.log(form, "form")

  return (
    <FusePageCarded
      classes={{
        root: classes.layoutRoot,
        content: 'flex',
        header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
      }}
      header={
        <div className='flex flex-1 w-full items-center justify-between'>
          <div className='flex flex-col'>
            <FuseAnimate animation='transition.slideRightIn' delay={300}>
              <Typography
                className='normal-case flex items-center sm:mb-12'
                component={Link}
                role='button'
                to='/inventory/items'
                color='inherit'
              >
                <Icon className='mr-4 text-20'>arrow_back</Icon>
                Items
              </Typography>
            </FuseAnimate>

            <div className='flex items-center max-w-full'>
              <div className='flex min-w-0'>
                <FuseAnimate animation='transition.slideLeftIn' delay={300}>
                  <Typography className='hidden sm:flex' variant='h6'>
                    Add Item
                  </Typography>
                </FuseAnimate>
              </div>
            </div>
          </div>
        </div>
      }
      contentToolbar={
        <div className='px-24'>
          <h4 className='text-lg'>Add Item</h4>
        </div>
      }
      content={
        <div className='p-24 w-8/12'>
          <FuseScrollbars className='flex-grow overflow-x-auto'>
            <div className='grid grid-cols-2 gap-x-24'>
              <TextField
                className='mt-8 mb-16'
                required
                label='Item Name'
                autoFocus
                id='item_name'
                name='item_name'
                value={form.item_name}
                onChange={handleChange}
                variant='outlined'
                fullWidth
              />

              <TextField
                className='mt-8 mb-16'
                required
                label='Unit price'
                autoFocus
                id='unit_price'
                name='unit_price'
                value={form.unit_price}
                onChange={handleChange}
                variant='outlined'
                fullWidth
              />

              <TextField
                className='mt-8 mb-16'
                required
                label='Stock at hand'
                autoFocus
                id='stock_at_hand'
                name='stock_at_hand'
                value={form.stock_at_hand}
                onChange={handleChange}
                variant='outlined'
                fullWidth
              />
            </div>
            <Button color='primary' className='float-right' variant='contained' onClick={handleSubmit}>
              save
            </Button>
          </FuseScrollbars>
        </div>
      }
      innerScroll
    />
  );
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    createItem: Actions.createItem,
  }, dispatch);
};

export default withReducer('inventoryApp', reducer)(withStyles(styles, { withTheme: true })(connect(null, mapDispatchToProps)(AddItems)));
