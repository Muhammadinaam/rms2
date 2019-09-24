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
import { NbDialogModule } from '@nebular/theme';
import { OrderAddEditComponent } from './orders/order-add-edit/order-add-edit.component';
import { CommonServicesComponentsModule } from '../common-services-components/common-services-components.module';
import { SalesReportComponent } from './reports/sales-report/sales-report.component';
import { FromToFilterComponent } from './widgets/from-to-filter/from-to-filter.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { ReceipttypesListComponent } from './receipttypes/receipttypes-list/receipttypes-list.component';
import { ReceipttypesAddEditComponent } from './receipttypes/receipttypes-add-edit/receipttypes-add-edit.component';
import { HasPermissionPipe } from './pipes/has-permission.pipe';
import { OrderPendingTimePipe } from './pipes/order-pending-time.pipe';
import { IsOrderPendingOrPreparingPipe } from './pipes/is-order-pending-or-preparing.pipe';
import {NgPipesModule} from 'ngx-pipes';
import { OsKeyboardDirective } from './directives/os-keyboard.directive';
import { TopSellingItemsComponent } from './reports/top-selling-items/top-selling-items.component';
import { TopAreacodesComponent } from './reports/top-areacodes/top-areacodes.component';
import { SalesAndTaxReportComponent } from './reports/sales-and-tax-report/sales-and-tax-report.component';
import { PushNotificationsComponent } from './push-notifications/push-notifications.component';

const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    MiscellaneousModule,
    FormsModule,
    NbDialogModule.forChild(null),
    CommonServicesComponentsModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
    NgPipesModule
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
    OrderAddEditComponent,
    SalesReportComponent,
    FromToFilterComponent,
    ReceipttypesListComponent,
    ReceipttypesAddEditComponent,
    HasPermissionPipe,
    OrderPendingTimePipe,
    IsOrderPendingOrPreparingPipe,
    OsKeyboardDirective,
    TopSellingItemsComponent,
    TopAreacodesComponent,
    SalesAndTaxReportComponent,
    PushNotificationsComponent,
  ],
})
export class PagesModule {
}
