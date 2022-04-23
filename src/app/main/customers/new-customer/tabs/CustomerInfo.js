import React, { Fragment } from 'react';
import {FuseAnimate} from "@fuse"
import { Button, Card, CardContent, CardHeader, Typography, TextField, MenuItem } from '@material-ui/core';
import InfoIcon from "@material-ui/icons/InfoOutlined"

const relationships = ["Brother", "Sister", "Mother", "Father", "Son", "Daughter", "Others"].map(r => ({
  label: r,
  value: r,
}))

function CustomerInfo(props) {
  const { form, branches, handleChange, type, errors, validateField, handleNext, handlePrev, tabValue} = props;

  function canBeSubmitted() {
    return (
      form.first_name.length > 0 &&
      form.last_name.length > 0 &&
      form.email.length > 0 &&
      form.phone_number.length > 0 &&
      !errors.phone_number && !errors.email
    )
  }

  return (
    <Fragment>
      {type !== "returning" ?
        <div>
          <div className='grid grid-cols-2 gap-x-24'>
            <TextField
              className='mt-8 mb-16'
              required
              label='First Name'
              autoFocus
              id='first-name'
              name='first_name'
              value={form.first_name}
              onChange={handleChange}
              variant='outlined'
              fullWidth
            />

            <TextField
              className='mt-8 mb-16'
              required
              label='Last Name'
              id='last-name'
              name='last_name'
              value={form.last_name}
              onChange={handleChange}
              variant='outlined'
              fullWidth
            />

            <TextField
              className='mt-8 mb-16'
              required
              label='Other Name'
              id='other-name'
              name='other_name'
              value={form.other_name}
              onChange={handleChange}
              variant='outlined'
              fullWidth
            />

            <TextField
              className='mt-8 mb-16'
              label='Email'
              type="email"
              id='email'
              name='email'
              value={form.email}
              onChange={handleChange}
              onKeyUp={validateField("email")}
              variant='outlined'
              error={Boolean(errors['email'])}
              helperText={errors['email']}
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

            <TextField
              className='mt-8 mb-16'
              required
              select
              label='Relationship with deceased'
              id='relationship_with_deceased'
              name='relationship_with_deceased'
              value={form.relationship_with_deceased}
              onChange={handleChange}
              variant='outlined'
              fullWidth
            >
              <MenuItem value="">Select relation with deceased</MenuItem>
              {relationships.map(r => 
                <MenuItem key={r.value} value={r.value}>{r.value}</MenuItem>
              )}
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
              fullWidth
            />

            <TextField
              className='mt-8 mb-16'
              required
              label='Phone'
              id='phone'
              name='phone_number'
              value={form.phone_number}
              onChange={handleChange}
              onKeyUp={validateField("phone_number")}
              error={Boolean(errors['phone_number'])}
              helperText={errors['phone_number']}
              variant='outlined'
              fullWidth
            />
          </div>

          <div className="flex justify-end space-x-8 my-16">
            {tabValue > 0 &&
              <FuseAnimate animation='transition.slideRightIn' delay={300}>
                <Button
                  className='whitespace-no-wrap'
                  variant='contained'
                  color="default"
                  disableElevation
                  onClick={handlePrev}
                >
                  Back
                </Button>
              </FuseAnimate>
            }
            {tabValue < 5 &&
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
            }
          </div>
        </div>
        :
        <div className="flex justify-center">
          <Card elevation={1} className="w-400">
            <CardHeader 
              className="items-center"
              title="Customer Information" 
              titleTypographyProps={{variant: "h6"}} 
              avatar={<InfoIcon color="action" />} 
            />
            <CardContent className="text-justify">
              <Typography>Customer information is not required for a returning customer</Typography>
            </CardContent>
          </Card>
        </div>
      }
    </Fragment>
  );
}

export default CustomerInfo;
