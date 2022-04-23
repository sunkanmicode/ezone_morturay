import React from 'react';
import { Icon, IconButton } from '@material-ui/core';
import { FuseAnimate } from '@fuse';
import { withRouter } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import * as Actions from '../store/actions/index';

function InvoiceToolbar(props) {
  //   const dispatch = useDispatch();
  const deceased = {};

  if (!deceased) {
    return null;
  }

  return (
    <div className='flex flex-1 items-center justify-between overflow-hidden sm:px-16'>
      <IconButton onClick={() => props.history.goBack()}>
        <Icon>arrow_back</Icon>
      </IconButton>

      <div className='flex items-center justify-start' aria-label='Toggle star'>
        <FuseAnimate animation='transition.expandIn' delay={100}>
          <IconButton onClick={() => {}}>
            <Icon>mail</Icon>
          </IconButton>
        </FuseAnimate>
      </div>
    </div>
  );
}

export default withRouter(InvoiceToolbar);
