// import { authRoles } from '../../app/auth';

import { authRoles } from "app/auth";

const navigationConfig = [
  {
    id: 'applications',
    title: 'Applications',
    type: 'group',
    icon: 'apps',
    children: [
      {
        id: 'dashboard-component',
        title: 'Dashboard',
        type: 'item',
        icon: 'dashboard',
        url: '/dashboard',
      },
      {
        id: 'customers-component',
        title: 'Customers',
        type: 'item',
        icon: 'person',
        url: '/customers',
      },
      {
        id: 'inventory-component',
        title: 'Inventory',
        type: 'collapse',
        auth: authRoles.admin, // Admin Only
        icon: 'store',
        children: [
          {
            id: 'inventory-services',
            title: 'Products & Services',
            type: 'item',
            icon: 'receipt',
            url: '/inventory/services',
          },
          {
            id: 'inventory-discounts',
            title: 'Discounts',
            type: 'item',
            icon: 'receipt',
            url: '/inventory/discounts',
          },
        ],
      },
      {
        id: 'deceased-mgt-component',
        title: 'Deceased Management',
        type: 'collapse',
        icon: 'people_outline',
        children: [
          {
            id: 'deceased-component',
            title: 'Deceased',
            type: 'item',
            icon: 'timelapse',
            url: '/deceased',
          },
          {
            id: 'vaults-component',
            title: 'Vaults',
            type: 'item',
            icon: 'receipt',
            url: '/vaults',
          },
        ],
      },
      {
        id: 'payment-component',
        title: 'Payment Management',
        type: 'collapse',
        icon: 'payment',
        children: [
          {
            id: 'proforma-component',
            title: 'Proforma Invoices',
            type: 'item',
            icon: 'receipt',
            url: '/proforma',
          },
          {
            id: 'invoice-component',
            title: 'Invoices',
            type: 'item',
            icon: 'receipt',
            url: '/invoices',
          },
          {
            id: 'receipts-component',
            title: 'Receipts',
            type: 'item',
            icon: 'receipt',
            url: '/receipts',
          },
        ],
      },
      {
        id: 'funeral-component',
        title: 'Funeral Management',
        type: 'collapse',
        icon: 'layers',
        children: [
          {
            id: 'vouchers-component',
            title: 'Vouchers',
            type: 'item',
            icon: 'receipt',
            url: '/vouchers',
          },
        ],
      },
      {
        id: 'reports-component',
        title: 'Reports',
        type: 'collapse',
        icon: 'assessment',
        children: [
          {
            id: 'admission-component',
            title: 'Admissions',
            type: 'item',
            icon: 'receipt',
            url: '/reports/admissions',
          },
          {
            id: 'cremation-component',
            title: 'Cremation',
            type: 'item',
            icon: 'receipt',
            url: '/reports/cremations',
          },
          {
            id: 'release-component',
            title: 'Releases',
            type: 'item',
            icon: 'receipt',
            url: '/reports/releases',
          },
          {
            id: 'vaults-component',
            title: 'Vaults',
            type: 'item',
            icon: 'receipt',
            url: '/reports/vaults',
          },
          {
            id: 'vouchers-component',
            title: 'Vouchers',
            type: 'item',
            icon: 'receipt',
            url: '/reports/vouchers',
          },
        ],
      },
      {
        id: 'settings-component',
        title: 'Settings',
        type: 'collapse',
        icon: 'settings',
        children: [
          {
            id: 'branches-component',
            title: 'Branches',
            type: 'item',
            icon: 'business',
            url: '/settings/branches',
          },
        ],
      },
    ],
  },
];

export default navigationConfig;
