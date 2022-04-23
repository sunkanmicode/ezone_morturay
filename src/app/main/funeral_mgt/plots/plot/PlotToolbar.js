import React from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Icon, IconButton } from "@material-ui/core"
import * as Actions from "./../../store/actions"
import {FuseAnimate} from "@fuse"

function PlotsToolbar(props) {
  const dispatch = useDispatch()
  const plot = useSelector(({plotsApp}) => plotsApp.plots.plot) 

  console.log(plot, "plot data toolbar")

  return (
    <div className='flex flex-1 items-center justify-between overflow-hidden sm:px-16'>
      <FuseAnimate animation='transition.expandIn' delay={100}>
        <IconButton onClick={() => props.history.goBack()}>
          <Icon>arrow_back</Icon>
        </IconButton>
      </FuseAnimate>

      <div className='flex items-center justify-start' aria-label='Toggle star'>
        <FuseAnimate animation='transition.expandIn' delay={100}>
          <IconButton disabled={true} onClick={() => dispatch(Actions.openEditPlotDialog(plot))}>
            <Icon>edit</Icon>
          </IconButton>
        </FuseAnimate>
        <FuseAnimate animation='transition.expandIn' delay={100}>
          <IconButton disabled={true} onClick={() => dispatch(Actions.deletePlot(plot?.id))}>
            <Icon>delete</Icon>
          </IconButton>
        </FuseAnimate>
      </div>
    </div>
  );
}

export default withRouter(PlotsToolbar);
