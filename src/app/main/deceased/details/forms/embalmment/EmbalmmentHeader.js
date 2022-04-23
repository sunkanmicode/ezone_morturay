import React from 'react';
import { Typography } from '@material-ui/core';
import { FuseAnimate } from '@fuse';

function EmbalmmentHeader(props) {
  return (
    <div className='flex flex-1 w-full items-center justify-between px-24'>
      <div className='flex flex-col items-start max-w-full'>
        <FuseAnimate animation='transition.slideRightIn' delay={300}>
          <Typography className='hidden sm:flex' variant='h6'>
            Embalmment Form
          </Typography>
        </FuseAnimate>

        <div className='flex items-center max-w-full'>
          <div className='flex flex-col min-w-0'></div>
        </div>
      </div>
    </div>
  );
}

export default EmbalmmentHeader;
