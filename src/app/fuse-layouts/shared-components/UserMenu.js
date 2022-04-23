import React, { useState } from 'react';
import {
  Avatar,
  Button,
  Icon,
  ListItemIcon,
  ListItemText,
  Popover,
  MenuItem,
  Typography,
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import * as authActions from 'app/auth/store/actions';
import { Link } from 'react-router-dom';
import { homeUrl } from '../../fuse-configs/baseURL';

function UserMenu(props) {
  const dispatch = useDispatch();
  const user = useSelector(({ auth }) => auth.user);

  const user2 = useSelector(({ auth }) => auth);

  //dev.ezoneapps.com/gateway/authserv/api/v1/users/get-by-email/{email}

  https: console.log(user, "user");
  console.log(user2, "user2");


  const [userMenu, setUserMenu] = useState(null);

  const userMenuClick = (event) => {
    setUserMenu(event.currentTarget);
  };

  const userMenuClose = () => {
    setUserMenu(null);
  };

  return (
    <React.Fragment>
      <Button className='h-64' onClick={userMenuClick}>
        {user.data?.organisation?.logo ? (
          <Avatar
            className=''
            alt='user photo'
            src={`data:image/jpg;base64,${user.data.organisation.logo}`}
          />
        ) : (
          <Avatar className=''>{user.data.organisation.companyName[0]}</Avatar>
        )}

        <div className='hidden md:flex flex-col ml-12 items-start'>
          <Typography component='span' className='normal-case font-600 flex'>
            {user.data.organisation.companyShortName}
          </Typography>
          <Typography className='text-11 capitalize' color='textSecondary'>
            {user.role.toString()}
          </Typography>
        </div>

        <Icon className='text-16 ml-12 hidden sm:flex' variant='action'>
          keyboard_arrow_down
        </Icon>
      </Button>

      <Popover
        open={Boolean(userMenu)}
        anchorEl={userMenu}
        onClose={userMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        classes={{
          paper: 'py-8',
        }}
      >
        {!user.role || user.role.length === 0 ? (
          <React.Fragment>
            <MenuItem component={Link} to='/login'>
              <ListItemIcon className='min-w-40'>
                <Icon>lock</Icon>
              </ListItemIcon>
              <ListItemText className='pl-0' primary='Login' />
            </MenuItem>
            <MenuItem component={Link} to='/register'>
              <ListItemIcon className='min-w-40'>
                <Icon>person_add</Icon>
              </ListItemIcon>
              <ListItemText className='pl-0' primary='Register' />
            </MenuItem>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <MenuItem
              component='a'
              href={`${homeUrl}/user-profile`}
              onClick={userMenuClose}
            >
              <ListItemIcon className='min-w-40'>
                <Icon>account_circle</Icon>
              </ListItemIcon>
              <ListItemText className='pl-0' primary='My Profile' />
            </MenuItem>
            <MenuItem
              onClick={() => {
                dispatch(authActions.logoutUser());
                userMenuClose();
              }}
            >
              <ListItemIcon className='min-w-40'>
                <Icon>exit_to_app</Icon>
              </ListItemIcon>
              <ListItemText className='pl-0' primary='Logout' />
            </MenuItem>
          </React.Fragment>
        )}
      </Popover>
    </React.Fragment>
  );
}

export default UserMenu;
