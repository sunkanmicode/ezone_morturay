import React from 'react';
import { Icon, Typography } from '@material-ui/core';
import { FuseAnimate } from '@fuse';
import { Link } from 'react-router-dom';
// import * as Actions from '../store/actions';

function AddInvoiceHeader(props) {
  // const dispatch = useDispatch();

  return (
    <div className='flex flex-1 w-full items-center justify-between'>
      <div className='flex flex-col'>
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
        <FuseAnimate animation='transition.slideLeftIn' delay={300}>
          <Typography className='hidden sm:flex' variant='h6'>
						<Icon className='text-32 mr-0 sm:mr-12'>person</Icon>
            New Proforma Invoice
          </Typography>
        </FuseAnimate>
      </div>
    </div>
  );
}

export default AddInvoiceHeader;
