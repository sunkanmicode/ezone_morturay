import React from 'react';

export const RelativesConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: '/relatives',
      exact: true,
      component: React.lazy(() => import('./RelativesApp')),
    },
    {
      path: '/relatives/:id',
      exact: true,
      component: React.lazy(() => import('./RelativesApp')),
    },
  ],
};
