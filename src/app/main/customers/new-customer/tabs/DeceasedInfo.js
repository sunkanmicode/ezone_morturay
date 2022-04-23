import React, { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';
import { FuseAnimate } from '@fuse';
import _ from '@lodash';
import {
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Card,
  CardHeader,
  CardContent,
  MenuItem,
  TextField,
  Typography,
  Switch,
  Box,
} from '@material-ui/core';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

const genders = ['Male', 'Female'].map((sex) => ({
  value: sex,
  label: sex,
}));

function DeceasedInfo(props) {
  const {
    form,
    handleChange,
    handleDateChange,
    handleTimeChange,
    handleNext,
    handlePrev,
    tabValue,
    deceasedByCustomer,
    handleDeceasedSelect,
    selectedDeceased
  } = props;
  const [map, setMap] = useState('details');
  const serviceReducer = useSelector(({ customerApp }) => customerApp.services);
  const services = serviceReducer.services.services;
  const [selectPreviousDeceased, setSelectPreviousDeceased] = useState(true);

  const serviceIds = form.service.map((s) => s.service_id);
  const selectedServices = _.findByValues(services, 'id', serviceIds);
  React.useEffect(() => {
    if(deceasedByCustomer.length === 0){
      setSelectPreviousDeceased(false)
    }
  }, [])

  function canBeSubmitted() {
    return (
      (form.deceased?.first_name?.length > 0 &&
        form.deceased?.last_name?.length > 0 &&
        form.deceased?.address?.length > 0 &&
        form.deceased?.gender?.length > 0 &&
        form.deceased?.place_of_death?.length > 0 &&
        form.deceased?.dateof_assertion?.length > 0 &&
        form.deceased?.time_of_death?.length > 0 &&
        form.deceased?.name_of_hospital?.length > 0 &&
        form.deceased?.how_was_death_assertained?.length > 0 &&
        form.deceased?.medical_attendant_name?.length > 0 &&
        form.deceased?.hospital_address?.length > 0 &&
        form.deceased?.cause_of_death?.length > 0) ||
      !_.some(selectedServices, { is_admisson: true })
    );
  }

  const handleDeceasedSwitch = (event) => {
    setSelectPreviousDeceased(event.target.checked);
      props.clearSelectedDeceased();

  };

console.log({selectPreviousDeceased, canSub: canBeSubmitted()})
  return (
    <div className='pb-24'>
      {deceasedByCustomer.length > 0 && (
        <Box pb={3} display='flex' alignItems='center'>
          <Switch
            checked={selectPreviousDeceased}
            {...label}
            defaultChecked
            onChange={handleDeceasedSwitch}
          />
          <Typography>Select from previously added deceased</Typography>
        </Box>
      )}

      {_.some(selectedServices, { is_admisson: true }) &&
      deceasedByCustomer.length > 0 &&
      selectPreviousDeceased ? (
        <Box>
          <TextField
            className='mt-8 mb-16'
            required
            select
            label='Deceased'
            id='customer-deceased'
            name='customer-deceased'
            value={selectedDeceased}
            onChange={handleDeceasedSelect}
            variant='outlined'
            fullWidth
          >
            <MenuItem value=''>Select deceased</MenuItem>
            {deceasedByCustomer.map((g) => (
              <MenuItem key={`${g.firstName} ${g.lastName}`} value={`${g.firstName} ${g.lastName}`}>
                {`${g.firstName} ${g.lastName}`}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      ) : _.some(selectedServices, { is_admisson: true }) ? (
        <Fragment>
          <Accordion
            elevation={1}
            expanded={map === 'details'}
            onChange={() => setMap(map !== 'details' ? 'details' : false)}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className='text-lg font-bold'>
                Deceased Details
              </Typography>
            </AccordionSummary>
            <AccordionDetails className='flex flex-col md:flex-row'>
              <div className='w-full h-320'>
                <div className='grid grid-cols-2 gap-x-24'>
                  <TextField
                    className='mt-8 mb-16'
                    required
                    label='First Name'
                    autoFocus
                    id='deceased-first-name'
                    name='deceased.first_name'
                    value={form.deceased.first_name}
                    onChange={handleChange}
                    variant='outlined'
                    fullWidth
                  />

                  <TextField
                    className='mt-8 mb-16'
                    required
                    label='Other Name'
                    id='deceased-other-name'
                    name='deceased.other_name'
                    value={form.deceased.other_name}
                    onChange={handleChange}
                    variant='outlined'
                    fullWidth
                  />

                  <TextField
                    className='mt-8 mb-16'
                    required
                    label='Last Name'
                    id='last_name'
                    name='deceased.last_name'
                    value={form.deceased.last_name}
                    onChange={handleChange}
                    variant='outlined'
                    fullWidth
                  />

                  <TextField
                    className='mt-8 mb-16'
                    required
                    label='Address'
                    id='address'
                    name='deceased.address'
                    value={form.deceased.address}
                    onChange={handleChange}
                    variant='outlined'
                    fullWidth
                  />

                  <TextField
                    className='mt-8 mb-16'
                    required
                    type='number'
                    label='Age'
                    id='age'
                    name='deceased.age'
                    value={form.deceased.age}
                    onChange={handleChange}
                    variant='outlined'
                    fullWidth
                  />

                  <TextField
                    className='mt-8 mb-16'
                    required
                    select
                    label='Gender'
                    id='deceased-gender'
                    name='deceased.gender'
                    value={form.deceased.gender}
                    onChange={handleChange}
                    variant='outlined'
                    fullWidth
                  >
                    <MenuItem value=''>Select gender</MenuItem>
                    {genders.map((g) => (
                      <MenuItem key={g.value} value={g.value}>
                        {g.value}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion
            elevation={1}
            expanded={map === 'assertion'}
            onChange={() => setMap(map !== 'assertion' ? 'assertion' : false)}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className='text-lg font-bold'>
                Death Assertion
              </Typography>
            </AccordionSummary>
            <AccordionDetails className='flex flex-col md:flex-row'>
              <div className='w-full h-320'>
                <div className='grid grid-cols-2 gap-x-24'>
                  <TextField
                    className='mt-8 mb-16'
                    required
                    label='Place of Death'
                    autoFocus
                    id='deceased_place_of_death'
                    name='deceased.place_of_death'
                    value={form.deceased.place_of_death}
                    onChange={handleChange}
                    variant='outlined'
                    fullWidth
                  />

                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      margin='normal'
                      className='mt-8 mb-16'
                      format='dd/MM/yyyy'
                      inputVariant='outlined'
                      id='date-of-death'
                      label='Date of assertion'
                      value={form.deceased.dateof_assertion}
                      onChange={handleDateChange('deceased.dateof_assertion')}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                  </MuiPickersUtilsProvider>

                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardTimePicker
                      margin='normal'
                      className='mt-8 mb-16'
                      inputVariant='outlined'
                      format='hh:mm:ss a'
                      id='time-of-death'
                      label='Time of death'
                      value={form.deceased.time_of_death}
                      onChange={handleTimeChange('deceased.time_of_death')}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                  </MuiPickersUtilsProvider>

                  <TextField
                    className='mt-8 mb-16'
                    required
                    label='Cause of death'
                    autoFocus
                    id='cause_of_death'
                    name='deceased.cause_of_death'
                    value={form.deceased.cause_of_death}
                    onChange={handleChange}
                    variant='outlined'
                    fullWidth
                  />

                  <TextField
                    className='mt-8 mb-16'
                    required
                    label='How was death ascertained?'
                    autoFocus
                    id='how_was_death_assertained'
                    name='deceased.how_was_death_assertained'
                    value={form.deceased.how_was_death_assertained}
                    onChange={handleChange}
                    variant='outlined'
                    fullWidth
                  />
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion
            elevation={1}
            expanded={map === 'medical'}
            onChange={() => setMap(map !== 'medical' ? 'medical' : false)}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className='text-lg font-bold'>Medical</Typography>
            </AccordionSummary>
            <AccordionDetails className='flex flex-col md:flex-row'>
              <div className='w-full h-320'>
                <div className='grid grid-cols-2 gap-x-24'>
                  <TextField
                    className='mt-8 mb-16'
                    required
                    label='Name of Hospital'
                    autoFocus
                    id='deceased-hospital-name'
                    name='deceased.name_of_hospital'
                    value={form.deceased.name_of_hospital}
                    onChange={handleChange}
                    variant='outlined'
                    fullWidth
                  />

                  <TextField
                    className='mt-8 mb-16'
                    required
                    label='Medical attendant Name'
                    autoFocus
                    id='deceased-hospital-attendant'
                    name='deceased.medical_attendant_name'
                    value={form.deceased.medical_attendant_name}
                    onChange={handleChange}
                    variant='outlined'
                    fullWidth
                  />

                  <TextField
                    className='mt-8 mb-16'
                    required
                    label='Hospital Address'
                    autoFocus
                    id='deceased-hospital-address'
                    name='deceased.hospital_address'
                    value={form.deceased.hospital_address}
                    onChange={handleChange}
                    variant='outlined'
                    fullWidth
                  />
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
        </Fragment>
      ) : (
        <Fragment>
          <div className='flex justify-center'>
            <Card elevation={1} className='w-400'>
              <CardHeader
                className='items-center'
                title='Deceased Information'
                titleTypographyProps={{ variant: 'h6' }}
                avatar={<InfoIcon color='action' />}
              />
              <CardContent className='text-justify'>
                <Typography>
                  Deceased information is not needed for services that doesn't
                  require admission
                </Typography>
              </CardContent>
            </Card>
          </div>
        </Fragment>
      )}

      <div className='flex justify-end space-x-8 my-16'>
        {tabValue > 0 && (
          <FuseAnimate animation='transition.slideRightIn' delay={300}>
            <Button
              className='whitespace-no-wrap'
              variant='contained'
              color='default'
              disableElevation
              onClick={handlePrev}
            >
              Back
            </Button>
          </FuseAnimate>
        )}
        {tabValue < 5 && (
          <FuseAnimate animation='transition.slideRightIn' delay={300}>
            <Button
              className='whitespace-no-wrap'
              variant='contained'
              disableElevation
              onClick={handleNext}
              disabled={ selectPreviousDeceased? !Boolean(Object.entries(selectedDeceased).length > 0) : !canBeSubmitted()}
            >
              Next
            </Button>
          </FuseAnimate>
        )}
      </div>
    </div>
  );
}

export default DeceasedInfo;
