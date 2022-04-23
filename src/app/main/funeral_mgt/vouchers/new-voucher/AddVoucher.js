import React, { useState, useEffect, useCallback } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { FusePageSimple, FuseScrollbars, FuseUtils } from '@fuse';
import { withStyles } from '@material-ui/core/styles';
import * as Actions from '../../store/actions';
import * as appActions from '../../../../store/actions';
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
  TableCell 
} from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import moment from 'moment';
import AddIcon from "@material-ui/icons/Add"
import DeleteIcon from "@material-ui/icons/Delete"
import AddInvoiceHeader from "./AddVoucherHeader"
import AddInvoiceToolbar from "./AddVoucherToolbar"

const styles = (theme) => ({
  layoutRoot: {},
  table: {
    border: `1px solid ${theme.palette.divider}`,
  }
});

const defaultFormState = {
  date: null,
  familyName: "",
  initiator: "",
  funeralCoordinator: "",
  funeralLocation: "",
  duration: "",
  voucherItems: [
    { branchId: "", orgKey: "", serviceType: '', description: '', qty: 0, cost: 0, total: 0 }
  ],
  branchId: "",
  orgKey: "",
  payee: ""
}

function AddVoucher(props) {
  const { 
    classes, 
    match, 
    user,
    generateVoucher, 
    updateVoucher, 
    getVoucherById, 
    getEmployees, voucher, branches, employees, loading } = props;
  const [errors, setErrors] = useState({})

  const [form, setForm] = useState({...defaultFormState});

  console.log(voucher, "voucher add edit")

  useEffect(() => {
    getEmployees()
  }, [getEmployees, user.data])

  useEffect(() => {
    match.params.subId && getVoucherById(match.params.subId);
  }, [getVoucherById, match.params.subId])

  console.log(branches, "branches")

  const initDialog = useCallback(() => {
    /**
     * Dialog type: 'edit'
     */
    if (match.params.id === 'edit' && voucher) {
      setForm({ ...voucher });
    }

    /**
     * Dialog type: 'new'
     */
    if (match.params.id === 'new') {
      setForm({
        ...defaultFormState
      });
    }
  }, [voucher, match.params.id, setForm]);

  useEffect(() => {
    /**
     * After Dialog Open
     */
    if (voucher) {
      initDialog();
    }
  }, [voucher, initDialog]);

  const validate = (field) => (e) => {
    const temp = {}
    if(field === "initiator"){
      temp[field] = FuseUtils.validateEmail(form[field]) ? "" : "Email is not valid"
    }

    setErrors({ ...temp });
  }

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleDateChange = (name) => (date) => {
    setForm({...form, [name]: moment(date).format("YYYY-MM-DDTHH:mm:ss")})
  };

  function addServiceRow() {
    const newRole = { serviceType: '', description: '', qty: '', cost: '', total: '' }
    setForm({...form, voucherItems: [ ...form.voucherItems, newRole ]});
  }

  const removeServiceRow = (i) => () => {
    let updatedForm = form.voucherItems.slice(i, 1)
    setForm(updatedForm)
  }

  const handleMultiChange = i => event => {
    const { name, value } = event.target
    const { voucherItems } = form
    voucherItems[i][name] = value
    if(name === "qty" || name === "cost"){
      voucherItems[i].total = Number(voucherItems[i].cost * voucherItems[i].qty)
    }
    setForm({ ...form, voucherItems });
  }

  const canSubmit = () => {
    return ( 
      form.familyName.length > 0 &&
      form.initiator.length > 0 &&
      form.branchId &&
      form.funeralCoordinator &&
      form.voucherItems.length > 0
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    match.params.id === 'new'
      ? generateVoucher(form)
      : updateVoucher(form, form.id)
  };

  console.log(errors, "errors")
  console.log(form, "form")

  return (
    <FusePageSimple
      classes={{
        root: classes.layoutRoot,
      }}
      header={
        <div className='px-24'>
          <AddInvoiceHeader />
        </div>
      }
      contentToolbar={
        <div className='px-24'>
          <AddInvoiceToolbar />
        </div>
      }
      content={
        <form className='px-24' onSubmit={handleSubmit}>
          <FuseScrollbars className='flex-grow overflow-x-auto pb-24'>
            <div className='w-8/12 grid grid-cols-2 gap-x-24'>
              <TextField
                className='mt-8 mb-16'
                required
                label='Received by (Vendor)'
                autoFocus
                id='payee'
                name='payee'
                value={form.payee}
                onKeyUp={validate("payee")}
                onChange={handleChange}
                variant='outlined'
                fullWidth
              />

              <TextField
                className='mt-8 mb-16'
                required
                label='Family name'
                autoFocus
                id='familyName'
                name='familyName'
                value={form.familyName}
                onChange={handleChange}
                variant='outlined'
                fullWidth
              />

              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  className='mt-8 mb-16'
                  inputVariant='outlined'
                  format='MM/dd/yyyy'
                  id='payment-date'
                  label='Payment Date'
                  fullWidth
                  value={form.date}
                  onChange={handleDateChange("date")}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>

              <TextField
                className='mt-8 mb-16'
                select
                required
                label='Co-ordinator'
                id='funeralCoordinator'
                name='funeralCoordinator'
                value={form.funeralCoordinator}
                onChange={handleChange}
                variant='outlined'
                fullWidth
              >
                <MenuItem value="">Select co-ordinator</MenuItem>
                {employees.map(emp =>  
                  <MenuItem key={emp.id} value={emp.fullName}>
                    {emp.fullName}
                  </MenuItem>
                )}
              </TextField>  

              <TextField
                className='mt-8 mb-16'
                select
                required
                type="email"
                label='Initiator'
                id='initiator'
                name='initiator'
                value={form.initiator}
                onChange={handleChange}
                variant='outlined'
                fullWidth
              >
                <MenuItem value="">Select initiator</MenuItem>
                {employees.map(emp =>  
                  <MenuItem key={emp.id} value={emp.fullName}>
                    {emp.fullName}
                  </MenuItem>
                )}
              </TextField>

              <TextField
                className='mt-8 mb-16'
                select
                required
                label='Branch'
                id='branch-id'
                name='branchId'
                value={form.branchId}
                onChange={handleChange}
                variant='outlined'
                fullWidth
              >
                <MenuItem value="">Select branch</MenuItem>
                {branches.map(branch =>  
                  <MenuItem key={branch.id} value={branch.id}>
                    {branch.name}
                  </MenuItem>
                )}
              </TextField>  

              <TextField
                className='mt-8 mb-16'
                required
                label='Duration'
                id='duration'
                name='duration'
                value={form.duration}
                onChange={handleChange}
                variant='outlined'
                fullWidth
              />

              <TextField
                className='mt-8 mb-16'
                required
                label='Funeral Location'
                id='funeralLocation'
                name='funeralLocation'
                value={form.funeralLocation}
                onChange={handleChange}
                variant='outlined'
                multiline
                rows={2}
                rowsMax={4}
                fullWidth
              />
            </div>

            <div className="mb-24 mt-8">
              <Table className={classes.table} size="small" aria-labelledby='tableTitle'>
                <TableHead>
                  <TableRow>
                    <TableCell className="w-20">S/N</TableCell>
                    <TableCell>Service type</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Qty</TableCell>
                    <TableCell>Cost</TableCell>
                    <TableCell>Total</TableCell>
                    <TableCell align='right'>
                      <IconButton onClick={addServiceRow}>
                        <AddIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {form.voucherItems.map((n, i) => {
                    return (
                      <TableRow
                        className='h-64 cursor-pointer'
                        tabIndex={-1}
                        key={i}
                        onClick={() => {}}
                      >
                        <TableCell className="w-20" component='th' scope='row'>
                          {i+1}
                        </TableCell>
                        <TableCell component='th' scope='row'>
                          <TextField
                            className='mt-8 mb-16'
                            required
                            label='Service type'
                            id={`serviceType-${i}`}
                            name='serviceType'
                            value={n.serviceType}
                            onChange={handleMultiChange(i)}
                            variant='outlined'
                            fullWidth
                          />
                        </TableCell>

                        <TableCell className='truncate' component='th' scope='row'>
                          <TextField
                            className='mt-8 mb-16'
                            required
                            label='Description'
                            id={`description-${i}`}
                            onChange={handleMultiChange(i)}
                            name='description'
                            value={n.description}
                            variant='outlined'
                          />
                        </TableCell>

                        <TableCell className='truncate' component='th' scope='row'>
                          <TextField
                            className='mt-8 mb-16'
                            required
                            label='Qty'
                            id={`qty-${i}`}
                            onChange={handleMultiChange(i)}
                            name='qty'
                            value={n.qty}
                            variant='outlined'
                          />
                        </TableCell>

                        <TableCell className='truncate' component='th' scope='row'>
                          <TextField
                            className='mt-8 mb-16'
                            required
                            label='Cost'
                            id={`cost-${i}`}
                            onChange={handleMultiChange(i)}
                            name='cost'
                            value={n.cost}
                            variant='outlined'
                          />
                        </TableCell>

                        <TableCell className='truncate' component='th' scope='row'>
                          <TextField
                            className='mt-8 mb-16'
                            required
                            label='Total'
                            id={`total-${i}`}
                            name='total'
                            value={n.total}
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
              type="submit" 
              disabled={!canSubmit()}
              className='float-right' 
              variant='contained' 
              endIcon={loading && <CircularProgress color="inherit" size={16} />}
            >
              {match.params.id === "new" ? "Generate" : "Update"}
            </Button>
          </FuseScrollbars>
        </form>
      }
    />
  );
}

const mapStateToProps = ({vouchersApp, ezone, auth}) => {
  const { vouchers } = vouchersApp

  return {
    loading: vouchers.loading,
    user: auth.user,
    branches: ezone.branches.branches,
    employees: ezone.employees.employees,
    voucher: vouchers.voucher,
  }
};


const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    generateVoucher: Actions.generateVoucher,
    updateVoucher: Actions.updateVoucher,
    getVoucherById: Actions.getVoucherById,
    getEmployees: appActions.getEmployees,
  }, dispatch);
};

export default withStyles(styles, { withTheme: true })(connect(mapStateToProps, mapDispatchToProps)(withRouter(AddVoucher)));
