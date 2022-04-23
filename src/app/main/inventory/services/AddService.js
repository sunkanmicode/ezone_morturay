import React, { useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FuseAnimate, FuseScrollbars, FusePageCarded, FuseChipSelect } from '@fuse';
import { CircularProgress, Icon, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import withReducer from 'app/store/withReducer';
import reducer from '../store/reducers';
import * as Actions from '../store/actions';
import {
  Button,
  Checkbox,
  TextField,
  FormControl,
  FormLabel,
  FormControlLabel,
  FormGroup,
  MenuItem
} from '@material-ui/core';
import { types } from "./Services"

const styles = (theme) => ({
  layoutRoot: {},
});

function AddServices(props) {
  const { classes, branches, createService, loading } = props;

  const [form, setForm] = useState({
    service_name: "",
    service_type: null,
    branch_id: "",
    amount: "",
    is_admisson: false,
    is_customer_image: false,
    request_customer_signature: false,
  });

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const canBeSubmitted = () => {
    return (
      form.service_name.length > 0 &&
      form.service_type &&
      form.amount.length > 0
    )
  }

  const handleSubmit = () => {
    createService(form);
  };

  const handleCheckChange = (event) => {
    setForm({
      ...form,
      [event.target.value]: event.target.checked,
    });
  };

  const handleChipChange = (value, name) => {
    setForm({...form, [name]: value.value})
  };

  console.log(form, "form")
  console.log(loading, "loading")

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
                to='/inventory/services'
                color='inherit'
              >
                <Icon className='mr-4 text-20'>arrow_back</Icon>
                Services / Products
              </Typography>
            </FuseAnimate>

            <div className='flex items-center max-w-full'>
              <div className='flex min-w-0'>
                <FuseAnimate animation='transition.slideLeftIn' delay={300}>
                  <Typography className='hidden sm:flex' variant='h6'>
                    Add Service / Product
                  </Typography>
                </FuseAnimate>
              </div>
            </div>
          </div>
        </div>
      }
      contentToolbar={
        <div className='px-24'>
          <h4 className='text-lg'>Add Service</h4>
        </div>
      }
      content={
        <div className='p-24 w-8/12'>
          <FuseScrollbars className='flex-grow overflow-x-auto'>
            <div className='grid grid-cols-2 gap-x-24'>
              <TextField
                className='mt-8 mb-16'
                required
                label='Service Name'
                autoFocus
                id='service_name'
                name='service_name'
                value={form.service_name}
                onChange={handleChange}
                variant='outlined'
                fullWidth
              />

              <FuseChipSelect
                className='mt-8 mb-24'
                value={types.find(type => type.label === form.service_type)}
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

              <TextField
                className='mt-8 mb-16'
                required
                label='Amount'
                autoFocus
                id='amount'
                name='amount'
                value={form.amount}
                onChange={handleChange}
                variant='outlined'
                fullWidth
              />

              <TextField
                className='mt-8 mb-16'
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

              <FormControl
                required
                error={false}
                component='fieldset'
                className={classes.formControl}
              >
                <FormLabel component='legend'>Pick two</FormLabel>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={form.is_customer_image}
                        onChange={handleCheckChange}
                        value='is_customer_image'
                      />
                    }
                    label='Request Customer Image '
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={form.is_admisson}
                        onChange={handleCheckChange}
                        value='is_admisson'
                      />
                    }
                    label='Admission needed'
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={form.request_customer_signature}
                        onChange={handleCheckChange}
                        value='request_customer_signature'
                      />
                    }
                    label='Request Customer Signature '
                  />
                </FormGroup>
              </FormControl>
            </div>
            <Button 
              color='primary' 
              className='float-right' 
              disabled={!canBeSubmitted()}
              variant='contained' 
              onClick={handleSubmit}
              endIcon={loading && <CircularProgress color="inherit" size={16} />}
            >
              save
            </Button>
          </FuseScrollbars>
        </div>
      }
      innerScroll
    />
  );
}

const mapStateToProps = ({inventoryApp, ezone}) => {
  const { services } = inventoryApp
  return {
    loading: services.loading,
    branches: ezone.branches.branches,
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    createService: Actions.createService,
  }, dispatch);
};

export default withReducer('inventoryApp', reducer)(withStyles(styles, { withTheme: true })(connect(mapStateToProps, mapDispatchToProps)(AddServices)));
