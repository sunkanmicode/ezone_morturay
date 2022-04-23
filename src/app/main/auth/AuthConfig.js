import authRoles from '../../auth/authRoles';
import Login from './Login';
import Register from './Register';
import ForgotPassword from './ForgotPassword';

export const AuthConfig = {
  settings: {
    layout: {
      config: {
        navbar: {
          display: false,
        },
        toolbar: {
          display: false,
        },
        footer: {
          display: false,
        },
        leftSidePanel: {
          display: false,
        },
        rightSidePanel: {
          display: false,
        },
      },
    },
  },
  // auth: authRoles.onlyGuest,
  routes: [
    {
      path: '/login',
      exact: true,
      component: Login,
    },
    {
      path: '/register',
      exact: true,
      component: Register,
    },
    {
      path: '/forgot-password',
      exact: true,
      component: ForgotPassword,
    },
  ],
};
