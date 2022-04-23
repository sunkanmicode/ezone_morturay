import React from 'react';
import { Icon, IconButton } from '@material-ui/core';
import { FuseAnimate } from '@fuse';
import { withRouter } from 'react-router-dom';

function EmbalmmentToolbar(props) {

  return (
    <div className='flex flex-1 items-center justify-between overflow-hidden sm:px-16'>
			<FuseAnimate animation='transition.expandIn' delay={100}>
				<IconButton onClick={() => props.history.goBack()}>
					<Icon>arrow_back</Icon>
				</IconButton>
			</FuseAnimate>

      <div className='flex items-center justify-start' aria-label='Toggle star'>

      </div>
    </div>
  );
}

export default withRouter(EmbalmmentToolbar);
