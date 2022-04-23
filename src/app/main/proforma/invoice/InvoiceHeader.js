import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Icon, Typography } from '@material-ui/core';
import { FuseAnimate } from '@fuse';

function DeceasedHeader(props) {
  return (
    <div className='flex flex-1 w-full items-center justify-between'>
      <div className="flex flex-col">
        <FuseAnimate animation='transition.slideRightIn' delay={300}>
					<Typography
						className='normal-case flex items-center sm:mb-12'
						component={Link}
						role='button'
						to='/proforma'
						color='inherit'
					>
						<Icon className='mr-4 text-20'>arrow_back</Icon>
						Proforma Invoices
					</Typography>
        </FuseAnimate>

        <div className='flex items-center'>
          <FuseAnimate animation='transition.expandIn' delay={300}>
            <Icon className='text-32 mr-0 sm:mr-12'>receipt</Icon>
          </FuseAnimate>
          <FuseAnimate animation='transition.slideLeftIn' delay={300}>
            <Typography className='hidden sm:flex' variant='h6'>
              Proforma Invoice Details
            </Typography>
          </FuseAnimate>
        </div>
      </div>

      <div className='flex flex-1 items-center justify-center px-12'>
        
      </div>
    </div>
  );
}

export default withRouter(DeceasedHeader);
