import React from 'react';

export const DeceasedConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: '/deceased',
      exact: true,
      component: React.lazy(() => import('./DeceasedApp')),
    },
    {
      path: '/deceased/:id',
      exact: true,
      component: React.lazy(() => import('./DeceasedApp')),
    },
    {
      path: '/deceased/:id/admission-form',
      exact: true,
      component: React.lazy(() =>
        import('./details/forms/admission/Admission')
      ),
    },
    {
      path: '/deceased/:id/release-form',
      exact: true,
      component: React.lazy(() => import('./details/forms/release/Release')),
    },
    {
      path: '/deceased/:id/embalmment-certificate',
      exact: true,
      component: React.lazy(() =>
        import('./details/forms/embalmment/Embalmment')
      ),
    },
    {
      path: '/deceased/:id/cremation-certificate',
      exact: true,
      component: React.lazy(() =>
        import('./details/forms/cremation/Cremation')
      ),
    },
    {
      path: '/deceased/:id/relatives',
      exact: true,
      component: React.lazy(() => import('./relatives/Relatives')),
    },
    {
      path: '/deceased/:id/relatives/:relativeId',
      component: React.lazy(() => import('./relative/Relative')),
    },
  ],
};
