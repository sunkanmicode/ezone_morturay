import React, { Fragment } from 'react';
import { FuseAnimate } from '@fuse';
import {
  Button,
  Icon,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  MenuItem,
  IconButton,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'block',
  },
}));

const relationships = [
  'Brother',
  'Sister',
  'Mother',
  'Father',
  'Son',
  'Daughter',
  'Others',
].map((r) => ({
  label: r,
  value: r,
}));

function RelativesInfo(props) {
  const classes = useStyles();
  const {
    form,
    errors,
    validateField,
    handleRowChange,
    addRelativeRow,
    removeRelativeRow,
    handlePrev,
    handleNext,
    tabValue,
  } = props;
  const [expanded, setExpanded] = React.useState('relatives');

  const handlePanelChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  function canBeSubmitted() {
    return form.relative.length > 0;
  }

  return (
    <Fragment>
      <div>
        <Accordion
          expanded={expanded === 'relatives'}
          onChange={handlePanelChange('relatives')}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='relatives-content'
            id='relatives-header'
          >
            <Button className='' color='primary'>
              Add Relatives
            </Button>
          </AccordionSummary>
          <AccordionDetails className={classes.root}>
            <div className='w-full flex mb-4'>
              <Button onClick={addRelativeRow}>
                <Icon>add</Icon> Add
              </Button>
            </div>

            <div className='space-y-8'>
              {form.relative &&
                form.relative.map((r, i) => (
                  <div className='flex justify-between items-start' key={i}>
                    <div className='w-full grid grid-cols-4 gap-x-8'>
                      <TextField
                        className='mt-8 mb-16'
                        required
                        label='First Name'
                        autoFocus
                        id='relative-first-name'
                        name='first_name'
                        value={r.first_name}
                        onChange={handleRowChange(i)}
                        variant='outlined'
                        fullWidth
                      />

                      <TextField
                        className='mt-8 mb-16'
                        required
                        label='Last Name'
                        id='relative-last-name'
                        name='last_name'
                        value={r.last_name}
                        onChange={handleRowChange(i)}
                        variant='outlined'
                        fullWidth
                      />

                      <TextField
                        className='mt-8 mb-16'
                        required
                        label='Other Name'
                        id='relative-other-name'
                        name='other_name'
                        value={r.other_name}
                        onChange={handleRowChange(i)}
                        variant='outlined'
                        fullWidth
                      />

                      <TextField
                        className='mt-8 mb-16'
                        type='email'
                        label='Email'
                        id='relative-email'
                        name='email'
                        value={r.email}
                        onChange={handleRowChange(i)}
                        onKeyUp={validateField('relative')}
                        variant='outlined'
                        error={Boolean(
                          errors?.relative && errors?.relative[i]?.email
                        )}
                        helperText={
                          errors?.relative && errors?.relative[i]?.email
                        }
                        fullWidth
                      />

                      <TextField
                        className='mt-8 mb-16'
                        required
                        select
                        label='Relationship with deceased'
                        id='relative.relationship_with_deceased'
                        name='relationship_with_deceased'
                        value={r.relationship_with_deceased}
                        onChange={handleRowChange(i)}
                        variant='outlined'
                        fullWidth
                      >
                        <MenuItem value=''>
                          Select relation with deceased
                        </MenuItem>
                        {relationships.map((r) => (
                          <MenuItem key={r.value} value={r.value}>
                            {r.value}
                          </MenuItem>
                        ))}
                      </TextField>

                      <TextField
                        className='mt-8 mb-16'
                        required
                        label='Address'
                        id='relative-address'
                        name='address'
                        value={r.address}
                        onChange={handleRowChange(i)}
                        variant='outlined'
                        fullWidth
                      />

                      <TextField
                        className='mt-8 mb-16'
                        required
                        label='Phone'
                        id='relative-phone'
                        name='phone_number'
                        value={r.phone_number}
                        onChange={handleRowChange(i)}
                        onKeyUp={validateField('relative')}
                        error={Boolean(
                          errors?.relative && errors?.relative[i]?.phone_number
                        )}
                        helperText={
                          errors?.relative && errors?.relative[i]?.phone_number
                        }
                        variant='outlined'
                        fullWidth
                      />
                    </div>
                    <IconButton onClick={removeRelativeRow(i)}>
                      <Icon>delete</Icon>
                    </IconButton>
                  </div>
                ))}
            </div>
          </AccordionDetails>
        </Accordion>

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
                disabled={!canBeSubmitted()}
              >
                Next
              </Button>
            </FuseAnimate>
          )}
        </div>
      </div>
    </Fragment>
  );
}

export default RelativesInfo;
