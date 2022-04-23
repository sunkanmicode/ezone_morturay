import React from 'react';

export const SettingsConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: '/settings',
      exact: true,
      component: React.lazy(() => import('./branches/BranchesApp')),
    },
    {
      path: '/settings/branches',
      exact: true,
      component: React.lazy(() => import('./branches/BranchesApp')),
    },
    {
      path: '/settings/branches/:id',
      component: React.lazy(() => import('./branches/BranchesApp')),
    },
  ],
};
