import React from 'react';
import PropTypes from 'prop-types';
import {
  // Avatar,
  Button,
  TextField,
  Typography,
  Box,
  Grid,
  Link,
  Paper,
  makeStyles,
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { Link as RouteLink } from 'react-router-dom';
import * as AuthActions from '../../../../auth/store/actions';

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <Link color='inherit' href='https://material-ui.com/'>
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: '100vh',
    padding: '50px',
    [theme.breakpoints.down('md')]: {
      padding: '20px',
    },
  },
  grid: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.grey[50],
    borderRadius: theme.spacing(5),
    overflowX: 'auto',
    '&::-webkit-scrollbar': {
      width: '6px',
      backgroundColor: '#F5F5F5',
    },
    '&::-webkit-scrollbar-track': {
      '-webkitBoxShadow': 'inset 0 0 6px rgba(0,0,0,0.3)',
      borderRadius: '10px',
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '10px',
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.5)',
      backgroundColor: theme.palette.grey[200],
    },
    [theme.breakpoints.down('md')]: {
      // padding: theme.spacing(1, 0),
    },
  },
  image: {
    [theme.breakpoints.up('md')]: {
      width: '55%',
      height: '100vh',
      backgroundImage: `url(assets/images/backgrounds/auth-banner.svg)`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center right',
      position: 'absolute',
      top: 0,
      bottom: 0,
    },
  },
  gridItem: {
    display: 'flex',
  },
  paper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: theme.spacing(5),
    padding: theme.spacing(2),
    border: '1px solid #F1F5F8',
    backgroundColor: '#FFFFFF',
    [theme.breakpoints.up('md')]: {
      margin: theme.spacing(4),
    },
  },
  avatar: {
    margin: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  input: {
    height: 40,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#1A88E1',
  },
  submit2: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: theme.palette.common.white,
    color: '#F90000',
    '&:hover': {
      backgroundColor: '#F90000',
      color: theme.palette.common.white,
    },
  },
  option: {
    width: '100%',
    color: theme.palette.grey[600],
    lineHeight: '0.1',
    textAlign: 'center',
    margin: '10px 0 20px',
    borderBottom: `1px solid ${theme.palette.grey[500]}`,
    '& span': {
      background: '#fff',
      padding: '0 10px',
    },
  },
}));

const ForgotPasswordForm = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [values, setValues] = React.useState({
    username: '',
  });

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const canBeSubmitted = () => {
    const { username } = values;
    return username !== '';
  };

  return (
    <React.Fragment>
      <div className={classes.image} />

      <div className={classes.root}>
        <Grid container component={Paper} className={classes.grid}>
          <Grid item xs={false} sm={false} md={7} />
          <Grid item xs={12} sm={10} md={5} className={classes.gridItem}>
            <div className={classes.paper}>
              <Box className={classes.avatar}>
                <img src='assets/images/logos/ezone.svg' alt='' />
              </Box>
              <Typography component='h1' variant='h6'>
                Forgot Password
              </Typography>
              <Typography variant='body2'>
                <span>Remembered your password?</span>&nbsp;
                <RouteLink to='/login' variant='body2'>
                  Login
                </RouteLink>
              </Typography>
              <div>
                <TextField
                  variant='outlined'
                  margin='normal'
                  required
                  fullWidth
                  id='username'
                  label='Email Address'
                  type='email'
                  onChange={handleChange('username')}
                  value={values.username ? values.username : ''}
                  InputProps={{
                    className: classes.input,
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  color='primary'
                  className={classes.submit}
                  disabled={!canBeSubmitted()}
                  onClick={() => dispatch(AuthActions.submitLogin(values))}
                >
                  Reset Password
                </Button>

                <Box mt={5}>
                  <Copyright />
                </Box>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
};

ForgotPasswordForm.propTypes = {
  forgotPasswordAction: PropTypes.func,
};

export default React.memo(ForgotPasswordForm);
