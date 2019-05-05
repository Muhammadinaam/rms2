import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Orders',
    icon: 'nb-layout-default',
    link: '/pages/orders',
    home: true,
  },
  // {
  //   title: 'FEATURES',
  //   group: true,
  // },
  {
    title: 'Users',
    icon: 'nb-person',
    link: '/pages/users',
    data: {
      permission_idt: 'users-list',
    }
  },
  {
    title: 'Categories',
    icon: 'nb-grid-a-outline',
    link: '/pages/categories',
    data: {
      permission_idt: 'categories-list',
    }
  },
  {
    title: 'Items',
    icon: 'nb-compose',
    link: '/pages/items',
    data: {
      permission_idt: 'items-list',
    }
  },
  {
    title: 'Reports',
    icon: 'nb-tables',
    children: [
      {
        title: 'Sales Report',
        link: '/pages/sales-report',
        icon: 'nb-tables',
        data: {
          permission_idt: 'sales-report',
        }
      },
    ],
  },
  {
    title: 'Settings',
    icon: 'nb-gear',
    link: '/pages/settings',
  }
];
