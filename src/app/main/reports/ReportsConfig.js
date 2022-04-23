import React from 'react';

export const ReportsConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: '/reports',
      exact: true,
      component: React.lazy(() => import('./reports/ReportsApp')),
    },
    {
      path: '/reports/admissions',
      exact: true,
      component: React.lazy(() => import('./admissions/ReportsApp')),
    },
    {
      path: '/reports/admissions/:id',
      component: React.lazy(() => import('./admissions/ReportsApp')),
    },
    {
      path: '/reports/cremations',
      exact: true,
      component: React.lazy(() => import('./cremations/ReportsApp')),
    },
    {
      path: '/reports/cremations/:id',
      component: React.lazy(() => import('./cremations/ReportsApp')),
    },
    {
      path: '/reports/releases',
      exact: true,
      component: React.lazy(() => import('./releases/ReportsApp')),
    },
    {
      path: '/reports/releases/:id',
      component: React.lazy(() => import('./releases/ReportsApp')),
    },
    {
      path: '/reports/vaults',
      exact: true,
      component: React.lazy(() => import('./vaults/ReportsApp')),
    },
    {
      path: '/reports/vaults/:id',
      component: React.lazy(() => import('./vaults/ReportsApp')),
    },
    {
      path: '/reports/vouchers',
      exact: true,
      component: React.lazy(() => import('./vouchers/ReportsApp')),
    },
    {
      path: '/reports/vouchers/:id',
      component: React.lazy(() => import('./vouchers/ReportsApp')),
    },
  ],
};
