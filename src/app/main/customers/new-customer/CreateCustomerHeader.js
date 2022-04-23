import React from 'react';
import { useSelector } from 'react-redux';
import { Button, CircularProgress, Icon, Typography } from '@material-ui/core';
import { FuseAnimate } from '@fuse';
import { Link } from 'react-router-dom';

function CustomersHeader(props) {
  const { form, handleSubmit } = props;
  const loading = useSelector(
    ({ customerApp }) => customerApp.customer.loading
  );

  function canBeSubmitted() {
    return form.service[0]?.service_id;
  }

  console.log(loading, 'loading');

  return (
    <div className='flex flex-1 w-full items-center justify-between'>
      <div className='flex flex-col items-start max-w-full'>
        <FuseAnimate animation='transition.slideRightIn' delay={300}>
          <Typography
            className='normal-case flex items-center sm:mb-12'
            component={Link}
            role='button'
            to='/customers'
            color='inherit'
          >
            <Icon className='mr-4 text-20'>arrow_back</Icon>
            Customers
          </Typography>
        </FuseAnimate>

        <div className='flex items-center max-w-full'>
          <div className='flex flex-col min-w-0'>
            <FuseAnimate animation='transition.slideLeftIn' delay={300}>
              <Typography className='text-16 sm:text-20 truncate'>
                New Customer
              </Typography>
            </FuseAnimate>
            <FuseAnimate animation='transition.slideLeftIn' delay={300}>
              <Typography variant='caption'>Create a new Customer</Typography>
            </FuseAnimate>
          </div>
        </div>
      </div>
      <FuseAnimate animation='transition.slideRightIn' delay={300}>
        <Button
          className='whitespace-no-wrap'
          variant='contained'
          disabled={!canBeSubmitted()}
          onClick={handleSubmit}
          endIcon={loading && <CircularProgress size={16} />}
        >
          Save
        </Button>
      </FuseAnimate>
    </div>
  );
}

export default CustomersHeader;
