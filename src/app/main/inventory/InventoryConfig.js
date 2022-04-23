import React from 'react';

export const InventoryConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: '/inventory/items',
      exact: true,
      component: React.lazy(() => import('./items/Items')),
    },
    {
      path: '/inventory/items/:id',
      component: React.lazy(() => import('./items/Items')),
    },
    {
      path: '/inventory/services',
      exact: true,
      component: React.lazy(() => import('./services/Services')),
    },
    {
      path: '/inventory/services/:id',
      component: React.lazy(() => import('./services/Services')),
    },
    {
      path: '/inventory/discounts',
      exact: true,
      component: React.lazy(() => import('./discounts/Discounts')),
    },
    {
      path: '/inventory/discounts/:id',
      component: React.lazy(() => import('./discounts/Discounts')),
    },
  ],
};
