import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { isFunction } from 'util';
import { BaseEndPointService } from './base-end-point.service';
import { SettingsService } from './settings.service';
import cloneDeep from 'lodash/cloneDeep';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  webDiscountPercent;
  salesTaxPercent;
  minimumOrderAmount;
  deliveryChargesFunction;

  order = {
    order_type_idt: 'web-delivery',
    customer_name: '',
    customer_address: '',
    customer_lat: 0,
    customer_long: 0,
    customer_zipcode: '',
    customer_phone: '',
    order_amount_before_discount: 0,
    discount_percent: 0,
    discount_amount: 0,
    sales_tax_percent: 0,
    sales_tax_amount: 0,
    delivery_charges: 0,
    items: []
  }

  removedItems = [];

  constructor(
    private settingsService: SettingsService,
    private http: HttpClient)
  {
    this.getSettings();
  }

  

  private getSettings()
  {
    this.webDiscountPercent = this.settingsService.getWebDiscountPercent();  
    this.salesTaxPercent = this.settingsService.getSalesTaxPercent();
    this.deliveryChargesFunction = this.settingsService.getDeliveryChargesFunction();
    this.minimumOrderAmount = this.settingsService.getSettingFromArray('minimum-order-amount');
  }

  addItemInOrder(item) {
    
    this.order.items.push(item);
    this.calculateOrderAmounts();
  }

  

  calculateOrderAmounts() {

    this.order.order_amount_before_discount = 0;
    this.order.items.forEach(item => {
      this.order.order_amount_before_discount += +item.price * item.quantity;

      item.options.forEach(option => {
        option.options_items.forEach(option_item => {
          this.order.order_amount_before_discount += +option_item.price * item.quantity;
        });
      });
    });

    this.order.discount_percent = this.webDiscountPercent;
    this.order.discount_amount = this.order.order_amount_before_discount * this.order.discount_percent / 100;
    this.order.sales_tax_percent = this.salesTaxPercent;
    this.order.sales_tax_amount = 
      (this.order.order_amount_before_discount - this.order.discount_amount) * this.order.sales_tax_percent / 100;
    
    let order_amount = this.order.order_amount_before_discount;
    let deliveryChargesFunction = eval(this.deliveryChargesFunction);

    this.order.delivery_charges = 0;
    if(isFunction(deliveryChargesFunction))
    {
      this.order.delivery_charges = deliveryChargesFunction(order_amount);
    }
  
    console.log(this.order);
  }





  private orderModalVisibilityChangedSource = new Subject<boolean>();
  orderModalVisibilityChanged$ = this.orderModalVisibilityChangedSource.asObservable();
  changeOrderModalVisibility(visibility: boolean)
  {
    this.orderModalVisibilityChangedSource.next(visibility);
  }

  saveOrder() {
    let data = {
      'order': this.order,
      'removed_items': this.removedItems
    };
    return this.http.post(BaseEndPointService.getBaseEndPoint() + '/api/orders', data)
  }

  refreshStatus(tracking_number: string): any {
    return this.http.get(BaseEndPointService.getBaseEndPoint() + '/api/get-order-status?tracking_number=' + tracking_number);
  }

  deleteItem(item_index: any) {

    let item = cloneDeep(this.order.items[item_index]);
    if(item['id'] != null && item['id'] != '')
    {
      this.removedItems.push(item);
    }
    
    this.order.items.splice(item_index, 1);
    this.calculateOrderAmounts();
  }

  // cloneItem(item){
  //   let clonedItem = {};

  //   Object.keys(item).forEach(key => {
  //     if(item[key] instanceof Object )
  //     {
  //       clonedItem[key] = this.cloneItem(item[key]);
  //     }
  //     else
  //     {
  //       clonedItem[key] = item[key];
  //     }
  //   });

  //   return clonedItem;

  // }
}
