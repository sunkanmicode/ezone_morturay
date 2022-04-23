import React, { useState } from 'react';
import { Link, useRouteMatch } from "react-router-dom"
import { Icon, IconButton, MenuItem, Popover } from '@material-ui/core';
import { FuseAnimate } from '@fuse';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../store/actions';

function CustomerToolbar(props) {
  const dispatch = useDispatch();
  const match = useRouteMatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const customer = useSelector(({customerApp}) => customerApp.customer.customer);
  console.log(customer, 'cust111');
  

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div className='flex flex-1 items-center justify-between overflow-hidden sm:px-16'>
      <IconButton onClick={() => props.history.goBack()}>
        <Icon>arrow_back</Icon>
      </IconButton>

      <div className='flex items-center justify-start' aria-label='Toggle star'>
        <FuseAnimate animation='transition.expandIn' delay={100}>
          <IconButton onClick={() => dispatch(Actions.openEditCustomerDialog(customer))}>
            <Icon>edit</Icon>
          </IconButton>
        </FuseAnimate>
        <FuseAnimate animation='transition.expandIn' delay={100}>
          <>
          <IconButton aria-describedby={id} onClick={handleClick}>
            <Icon>more_horiz</Icon>
          </IconButton>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',                                 
            }}
          >
            {/* <MenuItem component={Link} to={`/customers/${match.params.id}/relatives`}>View Relatives</MenuItem> */}
            {/* <MenuItem component={Link} to={`/customers/${match.params.id}/payment-advice`}>Payment advice</MenuItem> */}
            <MenuItem component={Link} to={`/customers/new?type=returning&customerId=${match.params.id}`}>Request services</MenuItem>
          </Popover>
          </>
        </FuseAnimate>
      </div>
    </div>
  );
}

export default withRouter(CustomerToolbar);
