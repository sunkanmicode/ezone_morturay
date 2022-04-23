import React from 'react';
import { withRouter } from 'react-router-dom';
import { Icon, Typography } from '@material-ui/core';
import { FuseAnimate } from '@fuse';
// import { useSelector } from 'react-redux';
// import * as Actions from '../store/actions';

function DeceasedHeader(props) {
  return (
    <div className='flex flex-1 w-full items-center justify-between'>
      <div className='flex items-center'>
        <FuseAnimate animation='transition.expandIn' delay={300}>
          <Icon className='text-32 mr-0 sm:mr-12'>person</Icon>
        </FuseAnimate>
        <FuseAnimate animation='transition.slideLeftIn' delay={300}>
          <Typography className='hidden sm:flex' variant='h6'>
            Receipt Details
          </Typography>
        </FuseAnimate>
      </div>

      <div className='flex flex-1 items-center justify-center px-12'></div>
    </div>
  );
}

export default withRouter(DeceasedHeader);
