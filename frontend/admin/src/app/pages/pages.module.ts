import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { UsersListComponent } from './users/users-list/users-list.component';
import { UserAddEditComponent } from './users/user-add-edit/user-add-edit.component';
import { FormsModule } from '@angular/forms';
import { ValidationComponent } from './validation/validation.component';
import { DatatableComponent } from './widgets/datatable/datatable.component';
import { CategoriesListComponent } from './categories/categories-list/categories-list.component';
import { CategoriesAddEditComponent } from './categories/categories-add-edit/categories-add-edit.component';
import { OptionsComponent } from './widgets/options/options.component';
import { ItemsAddEditComponent } from './items/items-add-edit/items-add-edit.component';
import { ItemsListComponent } from './items/items-list/items-list.component';
import { SettingsComponent } from './settings/settings.component';
import { OpenOrdersAndTablesComponent } from './orders/open-orders-and-tables/open-orders-and-tables.component';
import { TablesListComponent } from './tables/tables-list/tables-list.component';
import { TablesAddEditComponent } from './tables/tables-add-edit/tables-add-edit.component';

const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    MiscellaneousModule,
    FormsModule
  ],
  declarations: [
    ...PAGES_COMPONENTS,
    UsersListComponent,
    UserAddEditComponent,
    ValidationComponent,
    DatatableComponent,
    CategoriesListComponent,
    CategoriesAddEditComponent,
    OptionsComponent,
    ItemsAddEditComponent,
    ItemsListComponent,
    SettingsComponent,
    OpenOrdersAndTablesComponent,
    TablesListComponent,
    TablesAddEditComponent,
  ],
})
export class PagesModule {
}
