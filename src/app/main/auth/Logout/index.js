/**
 *
 * LoginPage
 *
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from '../reducer';
import saga from '../saga';

import * as Selectors from '../../App/selectors';
import * as AppActions from '../../App/actions';

export function LogoutPage(props) {
  useInjectReducer({ key: 'authorizationPage', reducer });
  useInjectSaga({ key: 'authorizationPage', saga });

  const { logout } = props

  React.useEffect(() => {
    logout()
  }, [])

  const { tokens } = props;

  return (
    <div>
      <Helmet>
        <title>LogOut Page</title>
        <meta name="description" content="Description of LogOut Page" />
      </Helmet>
      <Redirect to="/" />
    </div>
  );
}

LogoutPage.propTypes = {
  tokens: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  logout: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  tokens: Selectors.makeSelectAccessToken(),
});

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(AppActions.logout()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(LogoutPage);
