import React from 'react';
import { Breadcrumbs, Typography } from '@material-ui/core';
import { FuseAnimate } from '@fuse';
import { withRouter, Link } from 'react-router-dom';

function AddVoucherToolbar(props) {
  
  return (
    <div className='flex flex-1 items-center justify-between overflow-hidden'>
      <div className='flex items-center justify-start' aria-label='Toggle star'>
        <FuseAnimate animation='transition.expandIn' delay={100}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" to="/vouchers">
              Vouchers
            </Link>
            <Typography color="textPrimary">New Voucher</Typography>
          </Breadcrumbs>
        </FuseAnimate>
      </div>
    </div>
  );
}

export default withRouter(AddVoucherToolbar);
