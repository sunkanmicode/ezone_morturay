import React, { useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FusePageCarded, FuseScrollbars, FuseUtils } from '@fuse';
import { withStyles } from '@material-ui/core/styles';
import * as Actions from '../store/actions';
import {
  Button,
  CircularProgress,
  IconButton,
  MenuItem,
  TextField,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import AddInvoiceHeader from './AddInvoiceHeader';
import AddInvoiceToolbar from './AddInvoiceToolbar';
import moment from 'moment';

const styles = (theme) => ({
  layoutRoot: {},
});

function AddInvoice(props) {
  const { classes, generateProformaInvoice, services, branches, loading } =
    props;
  const [errors, setErrors] = useState({});

  console.log(loading, 'loading');

  const [form, setForm] = useState({
    family_name: '',
    email: '',
    phone_number: '',
    branch_id: '',
    contact_person: '',
    invoice_date: moment().format('YYYY-MM-DDTHH:mm:ss'),
    address: '',
    service: [{ service_id: '', qty: '', rate: '' }],
  });

  const validate = (field) => (e) => {
    const temp = {};
    if (field === 'email') {
      temp[field] = FuseUtils.validateEmail(form[field])
        ? ''
        : 'Email is not valid';
    }
    if (field === 'phone_number') {
      temp[field] = FuseUtils.validatePhone(form[field])
        ? ''
        : 'Phone number is not valid';
    }

    setErrors({ ...temp });
  };

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  function addServiceRow() {
    const newRole = { service_id: '', qty: '', rate: '' };
    setForm({ ...form, service: [...form.service, newRole] });
  }

  const removeServiceRow = (i) => () => {
    setForm({ ...form, service: form.service.filter((s, k) => k !== i) });
  };

  const handleMultiChange = (i) => (event) => {
    const { name, value } = event.target;
    const { service } = form;
    if (name === 'service_id') {
      const serv = services.find((s) => s.id === value);
      service[i][name] = serv.id;
      service[i].rate = serv.amount;
    } else if (name === 'qty') {
      // const serv = services.find(s => s.id === service[i].service_id)
      // service[i].rate = Number(serv.amount * value)
      service[i][name] = value;
    }
    setForm({ ...form, service });
  };

  const canSubmit = () => {
    return (
      form.family_name.length > 0 &&
      form.email.length > 0 &&
      form.phone_number.length > 0 &&
      form.contact_person.length > 0 &&
      form.service.length > 0 &&
      form.service[0]?.service_id
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    generateProformaInvoice(form);
  };

  console.log(form, 'form');

  return (
    <FusePageCarded
      classes={{
        root: classes.layoutRoot,
        content: 'flex',
        header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
      }}
      header={<AddInvoiceHeader />}
      contentToolbar={<AddInvoiceToolbar />}
      content={
        <form className='w-full p-24' onSubmit={handleSubmit}>
          <FuseScrollbars className='flex-grow overflow-x-auto pb-24'>
            <div className='w-8/12 grid grid-cols-2 gap-x-24'>
              <TextField
                className='mt-8 mb-16'
                required
                label='Family name'
                autoFocus
                id='family_name'
                name='family_name'
                value={form.family_name}
                onChange={handleChange}
                variant='outlined'
                fullWidth
              />

              <TextField
                className='mt-8 mb-16'
                required
                label='Contact Person'
                id='contact_person'
                name='contact_person'
                value={form.contact_person}
                onChange={handleChange}
                variant='outlined'
                fullWidth
              />

              <TextField
                className='mt-8 mb-16'
                required
                type='email'
                label='Email'
                id='email'
                name='email'
                value={form.email}
                onKeyUp={validate('email')}
                onChange={handleChange}
                error={Boolean(errors['email'])}
                helperText={errors['email']}
                variant='outlined'
                fullWidth
              />

              <TextField
                className='mt-8 mb-16'
                required
                label='Phone number'
                id='phone_number'
                name='phone_number'
                value={form.phone_number}
                onKeyUp={validate('phone_number')}
                onChange={handleChange}
                error={Boolean(errors['phone_number'])}
                helperText={errors['phone_number']}
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
                <MenuItem value=''>Select branch</MenuItem>
                {branches.map((b) => (
                  <MenuItem key={b.id} value={b.id}>
                    {b.name}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                className='mt-8 mb-16'
                required
                label='Address'
                id='address'
                name='address'
                value={form.address}
                onChange={handleChange}
                variant='outlined'
                multiline
                rows={2}
                rowsMax={4}
                fullWidth
              />
            </div>

            <div className='mb-24'>
              <Table
                className='border border-grey-light border-solid'
                size='small'
                aria-labelledby='tableTitle'
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Services</TableCell>
                    <TableCell>Qty</TableCell>
                    <TableCell>Rate</TableCell>
                    <TableCell align='right'>
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
                        aria-checked={isSelected}
                        tabIndex={-1}
                        key={i}
                        selected={isSelected}
                        onClick={() => {}}
                      >
                        <TableCell
                          component='th'
                          scope='row'
                          className='truncate'
                        >
                          <TextField
                            className='min-w-288'
                            select
                            required
                            label='Services'
                            id={`service_id-${i}`}
                            name='service_id'
                            value={n.service_id}
                            onChange={handleMultiChange(i)}
                            variant='outlined'
                            fullWidth
                          >
                            <MenuItem value=''>Select Services</MenuItem>
                            {services.map((s) => (
                              <MenuItem key={s.id} value={s.id}>
                                {s.service_name}
                              </MenuItem>
                            ))}
                          </TextField>
                        </TableCell>

                        <TableCell
                          className='truncate'
                          component='th'
                          scope='row'
                        >
                          <TextField
                            className=''
                            required
                            disabled={!Boolean(n.service_id)}
                            label='Qty'
                            id={`qty-${i}`}
                            name='qty'
                            value={n.qty}
                            onChange={handleMultiChange(i)}
                            variant='outlined'
                          />
                        </TableCell>

                        <TableCell
                          className='truncate'
                          component='th'
                          scope='row'
                        >
                          <TextField
                            className=''
                            required
                            label='Rate'
                            id={`rate-${i}`}
                            name='rate'
                            value={n.rate}
                            variant='outlined'
                          />
                        </TableCell>
                        <TableCell align='right'>
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

            <Button
              color='primary'
              type='submit'
              disabled={!canSubmit()}
              className='float-right'
              variant='contained'
              endIcon={
                loading && <CircularProgress color='inherit' size={16} />
              }
            >
              Generate
            </Button>
          </FuseScrollbars>
        </form>
      }
      innerScroll
    />
  );
}

const mapStateToProps = ({ proformaApp, ezone }) => {
  const { customer, services, discounts, invoices } = proformaApp;

  return {
    loading: invoices.loading,
    customers: customer.customers.customers,
    services: services.services.services,
    discounts: discounts.discounts,
    branches: ezone.branches.branches,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      generateProformaInvoice: Actions.generateProformaInvoice,
    },
    dispatch
  );
};

export default withStyles(styles, { withTheme: true })(
  connect(mapStateToProps, mapDispatchToProps)(AddInvoice)
);
