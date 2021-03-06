import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuardService } from '../auth/guards/auth-guard.service';
import { UsersListComponent } from './users/users-list/users-list.component';
import { UserAddEditComponent } from './users/user-add-edit/user-add-edit.component';
import { CategoriesListComponent } from './categories/categories-list/categories-list.component';
import { CategoriesAddEditComponent } from './categories/categories-add-edit/categories-add-edit.component';
import { ItemsListComponent } from './items/items-list/items-list.component';
import { ItemsAddEditComponent } from './items/items-add-edit/items-add-edit.component';
import { SettingsComponent } from './settings/settings.component';
import { OpenOrdersAndTablesComponent } from './orders/open-orders-and-tables/open-orders-and-tables.component';
import { TablesListComponent } from './tables/tables-list/tables-list.component';
import { TablesAddEditComponent } from './tables/tables-add-edit/tables-add-edit.component';
import { OrderAddEditComponent } from './orders/order-add-edit/order-add-edit.component';
import { SalesReportComponent } from './reports/sales-report/sales-report.component'
import { ReceipttypesListComponent } from './receipttypes/receipttypes-list/receipttypes-list.component';
import { ReceipttypesAddEditComponent } from './receipttypes/receipttypes-add-edit/receipttypes-add-edit.component';
import { TopSellingItemsComponent } from './reports/top-selling-items/top-selling-items.component';
import { TopAreacodesComponent } from './reports/top-areacodes/top-areacodes.component';
import { SalesAndTaxReportComponent } from './reports/sales-and-tax-report/sales-and-tax-report.component';
import { PushNotificationsComponent } from './push-notifications/push-notifications.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  canActivateChild: [AuthGuardService],
  children: [
    // {
    //   path: 'dashboard',
    //   component: DashboardComponent,
    // },
    
    {
      path: 'push-notifications',
      component: PushNotificationsComponent,
    },
    {
      path: 'users',
      component: UsersListComponent,
    },
    {
      path: 'users/:id/edit',
      component: UserAddEditComponent,
    },
    {
      path: 'users/create',
      component: UserAddEditComponent,
    },

    {
      path: 'receipttypes',
      component: ReceipttypesListComponent,
    },
    {
      path: 'receipttypes/:id/edit',
      component: ReceipttypesAddEditComponent,
    },
    {
      path: 'receipttypes/create',
      component: ReceipttypesAddEditComponent,
    },

    {
      path: 'categories',
      component: CategoriesListComponent,
    },
    {
      path: 'categories/:id/edit',
      component: CategoriesAddEditComponent,
    },
    {
      path: 'categories/create',
      component: CategoriesAddEditComponent,
    },

    {
      path: 'items',
      component: ItemsListComponent,
    },
    {
      path: 'items/:id/edit',
      component: ItemsAddEditComponent,
    },
    {
      path: 'items/create',
      component: ItemsAddEditComponent,
    },

    {
      path: 'tables',
      component: TablesListComponent,
    },
    {
      path: 'tables/:id/edit',
      component: TablesAddEditComponent,
    },
    {
      path: 'tables/create',
      component: TablesAddEditComponent,
    },

    {
      path: 'settings',
      component: SettingsComponent,
    },

    {
      path: 'orders-and-tables',
      component: OpenOrdersAndTablesComponent,
    },

    {
      path: 'orders/create',
      component: OrderAddEditComponent,
    },

    {
      path: 'orders/:id/edit',
      component: OrderAddEditComponent,
    },

    {
      path: 'sales-and-tax-report',
      component: SalesAndTaxReportComponent,
    },

    {
      path: 'sales-report',
      component: SalesReportComponent,
    },

    {
      path: 'top-selling-items-report',
      component: TopSellingItemsComponent,
    },

    {
      path: 'top-areacodes-report',
      component: TopAreacodesComponent,
    },

    {
      path: '',
      redirectTo: 'orders-and-tables',
      pathMatch: 'full',
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
