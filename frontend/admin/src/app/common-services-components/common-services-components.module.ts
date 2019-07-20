import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddToOrderComponent } from './components/add-to-order/add-to-order.component';
import { FormsModule } from '@angular/forms';
//import { ToastrModule } from '../../../../admin/node_modules/ngx-toastr';
import { OrderItemsAmountsComponent } from './components/order-items-amounts/order-items-amounts.component';
import { CategoriesItemsSearchComponent } from './components/categories-items-search/categories-items-search.component';
import { GetSettingFromArrayPipe } from './get-setting-from-array.pipe';
import { CheckoutComponent } from './checkout/checkout.component';


@NgModule({
  declarations: [
    AddToOrderComponent,
    OrderItemsAmountsComponent,
    CategoriesItemsSearchComponent,
    GetSettingFromArrayPipe,
    CheckoutComponent    
  ],
  imports: [
    CommonModule,
    FormsModule,
    //ToastrModule.forRoot(),
  ],
  exports: [
    AddToOrderComponent,
    OrderItemsAmountsComponent,
    CategoriesItemsSearchComponent,
    GetSettingFromArrayPipe,
    CheckoutComponent
  ]
})
export class CommonServicesComponentsModule { }
