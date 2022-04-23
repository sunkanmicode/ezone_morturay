import React from 'react';
import { Icon, Typography } from '@material-ui/core';
import {Link, useRouteMatch} from "react-router-dom"
import {useSelector} from "react-redux"
import { FuseAnimate } from '@fuse';
import _ from "lodash"
// import { useDispatch, useSelector } from 'react-redux';
// import * as Actions from '../store/actions';

function RelativeHeader(props) {
  const match = useRouteMatch()
  const deceasedReducer = useSelector(({deceasedApp}) => deceasedApp.deceased);
  const deceased = deceasedReducer.deceased

  return (
    <div className='flex flex-1 w-full items-center justify-between'>
      <div className='flex flex-col items-start max-w-full'>
        <FuseAnimate animation='transition.slideRightIn' delay={300}>
					<Typography
						className='normal-case flex items-center sm:mb-12'
						component={Link}
						role='button'
						to={`/deceased/${match.params.id}/relatives`}
						color='inherit'
					>
						<Icon className='mr-4 text-20'>arrow_back</Icon>
						{_.startCase(deceased?.last_name)} Relatives
					</Typography>
        </FuseAnimate>
        <FuseAnimate animation='transition.slideRightIn' delay={300}>
          <Typography className='hidden sm:flex' variant='h6'>
            Relative Details
          </Typography>
        </FuseAnimate>

        <div className='flex items-center max-w-full'>
          <div className='flex flex-col min-w-0'></div>
        </div>
      </div>
    </div>
  );
}

export default RelativeHeader;
