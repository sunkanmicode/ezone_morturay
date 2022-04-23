import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouteLink } from 'react-router-dom';
import {
  makeStyles,
  // Avatar,
  Button,
  CircularProgress,
  TextField,
  FormControlLabel,
  Checkbox,
  Typography,
  Box,
  Grid,
  Link,
  Paper,
  Tooltip,
  IconButton,
} from '@material-ui/core';
import VisibilityOutlined from '@material-ui/icons/VisibilityOutlined';
import VisibilityOffOutlined from '@material-ui/icons/VisibilityOffOutlined';
import { useDispatch } from 'react-redux';
import { red } from '@material-ui/core/colors';
import * as AuthActions from '../../../../auth/store/actions';
// import CountriesAndStates from '../../../../../@dummy/countries_states.json';

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <Link color='inherit' href='https://optisoft.ng'>
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
    overflow: 'auto',
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
    padding: theme.spacing(3, 0),
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
      maxWidth: '100%',
      height: '100%',
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
    justifyContent: 'center',
    borderRadius: theme.spacing(5),
    padding: theme.spacing(2),
    margin: theme.spacing(0, 4),
    border: `1px solid ${theme.palette.divider}`,
    backgroundColor: '#FFFFFF',
  },
  avatar: {
    margin: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  input: {
    margin: 0,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
  },
  label: {
    fontSize: 10,
  },
  span: {
    color: red[500],
  },
}));

const RegistrationForm = (props) => {
  const { loading } = props;
  const classes = useStyles();
  const dispatch = useDispatch();

  const [visibility, setVisibility] = React.useState(false);
  const [values, setValues] = React.useState({
    companyName: '',
    country: '',
    email: '',
    firstname: '',
    lastname: '',
    phoneNumber: '',
    password: '',
  });

  const handleChange = ({ target }) => {
    setValues({ ...values, [target.name]: target.value });
  };

  const canBeSubmitted = () => {
    const { companyName, country, email, password } = values;
    const passwordPattern = new RegExp(
      '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
    );
    const pass = passwordPattern.test(password);
    return (
      companyName !== '' && country !== '' && email !== '' && pass !== false
    );
  };

  // const handleSourceChange = (evt, value) => {
  //   setValues({ ...values, country: value.name });
  // };

  const handleVisibility = () => {
    setVisibility(!visibility);
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
                <img src='/assets/images/logos/ezone.svg' alt='' />
              </Box>
              <Typography component='h6' variant='h6'>
                Register
              </Typography>
              <Typography variant='body2'>
                <span>Existing User?</span>&nbsp;
                <RouteLink to='/login' variant='body2'>
                  Sign In
                </RouteLink>
              </Typography>

              <TextField
                variant='outlined'
                margin='normal'
                size='small'
                required
                fullWidth
                id='companyName'
                label='Company Name'
                name='companyName'
                InputProps={{
                  className: classes.input,
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={handleChange}
              />

              <TextField
                variant='outlined'
                margin='normal'
                size='small'
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                InputProps={{
                  className: classes.input,
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={handleChange}
              />

              <TextField
                variant='outlined'
                margin='normal'
                size='small'
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
                        size='small'
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
                onChange={handleChange}
                helperText='Password must contain at least one upper case, lower case,
                symbol,number and can not be less than 6 digits'
              />

              {/* <Autocomplete
                id="combo-itemCategory"
                size="small"
                options={CountriesAndStates}
                getOptionLabel={option => option.name}
                onChange={(evt, ve) => handleSourceChange(evt, ve)}
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Select Country"
                    variant="outlined"
                    placeholder="Select Country"
                    fullWidth
                    margin="normal"
                  />
                )}
              /> */}
              <FormControlLabel
                className={classes.label}
                control={<Checkbox value='remember' color='primary' />}
                label={
                  <Typography variant='body2'>
                    I agree to the <Link href='#'>Terms of Service</Link> and{' '}
                    <Link href='#'>Privacy Policy</Link>
                  </Typography>
                }
              />

              <Button
                type='submit'
                fullWidth
                variant='contained'
                color='primary'
                className={classes.submit}
                disabled={loading ? loading : !canBeSubmitted()}
                onClick={() => dispatch(AuthActions.submitRegister(values))}
                endIcon={loading && <CircularProgress size={20} />}
              >
                Sign Up
              </Button>

              <Box mt={2}>
                <Copyright />
              </Box>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

RegistrationForm.propTypes = {
  loading: PropTypes.bool,
  submitRegister: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

export default React.memo(RegistrationForm);
