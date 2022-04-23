import React from 'react';

export const CustomersConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: '/customers',
      exact: true,
      component: React.lazy(() => import('./CustomersApp')),
    },
    {
      path: '/customers/:id',
      exact: true,
      component: React.lazy(() => import('./CustomersApp')),
    },
    // {
    //   path: '/customers/:id/payment-advice',
    //   exact: true,
    //   component: React.lazy(() => import('./invoiceAdvice/Invoice')),
    // },
  ],
};
