import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { isFunction, isNumber } from 'util';
import { BaseEndPointService } from './base-end-point.service';
import { SettingsService } from './settings.service';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  
  public showPopupBeforeAddingItem:boolean = false;

  public isOrderAmountCalculatedCorrectly: boolean;

  closeOrder(closingOrder: any, receipts: any) {
    let data = {
      order_id: closingOrder.id,
      'receipts': receipts
    };

    return this.http.post(BaseEndPointService.getBaseEndPoint() + '/api/close-order', data);
  }

  changeOrderStatus(order: any, status: any, cancellationRemarks:any = null) {
    let data = {order_id: order.id, status_idt: status, cancellation_remarks: cancellationRemarks};
    return this.http.post(BaseEndPointService.getBaseEndPoint() + '/api/change-order-status', data);
  }
  
  websiteDiscountPercent;
  appDiscountPercent;
  generalDiscountPercent
  salesTaxPercent;
  minimumOrderAmount;
  deliveryChargesFunction;

  order:any = {
    order_type_idt: '',
    customer_name: '',
    customer_address: '',
    customer_lat: 0,
    customer_long: 0,
    customer_zipcode: '',
    customer_phone: '',
    order_amount_before_discount: 0,
    discount_percent: 0,
    discount_remarks: '',
    discount_amount: 0,
    sales_tax_percent: 0,
    sales_tax_amount: 0,
    delivery_charges: 0,
    receivable_amount: 0,
    items: [],
  };


  removedItems = [];
  newItems = [];
  qtyChangedItems = [];

  constructor(
    private settingsService: SettingsService,
    private http: HttpClient)
  {
    this.getSettings();
    this.resetOrder();
  }

  reset(){
    this.resetOrder();
    this.removedItems.length = 0;
    this.newItems.length = 0;
    this.qtyChangedItems.length = 0;
    this.getSettings();
  }

  resetOrder(){
    this.order.order_type_idt = '';
    this.order.customer_name = '';
    this.order.customer_address = '';
    this.order.customer_lat = 0;
    this.order.customer_long = 0;
    this.order.customer_zipcode = '';
    this.order.customer_phone = '';
    this.order.order_amount_before_discount = 0;
    this.order.discount_percent = 0;
    this.order.discount_remarks = '';
    this.order.discount_amount = 0;
    this.order.sales_tax_percent = 0;
    this.order.sales_tax_amount = 0;
    this.order.delivery_charges = 0;
    this.order.items.length = 0;

    let initialKeys = [
      'order_type_idt',
      'customer_name',
      'customer_address',
      'customer_lat',
      'customer_long',
      'customer_zipcode',
      'customer_phone',
      'order_amount_before_discount',
      'discount_percent',
      'discount_remarks',
      'discount_amount',
      'sales_tax_percent',
      'sales_tax_amount',
      'delivery_charges',
      'items',
    ]

    Object.keys(this.order).forEach(key => {
      let initialKeyFound = initialKeys.find(x => x == key);
      if(initialKeyFound == null){
        this.order[key] = null;
      }
    })
  }

  private getSettings()
  {
    this.websiteDiscountPercent = this.settingsService.getWebsiteDiscountPercent();
    this.appDiscountPercent = this.settingsService.getAppDiscountPercent();
    this.generalDiscountPercent = this.settingsService.getGeneralDiscountPercent();
    this.salesTaxPercent = this.settingsService.getSalesTaxPercent();
    this.deliveryChargesFunction = this.settingsService.getDeliveryChargesFunction();
    this.minimumOrderAmount = this.settingsService.getSettingFromArray('minimum-order-amount');
  }

  updateItemInOrder(item, index) {

    this.deleteItem(index);

    let newItem = _.cloneDeep(item);
    this.newItems.push(newItem);

    this.order.items.push(item);
    this.order.items = this.order.items.slice();
    this.calculateOrderAmounts();

  }

  addItemInOrder(item) {

    if(this.order.items == null || (this.order.items != null && this.order.items.length == 0) ) {
      this.isOrderAmountCalculatedCorrectly = false;
    }


    let newItem = _.cloneDeep(item);
    this.newItems.push(newItem);

    this.order.items.push(item);
    this.order.items = this.order.items.slice();
    this.calculateOrderAmounts();
  }

  

  calculateOrderAmounts() {
    if(this.order && this.order.items) {

      
      if(this.isOrderAmountCalculatedCorrectly == false) {
        this.settingsService.Init()
        .then(() => {

          if(this.settingsService.initialized == true) {
            this.getSettings();
            this.performOrderCalculations();
            this.isOrderAmountCalculatedCorrectly = true;
          }
          else
          {
            this.isOrderAmountCalculatedCorrectly = false;
          }

        });
      } else {

        this.performOrderCalculations();
        this.isOrderAmountCalculatedCorrectly = true;
        
      }

    }

    

    
  }

  performOrderCalculations() {
    
    if(this.order.id == null || this.order.id == '')  // if new order then set discount according to rate in settings
    {
      if(this.order.order_type_idt == 'wd')
      {
        this.order.discount_percent = this.websiteDiscountPercent;
        this.order.discount_remarks = 'Default discount on website orders';
      }
      else if(this.order.order_type_idt == 'ad')
      {
        this.order.discount_percent = this.appDiscountPercent;
        this.order.discount_remarks = 'Default discount on mobile app orders';
      }
      else
      {
        if(!isNaN(this.generalDiscountPercent)) {
          this.order.discount_percent = this.generalDiscountPercent;
          this.order.discount_remarks = 'Default discount on non-online orders';
        }
      }
    }

    this.order.sales_tax_percent = this.salesTaxPercent;
    this.order.sales_tax_amount = 0;

    this.order.order_amount_before_discount = 0;
    this.order.items.forEach(item => {
      this.order.order_amount_before_discount += +item.price * item.quantity;
      
      if(item.is_taxable)
      {
        this.order.sales_tax_amount += (+item.price * +item.quantity) * (1 - +this.order.discount_percent/100) * +this.order.sales_tax_percent/100;
      }

      item.options.forEach(option => {
        option.options_items.forEach(option_item => {
          this.order.order_amount_before_discount += +option_item.price * item.quantity;

          if(item.is_taxable)
          {
            this.order.sales_tax_amount += (+option_item.price * +item.quantity) * (1 - +this.order.discount_percent/100) * +this.order.sales_tax_percent/100;
          }

        });
      });
    });

    this.order.discount_amount = this.order.order_amount_before_discount * this.order.discount_percent / 100;
    
    
    
    let order_amount = this.order.order_amount_before_discount;
    let deliveryChargesFunction = eval(this.deliveryChargesFunction);

    this.order.delivery_charges = 0;
    if(isFunction(deliveryChargesFunction) && this.isDeliveryChargesApplicable())
    {
      this.order.delivery_charges = deliveryChargesFunction(order_amount);
    }
  
    this.order.receivable_amount = this.order.order_amount_before_discount - 
    +this.order.discount_amount + 
    +this.order.sales_tax_amount + 
    +this.order.delivery_charges;
  }

  isDeliveryChargesApplicable() {
    if(this.order.order_type_idt == 'wd' || this.order.order_type_idt == 'ad' || this.order.order_type_idt == 'otd') {
      return true;
    }
    return false;
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
      'removed_items': this.removedItems,
      'new_items': this.newItems,
      'qty_changed_items': this.qtyChangedItems
    };
    
    if(this.isOrderValid() == false)
    {
      return;
    }

    if(this.order.id != null && this.order.id != 'undefined')
    {
      return this.http.put(BaseEndPointService.getBaseEndPoint() + '/api/orders/' + this.order.id, data)
    }

    return this.http.post(BaseEndPointService.getBaseEndPoint() + '/api/orders', data)
  }

  isOrderValid(){
    if(this.order.items.length == 0){
      alert('Please add items in order');
      return false;
    }

    if(this.order.order_type_idt == 'di' && 
      (this.order.tables == null || this.order.tables.length == 0)
    ){
      alert('Please add tables for Dine In Order');
      return false;
    }

    if(!this.isOrderAmountCalculatedCorrectly) {
      alert('There was some error in order amount calculation. Please try again.');
      this.calculateOrderAmounts();
      return false;
    }

    return true;
  }

  edit(editingId: any) {
    return this.http.get(BaseEndPointService.getBaseEndPoint() + '/api/orders/'+editingId+'/edit');
  }

  refreshStatus(tracking_number: string): any {
    return this.http.get(BaseEndPointService.getBaseEndPoint() + '/api/get-order-status?tracking_number=' + tracking_number);
  }

  deleteItem(item_index: any) {

    let item = _.cloneDeep(this.order.items[item_index]);
    if(item['id'] != null && item['id'] != '')
    {
      this.removedItems.push(item);
    }
    
    this.order.items.splice(item_index, 1);
    this.calculateOrderAmounts();
  }

  sendPrintCommand(order_id: any, order_edit_id: any, print_type: any) {
    let data = {
      'order_id': order_id,
      'order_edit_id': order_edit_id,
      'print_type': print_type
    };
    return this.http.post(BaseEndPointService.getBaseEndPoint() + '/api/send-print-command', data);
  }

  saveDiscount(id: any, discount_percent: number, discount_amount: number, discount_remarks: string) {
    return this.http.post(BaseEndPointService.getBaseEndPoint() + '/api/save-discount', {
      order_id: id,
      discount_percent: discount_percent,
      discount_amount: discount_amount,
      discount_remarks: discount_remarks,
    });
  }

  deleteOrder(orderId) {
    return this.http.post(BaseEndPointService.getBaseEndPoint() + '/api/orders/' + orderId + '/delete', null);
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
