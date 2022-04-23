import React, { useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FusePageCarded, FuseScrollbars } from '@fuse';
import { withStyles } from '@material-ui/core/styles';
import withReducer from 'app/store/withReducer';
import reducer from '../store/reducers';
import * as Actions from '../store/actions';
import { Button, IconButton, MenuItem, TextField, Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';
import AddIcon from "@material-ui/icons/Add"
import DeleteIcon from "@material-ui/icons/Delete"
import { Autocomplete } from "@material-ui/lab"
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import AddInvoiceHeader from "./AddInvoiceHeader"
import AddInvoiceToolbar from "./AddInvoiceToolbar"
import moment from 'moment';

const styles = (theme) => ({
  layoutRoot: {},
});

function AddInvoice(props) {
  const { classes, addInvoice, services, customers, discounts } = props;

  const [form, setForm] = useState({
    amount_due: 0,
    bill_to: "",
    created_by: "",
    customer_id: null,
    invoice_date: moment().format("YYYY-MM-DDTHH:mm:ss"),
    invoice_number: "",
    notes: "",
    service: [
      { service_id: '', rate: '', discount_type_id: '', days: '', discount_amount: '', new_amount: '' }
    ],
    total_amount: 0
  });

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSelectChange = (name, value) => {
    if(name === "customer_id"){
      setForm({ ...form, [name]: value.id });
    }else {
      setForm({ ...form, [name]: value });
    }
  };

  function addServiceRow() {
    const newRole = { service_id: '', rate: '', discount_type_id: '', discount_amount: '', new_amount: '' }
    setForm({...form, service: [ ...form.service, newRole ]});
  }

  const removeServiceRow = (i) => () => {
    setForm({ ...form, service: form.service.filter((s, k) => k !== i)});
  }

  const handleMultiChange = i => event => {
    const { name, value } = event.target
    const { service } = form
    if(name === "discount_type_id"){
      const discount = discounts.find(d => d.id === value)
      service[i][name] =  discount.id
      service[i].discount_amount = discount.amount
    }else if(name === "service_id"){
      const serv = services.find(s => s.id === value)
      console.log(service, "service")
      service[i][name] = serv.id
      service[i].rate = serv.amount
    }else{
      service[i][name] = value
    }
    setForm({ ...form, service });
  }

  const handleDateChange = name => date => {
    setForm({ ...form, [name]: moment(date).format("YYYY-MM-DDTHH:mm:ss") });
  };

  const handleSubmit = () => {
    addInvoice(form);
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
        <AddInvoiceHeader />
      }
      contentToolbar={
        <AddInvoiceToolbar />
      }
      content={
        <div className='w-full p-24'>
          <FuseScrollbars className='flex-grow overflow-x-auto'>
            <div className='w-8/12 grid grid-cols-2 gap-x-24'>
              <TextField
                className='mt-8 mb-16'
                required
                label='Amount Due'
                autoFocus
                id='amount_due'
                name='amount_due'
                value={form.amount_due}
                onChange={handleChange}
                variant='outlined'
                fullWidth
              />

              <TextField
                className='mt-8 mb-16'
                required
                label='Bill To'
                autoFocus
                id='bill_to'
                name='bill_to'
                value={form.bill_to}
                onChange={handleChange}
                variant='outlined'
                fullWidth
              />

              <Autocomplete
                className='mt-8 mb-16'
                id="select-customer"
                options={customers}
                value={form.customer_id ? customers.find(c => c.id === form.customer_id) : null}
                onChange={(e, value) => handleSelectChange("customer_id", value)}
                getOptionLabel={(option) => option.first_name}
                renderInput={(params) => <TextField {...params} label="Customers" variant="outlined" />}
              />

              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  margin='normal'
                  inputVariant='outlined'
                  id='invoice-date'
                  label='Invoice date'
                  value={form.invoice_date}
                  onChange={handleDateChange("invoice_date")}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>

              <TextField
                className='mt-8 mb-16'
                required
                label='Invoice number'
                autoFocus
                id='invoice-number'
                name='invoice_number'
                value={form.invoice_number}
                onChange={handleChange}
                variant='outlined'
                fullWidth
              />

              <TextField
                className='mt-8 mb-16'
                required
                label='Total amount'
                autoFocus
                id='total_amount'
                name='total_amount'
                value={form.total_amount}
                onChange={handleChange}
                variant='outlined'
                fullWidth
              />

              <TextField
                className='mt-8 mb-16'
                required
                label='Notes'
                autoFocus
                id='notes'
                name='notes'
                value={form.notes}
                onChange={handleChange}
                variant='outlined'
                multiline
                rows={2}
                rowsMax={4}
                fullWidth
              />
            </div>

            <div className="mb-24">
              <Table className='min-w-xl' aria-labelledby='tableTitle'>
                <TableHead>
                  <TableRow>
                    <TableCell>Services</TableCell>
                    <TableCell>Rate</TableCell>
                    <TableCell>Days</TableCell>
                    <TableCell>Discount Type</TableCell>
                    <TableCell>Discount Amount</TableCell>
                    <TableCell align='left'>
                      <IconButton onClick={addServiceRow}>
                        <AddIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {form.service.map((n, i) => {
                    const isSelected = form.service.indexOf(n.id) !== -1;
                    return (
                      <TableRow
                        className='h-64 cursor-pointer'
                        hover
                        role='checkbox'
                        aria-checked={isSelected}
                        tabIndex={-1}
                        key={i}
                        selected={isSelected}
                        onClick={() => {}}
                      >
                        <TableCell component='th' scope='row'>
                          <TextField
                            className='mt-8 mb-16 min-w-192'
                            select
                            required
                            label='Services'
                            autoFocus
                            id={`service_id-${i}`}
                            name='service_id'
                            value={n.service_id}
                            onChange={handleMultiChange(i)}
                            variant='outlined'
                            fullWidth
                          >
                            <MenuItem value="">Select Services</MenuItem>
                            {services.map(s => 
                              <MenuItem key={s.id} value={s.id}>{s.service_name}</MenuItem>
                            )}
                          </TextField>  
                        </TableCell>

                        <TableCell className='truncate' component='th' scope='row'>
                          <TextField
                            className='mt-8 mb-16'
                            required
                            label='Rate'
                            autoFocus
                            id={`rate-${i}`}
                            name='rate'
                            value={n.rate}
                            onChange={handleMultiChange(i)}
                            variant='outlined'
                            fullWidth
                          />
                        </TableCell>

                        <TableCell className='truncate' component='th' scope='row'>
                          <TextField
                            className='mt-8 mb-16 w-128'
                            required
                            label='Days'
                            autoFocus
                            id={`days-${i}`}
                            name='days'
                            value={n.days}
                            onChange={handleMultiChange(i)}
                            variant='outlined'
                            fullWidth
                          />
                        </TableCell>

                        <TableCell component='th' scope='row' align='left'>
                          <TextField
                            className='mt-8 mb-16 min-w-128'
                            select
                            required
                            label='Discount Types'
                            autoFocus
                            id={`discount_type_id-${i}`}
                            name='discount_type_id'
                            value={n.discount_type_id}
                            onChange={handleMultiChange(i)}
                            variant='outlined'
                            fullWidth
                          >
                            <MenuItem value="">Select discount type</MenuItem>
                            {discounts.map(d => 
                              <MenuItem key={d.id} value={d.id}>{d.discount_name}</MenuItem>
                            )}
                          </TextField>  
                        </TableCell>

                        <TableCell component='th' scope='row'>
                          <TextField
                            className='mt-8 mb-16'
                            required
                            label='Discount Amount'
                            autoFocus
                            id={`discount_amount-${i}`}
                            name='discount_amount'
                            value={n.discount_amount}
                            onChange={handleMultiChange(i)}
                            variant='outlined'
                            fullWidth
                          />
                        </TableCell>
                        <TableCell className='' padding='checkbox'>
                          <IconButton onClick={removeServiceRow(i)}>
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
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

const mapStateToProps = ({invoicesApp}) => {
  const { customer, services, discounts } = invoicesApp
  console.log(discounts, "discounts")
  return {
    customers: customer.customers.customers,
    services: services.services.services,
    discounts: discounts.discounts,
  }
};


const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    addInvoice: Actions.addInvoice,
  }, dispatch);
};

export default withReducer('invoicesApp', reducer)(withStyles(styles, { withTheme: true })(connect(mapStateToProps, mapDispatchToProps)(AddInvoice)));
