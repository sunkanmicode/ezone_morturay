import React from 'react';
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import PropTypes from 'prop-types';
import LoginForm from './components/LoginForm';
import * as AuthActions from '../../../auth/store/actions';

export function LoginPage(props) {
  return (
    <div>
      <LoginForm />
    </div>
  );
}

LoginPage.propTypes = {
  token: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    logoutUser: AuthActions.logoutUser
  }, dispatch)
}

export default React.memo(connect(null, mapDispatchToProps)(LoginPage));
