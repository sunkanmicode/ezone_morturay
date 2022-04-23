import React from 'react';
import { Link } from "react-router-dom"
import { Icon, Typography } from '@material-ui/core';
import { FuseAnimate } from '@fuse';
// import { useDispatch, useSelector } from 'react-redux';
// import * as Actions from '../store/actions';

function ServiceHeader(props) {
  return (
    <div className='flex flex-1 w-full items-center justify-between'>
      <div className='flex flex-col items-start max-w-full'>
        <FuseAnimate animation='transition.slideRightIn' delay={300}>
					<Typography
						className='normal-case flex items-center sm:mb-12'
						component={Link}
						role='button'
						to='/inventory/services'
						color='inherit'
					>
						<Icon className='mr-4 text-20'>arrow_back</Icon>
						Products / Services
					</Typography>
        </FuseAnimate>

        <FuseAnimate animation='transition.slideRightIn' delay={300}>
          <Typography className='hidden sm:flex' variant='h6'>
            Service Details
          </Typography>
        </FuseAnimate>

        <div className='flex items-center max-w-full'>
          <div className='flex flex-col min-w-0'></div>
        </div>
      </div>
    </div>
  );
}

export default ServiceHeader;
