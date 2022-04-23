import React from 'react';
import { Icon, IconButton } from '@material-ui/core';
import { FuseAnimate } from '@fuse';
import { withRouter } from 'react-router-dom';

function BranchesToolbar(props) {
  return (
    <div className='flex flex-1 items-center justify-between overflow-hidden sm:px-16 py-2'>
      <div className='flex items-start space-x-8'></div>

      <div className='flex items-center justify-start' aria-label='Toggle star'>
        <FuseAnimate animation='transition.expandIn' delay={100}>
          <IconButton onClick={() => {}}>
            <Icon>print</Icon>
          </IconButton>
        </FuseAnimate>
      </div>
    </div>
  );
}

export default withRouter(BranchesToolbar);
