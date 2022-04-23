import React from 'react';
import { Icon, IconButton } from '@material-ui/core';
// import { useDispatch } from 'react-redux';
import { FuseAnimate } from '@fuse';
import { withRouter } from 'react-router-dom';
// import * as Actions from './../store/actions';

function InvoicesToolbar(props) {
  // const dispatch = useDispatch();

  return (
    <div className='flex flex-1 items-center justify-end overflow-hidden sm:px-16'>
      <div className='flex items-center justify-start' aria-label='Toggle star'>
        <FuseAnimate animation='transition.expandIn' delay={100}>
          <IconButton disabled={true} onClick={() => {}}>
            <Icon>print</Icon>
          </IconButton>
        </FuseAnimate>
        <FuseAnimate animation='transition.expandIn' delay={100}>
          <IconButton disabled={true} onClick={() => {}}>
            <Icon>delete</Icon>
          </IconButton>
        </FuseAnimate>
        <FuseAnimate animation='transition.expandIn' delay={100}>
          <IconButton disabled={true} onClick={() => {}}>
            <Icon>mail</Icon>
          </IconButton>
        </FuseAnimate>
      </div>
    </div>
  );
}

export default withRouter(InvoicesToolbar);
