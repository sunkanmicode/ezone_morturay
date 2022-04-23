import React, { useState } from 'react';
import {
  Icon,
  IconButton,
  Button,
  Grid,
  Popover,
  MenuItem,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { FuseAnimate } from '@fuse';
import { withRouter } from 'react-router-dom';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import moment from 'moment';
// import { useDispatch } from 'react-redux';
// import * as Actions from '../store/actions/index';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 'fit-content',
    // border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(0.2, 1),
  },
}));

function ReportsToolbar(props) {
  //   const dispatch = useDispatch();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [form, setForm] = useState({
    startDate: moment().format('YYYY-MM-DDTHH:mm:ss'),
    endDate: moment().format('YYYY-MM-DDTHH:mm:ss'),
  });

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  const handleDateChange = (name) => (date) => {
    setForm({ ...form, [name]: date });
  };

  const reports = {};

  if (!reports) {
    return null;
  }

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : null;

  return (
    <div className='flex flex-1 items-center justify-between overflow-hidden sm:px-16 py-2'>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify='flex-start' className={classes.root}>
          <KeyboardDatePicker
            disableToolbar
            variant='inline'
            format='MM/dd/yyyy'
            id='start-date'
            label='Start Date'
            value={form.startDate}
            onChange={handleDateChange}
            InputProps={{
              disableUnderline: true,
            }}
            InputLabelProps={{
              shrink: true,
              disabled: true,
            }}
            keyboardIcon={<ExpandMoreIcon fontSize='small' />}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
          <KeyboardDatePicker
            disableToolbar
            variant='inline'
            format='MM/dd/yyyy'
            id='end-date'
            label='End Date'
            value={form.endDate}
            onChange={handleDateChange}
            InputProps={{
              disableUnderline: true,
            }}
            InputLabelProps={{
              shrink: true,
              disabled: true,
            }}
            keyboardIcon={<ExpandMoreIcon fontSize='small' />}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </Grid>
      </MuiPickersUtilsProvider>

      <div className='flex items-center justify-start' aria-label='Toggle star'>
        <FuseAnimate animation='transition.expandIn' delay={100}>
          <IconButton onClick={() => {}}>
            <Icon>assignment</Icon>
          </IconButton>
        </FuseAnimate>
        <FuseAnimate animation='transition.expandIn' delay={100}>
          <IconButton onClick={() => {}}>
            <Icon>print</Icon>
          </IconButton>
        </FuseAnimate>
        <FuseAnimate animation='transition.expandIn' delay={100}>
          <div className='ml-16'>
            <Button
              aria-describedby={id}
              variant='contained'
              size='small'
              disableElevation
              onClick={handleClick}
            >
              <span className='whitespace-no-wrap'>Export as</span>{' '}
              <Icon>expand_more</Icon>
            </Button>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
            >
              <MenuItem>PDF</MenuItem>
            </Popover>
          </div>
        </FuseAnimate>
      </div>
    </div>
  );
}

export default withRouter(ReportsToolbar);
