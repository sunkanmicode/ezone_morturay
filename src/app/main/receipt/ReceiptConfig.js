import React from 'react';

export const ReceiptConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: '/receipts',
      exact: true,
      component: React.lazy(() => import('./ReceiptApp')),
    },
    {
      path: '/receipts/:id',
      component: React.lazy(() => import('./ReceiptApp')),
    },
  ],
};
