import React from 'react';
import { /*Icon, IconButton*/ Typography } from '@material-ui/core';
import { FuseAnimate } from '@fuse';
import { withRouter } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import * as Actions from '../store/actions/index';

function ServicesToolbar(props) {
  // const dispatch = useDispatch();
  // const match = useRouteMatch()
  // const service = useSelector(({inventoryApp}) => inventoryApp.services.service)

  return (
    <div className='flex flex-1 items-center justify-between overflow-hidden sm:px-16'>
      <FuseAnimate>
        <Typography variant="subtitle1"></Typography>
      </FuseAnimate>

      <div className='flex items-center justify-start' aria-label='Toggle star'>
        {/* <FuseAnimate animation='transition.expandIn' delay={100}>
          <IconButton onClick={() => dispatch(Actions.openEditServiceDialog(service))}>
            <Icon>edit</Icon>
          </IconButton>
        </FuseAnimate>
        <FuseAnimate animation='transition.expandIn' delay={100}>
          <IconButton onClick={() => dispatch(Actions.deleteService(match.params.id))}>
            <Icon>delete</Icon>
          </IconButton>
        </FuseAnimate> */}
      </div>
    </div>
  );
}

export default withRouter(ServicesToolbar);
