import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  CircularProgress,
  IconButton,
  TextField,
  Tooltip,
  // Checkbox,
  Typography,
  Box,
  Grid,
  Link,
  Paper,
  makeStyles,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouteLink } from 'react-router-dom';
import VisibilityOutlined from '@material-ui/icons/VisibilityOutlined';
import VisibilityOffOutlined from '@material-ui/icons/VisibilityOffOutlined';
import * as AuthActions from '../../../../auth/store/actions';

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <Link color='inherit' href='https://optisoft.ng/'>
        OptiSoft
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
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
  },
  iconButton: {
    width: 40,
    height: 40,
    padding: 0,
    '&:hover': {
      backgroundColor: theme.palette.grey[50],
    },
  },
}));

const LoginForm = (props) => {
  const dispatch = useDispatch();
  const loading = useSelector(({ auth }) => auth.loading);
  const classes = useStyles();
  const [visibility, setVisibility] = React.useState(false);

  const [values, setValues] = React.useState({
    username: '',
    password: '',
  });

  const handleVisibility = () => {
    setVisibility(!visibility);
  };

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const canBeSubmitted = () => {
    const { username, password } = values;
    return username !== '' && password !== '';
  };

  return (
    <div>
      <div className={classes.image} />

      <div className={classes.root}>
        <Grid container component={Paper} className={classes.grid}>
          <Grid item xs={false} sm={false} md={7} />
          <Grid item xs={12} sm={10} md={5} style={{ display: 'flex' }}>
            <div className={classes.paper}>
              <Box className={classes.avatar}>
                <img src='logo.svg' alt='' />
              </Box>
              <Typography component='h1' variant='h6'>
                Sign in
              </Typography>
              <Typography variant='body2'>
                <span>New User?</span>&nbsp;
                <RouteLink to='/register' variant='body2'>
                  Register
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
                  name='username'
                  InputProps={{
                    className: classes.input,
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  autoFocus
                  onChange={handleChange('username')}
                />
                <TextField
                  variant='outlined'
                  margin='normal'
                  required
                  fullWidth
                  name='password'
                  label='Password'
                  type={visibility ? 'text' : 'password'}
                  id='password'
                  InputProps={{
                    className: classes.input,
                    endAdornment: (
                      <Tooltip
                        title={visibility ? 'hide password' : 'show password'}
                        arrow
                      >
                        <IconButton
                          className={classes.iconButton}
                          onClick={handleVisibility}
                        >
                          {visibility ? (
                            <VisibilityOutlined />
                          ) : (
                            <VisibilityOffOutlined />
                          )}
                        </IconButton>
                      </Tooltip>
                    ),
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={handleChange('password')}
                />
                {/* <FormControlLabel
                  className={classes.label}
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                /> */}
                <Grid container>
                  <Grid item xs>
                    <RouteLink to='/forgot-password' variant='body2'>
                      Forgot password?
                    </RouteLink>
                  </Grid>
                </Grid>

                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  color='primary'
                  className={classes.submit}
                  disabled={loading ? loading : !canBeSubmitted()}
                  onClick={() => dispatch(AuthActions.submitLogin(values))}
                  endIcon={loading && <CircularProgress size={20} />}
                >
                  Sign In
                </Button>

                <Box mt={5}>
                  <Copyright />
                </Box>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

LoginForm.propTypes = {
  login: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  loading: PropTypes.bool,
};

export default React.memo(LoginForm);
