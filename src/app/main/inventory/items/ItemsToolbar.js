import React from 'react';
import { useRouteMatch } from "react-router-dom";
import { Icon, IconButton } from '@material-ui/core';
import { FuseAnimate } from '@fuse';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../store/actions';

function ItemsToolbar(props) {
    const dispatch = useDispatch();
  const match = useRouteMatch();

  const itemReducer = useSelector(({inventoryApp}) => inventoryApp.items)
  const item = itemReducer.item

  if (!item) {
    return null;
  }

  return (
    <div className='flex flex-1 items-center justify-between overflow-hidden sm:px-16'>
      <IconButton onClick={() => props.history.goBack()}>
        <Icon>arrow_back</Icon>
      </IconButton>

      {match.params.id &&
        <div className='flex items-center justify-start' aria-label='Toggle star'>
          <FuseAnimate animation='transition.expandIn' delay={100}>
            <IconButton onClick={() => dispatch(Actions.openItemDialog(item))}>
              <Icon>edit</Icon>
            </IconButton>
          </FuseAnimate>
          <FuseAnimate animation='transition.expandIn' delay={100}>
            <IconButton onClick={() => dispatch(Actions.deleteItem(match.params.id))}>
              <Icon>delete</Icon>
            </IconButton>
          </FuseAnimate>
        </div>
      }
    </div>
  );
}

export default withRouter(ItemsToolbar);
