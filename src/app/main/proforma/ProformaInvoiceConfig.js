import React from 'react';

export const ProformaInvoiceConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: '/proforma',
      exact: true,
      component: React.lazy(() => import('./ProformaInvoiceApp')),
    },
    {
      path: '/proforma/:id',
      component: React.lazy(() => import('./ProformaInvoiceApp')),
    },
  ],
};
