import React from 'react';
import { Icon, IconButton } from '@material-ui/core';
import { FuseAnimate } from '@fuse';
import { withRouter, useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../../store/actions/index';

function ServicesToolbar(props) {
  const dispatch = useDispatch();
  const match = useRouteMatch()
  const service = useSelector(({inventoryApp}) => inventoryApp.services.service)

  console.log(service, "service toolbar")

  return (
    <div className='flex flex-1 items-center justify-between overflow-hidden sm:px-16'>
      <IconButton onClick={() => props.history.goBack()}>
        <Icon>arrow_back</Icon>
      </IconButton>

      <div className='flex items-center justify-start' aria-label='Toggle star'>
        <FuseAnimate animation='transition.expandIn' delay={100}>
          <IconButton disabled={!service} onClick={() => dispatch(Actions.openEditServiceDialog(service))}>
            <Icon>edit</Icon>
          </IconButton>
        </FuseAnimate>
        <FuseAnimate animation='transition.expandIn' delay={100}>
          <IconButton disabled={!service} onClick={() => dispatch(Actions.openConfirmDeleteDialog(match.params.id))}> 
            <Icon>delete</Icon>
          </IconButton>
        </FuseAnimate>
      </div>
    </div>
  );
}

export default withRouter(ServicesToolbar);
