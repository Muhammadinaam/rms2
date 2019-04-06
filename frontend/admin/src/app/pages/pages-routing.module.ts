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
      path: 'settings',
      component: SettingsComponent,
    },

    {
      path: 'orders',
      component: OpenOrdersAndTablesComponent,
    },

    {
      path: '',
      redirectTo: 'orders',
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
