import React from 'react';
import { Icon, IconButton } from '@material-ui/core';
import { FuseAnimate } from '@fuse';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../../store/actions';

function VoucherToolbar(props) {
  const dispatch = useDispatch()
  const voucher = useSelector(({vouchersApp}) => vouchersApp.vouchers.voucher) 

  const handleEditClick = (item) => {
    props.history.push(`/vouchers/edit/${item.id}`)
  }

  console.log(voucher, "voucher toolbar")

  return (
    <div className='flex flex-1 items-center justify-between overflow-hidden sm:px-16'>
      <IconButton onClick={() => props.history.goBack()}>
        <Icon>arrow_back</Icon>
      </IconButton>

      <div className='flex items-center justify-start' aria-label='Toggle star'>
        <FuseAnimate animation='transition.expandIn' delay={100}>
          <IconButton disabled={!voucher} onClick={() => handleEditClick(voucher)}>
            <Icon>edit</Icon>
          </IconButton>
        </FuseAnimate>
        <FuseAnimate animation='transition.expandIn' delay={100}>
          <IconButton disabled={true} onClick={() => dispatch(Actions.deleteVoucher(voucher?.id))}>
            <Icon>delete</Icon>
          </IconButton>
        </FuseAnimate>
      </div>
    </div>
  );
}

export default withRouter(VoucherToolbar);
