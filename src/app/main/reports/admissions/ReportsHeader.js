import React from 'react';
import { withRouter } from 'react-router-dom';
import {
  Button,
  Grid,
  TextField,
  MenuItem,
  Typography,
  CircularProgress,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { FuseAnimate } from '@fuse';
import { useSelector, useDispatch } from 'react-redux';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import * as Actions from '../store/actions';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 'fit-content',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius * 2,
    padding: theme.spacing(0.2, 1),
  },
}));

function ReportsHeader(props) {
  const { match } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const branches = useSelector(({ ezone }) => ezone.branches.branches);
  const loading = useSelector(({ reportsApp }) => reportsApp.reports.loading);

  const form = useSelector(({ reportsApp }) => reportsApp.reports.form);

  const handleDateChange = (name) => (date) => {
    dispatch(Actions.setFormDate(name, date));
  };

  const handleChange = (event) => {
    dispatch(Actions.setForm(event));
  };

  const handleSubmit = () => {
    dispatch(Actions.getAdmissionReports(form));
  };

  const canSubmit = () => {
    return form.startDate && form.endDate && form.branchId;
  };

  console.log(form, 'form');

  return (
    <div className='flex flex-1 w-full items-center justify-between'>
      <FuseAnimate animation='transition.slideLeftIn' delay={300}>
        <Typography className='hidden sm:flex' variant='h6'>
          {match.params.id ? 'Admission Report Details' : 'Admission Reports'}
        </Typography>
      </FuseAnimate>

      <div className='flex flex-1 items-start justify-end px-12 space-x-8'>
        <FuseAnimate animation='transition.slideDownIn' delay={300}>
          <TextField
            className='min-w-128'
            select
            label='Branch'
            id='branch_id'
            name='branchId'
            value={form.branchId}
            onChange={handleChange}
            variant='outlined'
            size='small'
            InputLabelProps={{
              disabled: true,
            }}
          >
            <MenuItem value=''>Select branch</MenuItem>
            {branches.map((b) => (
              <MenuItem key={b.id} value={b.id}>
                {b.name}
              </MenuItem>
            ))}
          </TextField>
        </FuseAnimate>

        <div className='flex items-start space-x-8'>
          <FuseAnimate animation='transition.slideDownIn' delay={300}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container justify='flex-start' className={classes.root}>
                <div className='flex flex-col'>
                  <KeyboardDatePicker
                    disableToolbar
                    format='dd/MM/yyyy'
                    id='start-date'
                    label='Start'
                    value={form.startDate}
                    onChange={handleDateChange('startDate')}
                    InputProps={{
                      disableUnderline: true,
                    }}
                    InputLabelProps={{
                      disabled: true,
                    }}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </div>
                <div className='flex flex-col'>
                  <KeyboardDatePicker
                    disableToolbar
                    format='dd/MM/yyyy'
                    id='end-date'
                    label='End'
                    value={form.endDate}
                    onChange={handleDateChange('endDate')}
                    InputProps={{
                      disableUnderline: true,
                    }}
                    InputLabelProps={{
                      disabled: true,
                    }}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </div>
              </Grid>
            </MuiPickersUtilsProvider>
          </FuseAnimate>
          <FuseAnimate animation='transition.slideDownIn' delay={300}>
            <Button
              variant='contained'
              disableElevation
              onClick={handleSubmit}
              endIcon={loading && <CircularProgress size={16} />}
              disabled={!canSubmit()}
            >
              Filter
            </Button>
          </FuseAnimate>
        </div>
      </div>
    </div>
  );
}

export default withRouter(ReportsHeader);
