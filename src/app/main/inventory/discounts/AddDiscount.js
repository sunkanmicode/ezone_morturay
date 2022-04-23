import React, { useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FusePageSimple, FuseScrollbars } from '@fuse';
import { withStyles } from '@material-ui/core/styles';
import withReducer from 'app/store/withReducer';
import reducer from '../store/reducers';
import * as Actions from '../store/actions';
import { Button, TextField } from '@material-ui/core';

const styles = (theme) => ({
  layoutRoot: {},
});

// const discounts = ["FIXED", "RECURRENT"].map(type => ({
//   label: _.startCase(type),
//   value: type,
// }));

function AddDiscounts(props) {
  const { classes, createDiscount } = props;

  const [form, setForm] = useState({
    amount: "",
    discount_name: "",
    // discount_type: "FIXED",
    created_by: "Optisoft",
    org_key: "ORG-1593451692921"
  });

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = () => {
    createDiscount(form);
  };

  // const handleChipChange = (value, name) => {
  //   setForm({...form, [name]: value.value})
  // };

  console.log(form, "form")

  return (
    <FusePageSimple
      classes={{
        root: classes.layoutRoot,
      }}
      header={
        <div className='px-24'>
          <h4 className='text-lg'>Add Discount</h4>
        </div>
      }
      content={
        <div className='p-24 w-8/12'>
          <FuseScrollbars className='flex-grow overflow-x-auto'>
            <div className='grid grid-cols-2 gap-x-24'>
              <TextField
                className='mt-8 mb-16'
                required
                label='Discount Name'
                autoFocus
                id='discount_name'
                name='discount_name'
                value={form.discount_name}
                onChange={handleChange}
                variant='outlined'
                fullWidth
              />

              {/* <FuseChipSelect
                className='mt-8 mb-24'
                value={discounts.find(type => type.value === form.discount_type)}
                onChange={(value) => handleChipChange(value, 'discount_type')}
                placeholder='Select discount type'
                textFieldProps={{
                  label: 'Discount Type',
                  InputLabelProps: {
                    shrink: true,
                  },
                  variant: 'outlined',
                }}
                options={discounts}
              /> */}

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
            </div>
            <Button color='primary' className='float-right' variant='contained' onClick={handleSubmit}>
              save
            </Button>
          </FuseScrollbars>
        </div>
      }
    />
  );
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    createDiscount: Actions.createDiscount,
  }, dispatch);
};

export default withReducer('inventoryApp', reducer)(withStyles(styles, { withTheme: true })(connect(null, mapDispatchToProps)(AddDiscounts)));
