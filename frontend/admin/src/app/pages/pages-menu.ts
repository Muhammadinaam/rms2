import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Orders and Tables',
    icon: 'nb-layout-default',
    link: '/pages/orders-and-tables',
    home: true,
  },
  // {
  //   title: 'FEATURES',
  //   group: true,
  // },
  {
    title: 'Configurations',
    icon: 'nb-grid-a-outline',
    children: [
      {
        title: 'Users',
        icon: 'nb-person',
        link: '/pages/users',
        data: {
          permission_idt: 'users-list',
        }
      },
      {
        title: 'Receipt Types',
        icon: 'nb-grid-a-outline',
        link: '/pages/receipttypes',
        data: {
          permission_idt: 'receipttypes-list',
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
        title: 'Tables',
        icon: 'nb-grid-a-outline',
        link: '/pages/tables',
        data: {
          permission_idt: 'tables-list',
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
    ]
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
      {
        title: 'Top Selling Items',
        link: '/pages/top-selling-items-report',
        icon: 'nb-tables',
        data: {
          permission_idt: 'top-selling-items-report',
        }
      },
      {
        title: 'Top Areacodes',
        link: '/pages/top-areacodes-report',
        icon: 'nb-tables',
        data: {
          permission_idt: 'top-areacodes-report',
        }
      },


    ],
  },
  {
    title: 'Settings',
    icon: 'nb-gear',
    link: '/pages/settings',
    data: {
      permission_idt: 'settings',
    }
  }
];
