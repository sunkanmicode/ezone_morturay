import React from 'react';
import { Icon, IconButton, Typography } from '@material-ui/core';
import { FuseAnimate } from '@fuse';
import { withRouter } from 'react-router-dom';
// import * as Actions from '../store/actions';

function AddVoucherHeader(props) {
  const { match } = props
  // const dispatch = useDispatch();

  return (
    <div className='flex flex-1 w-full items-center'>
      <FuseAnimate animation='transition.slideRightIn' delay={300}>
        <IconButton onClick={() => props.history.goBack()}>
          <Icon>arrow_back</Icon>
        </IconButton>
      </FuseAnimate>
      <FuseAnimate animation='transition.slideLeftIn' delay={300}>
        <Typography className='hidden sm:flex' variant='h6'>
          {match.params.id === "new" ? "New Voucher" : "Update Voucher"}
        </Typography>
      </FuseAnimate>
    </div>
  );
}

export default withRouter(AddVoucherHeader);
