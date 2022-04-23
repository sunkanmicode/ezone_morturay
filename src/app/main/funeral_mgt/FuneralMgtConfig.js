import React from 'react';

export const FuneralMgtConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: '/vouchers',
      exact: true,
      component: React.lazy(() => import('./vouchers/VouchersApp')),
    },
    {
      path: '/vouchers/:id/:subId?',
      component: React.lazy(() => import('./vouchers/VouchersApp')),
    },
    {
      path: '/plots',
      exact: true,
      component: React.lazy(() => import('./plots/Plots')),
    },
    {
      path: '/plots/:id',
      component: React.lazy(() => import('./plots/Plots')),
    },
    {
      path: '/vaults',
      exact: true,
      component: React.lazy(() => import('./vaults/Vaults')),
    },
    {
      path: '/vaults/:id',
      component: React.lazy(() => import('./vaults/Vaults')),
    },
  ],
};
