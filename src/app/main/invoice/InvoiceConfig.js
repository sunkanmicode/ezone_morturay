import React from 'react';

export const InvoiceConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: '/invoices',
      exact: true,
      component: React.lazy(() => import('./InvoiceApp')),
    },
    {
      path: '/invoices/:id',
      component: React.lazy(() => import('./InvoiceApp')),
    },
  ],
};
