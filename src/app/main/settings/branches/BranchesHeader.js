import React from 'react';
import { withRouter } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { FuseAnimate } from '@fuse';

function BranchesHeader(props) {
  const { match } = props;

  return (
    <div className='flex flex-1 w-full items-center justify-between'>
      <FuseAnimate animation='transition.slideLeftIn' delay={300}>
        <Typography className='hidden sm:flex' variant='h6'>
          {match.params.id ? 'Branch Report Details' : 'Branches'}
        </Typography>
      </FuseAnimate>

      <div className='flex flex-1 items-start justify-end px-12 space-x-8'></div>
    </div>
  );
}

export default withRouter(BranchesHeader);
