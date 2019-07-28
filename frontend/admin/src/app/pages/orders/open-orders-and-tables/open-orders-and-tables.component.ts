import { Component, OnInit, OnDestroy, TemplateRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoaderService } from '../../../@theme/services/loader.service';
import { NbDialogService } from '@nebular/theme';
import { BaseEndPointService } from '../../../common-services-components/services/base-end-point.service';
import { OrderService } from '../../../common-services-components/services/order.service';
import { AuthService } from '../../../auth/services/auth.service';
import { SettingsService } from '../../../common-services-components/services/settings.service';

@Component({
  selector: 'open-orders-and-tables',
  templateUrl: './open-orders-and-tables.component.html',
  styleUrls: ['./open-orders-and-tables.component.scss']
})
export class OpenOrdersAndTablesComponent implements OnInit, OnDestroy {

  currencyCode = this.settingsService.getCurrencyCode();
  openOrders: any = [];
  freeTables:any = [];
  refreshTimer;
  isTimerStopped = false;
  assignableStatuses:any = [];
  changeStatusDialogRef;
  isCloseOrderModalVisible = false;
  selectedOrder = null;
  isDiscountModalVisible: boolean;
  discount_percent = 0;
  discount_amount = 0;
  discount_remarks = '';
  receiptTypes:any;

  paid_amount:number = 0;
  
  constructor(private http: HttpClient, 
    private loaderService: LoaderService,
    private dialogService: NbDialogService,
    private orderService: OrderService,
    public authService: AuthService,
    public settingsService: SettingsService) { }

  openChangeStatusDialog(dialog, order){
    this.isTimerStopped = true;
    this.changeStatusDialogRef = this.dialogService.open(dialog, { context: order });
    this.changeStatusDialogRef.onClose.subscribe( () => {
        this.isTimerStopped = false ;
        this.refresh();
      });
  }

  ngOnInit() {

    this.loaderService.isLoaderEnabled = false;

    this.http.get(BaseEndPointService.getBaseEndPoint() + '/api/assignable-statuses')
      .subscribe(data => {
        this.assignableStatuses = data;
      });

    this.refresh();
    this.refreshTimer = setInterval(() => {
      this.refresh();
    }, 20000);

    this.http.get(BaseEndPointService.getBaseEndPoint() + '/api/receipttypes?all=1')
      .subscribe(receiptTypes => {
        this.receiptTypes = receiptTypes;
      });

  }
  
  ngOnDestroy(): void {
    this.loaderService.isLoaderEnabled = true;
    if(this.refreshTimer) {
      clearInterval(this.refreshTimer);
    }
  }

  refresh() {

    if(this.isTimerStopped || this.isCloseOrderModalVisible)
      return;

      this.http.get(BaseEndPointService.getBaseEndPoint() + '/api/free-tables')
      .subscribe(data => {
        this.freeTables = data;
      });

      this.http.get(BaseEndPointService.getBaseEndPoint() + '/api/open-orders')
      .subscribe(data => {
        this.openOrders = data;
      });

  }

  isOrderPendingOrPreparing(order)
  {
    return order.order_status_idt == 'phone-confirmation-pending' || 
    order.order_status_idt == 'preparing' || order.order_status_idt == 'phone-not-confirmed';
  }

  cancelOrder(order){

    let cancellationRemarks = prompt("Please enter Cancellation Reason");

    if( cancellationRemarks != null ) {
      this.changeOrderStatus(order, 'cancelled', cancellationRemarks);
    }
  }

  changeOrderStatus(order, status, cancellationRemarks = null)
  {
    this.orderService.changeOrderStatus(order, status, cancellationRemarks)
      .subscribe(resp => {

        if(resp['success'] != true) {
          alert(resp['message']);
        }
        
        if(this.changeStatusDialogRef != null)
          this.changeStatusDialogRef.close();
        
        this.refresh();
      });
  }

  setTimerStoppedState(state: boolean){
    console.log(state);
    this.isTimerStopped = state;
  }

  closeOrder() {

    if(this.isPaymentValid()) {

      this.orderService.closeOrder(this.selectedOrder, this.receiptTypes)
      .subscribe(resp => {
        alert(resp['message']);
        if(resp['success'] == true){
          this.isCloseOrderModalVisible = false;
          this.refresh();
        }
      }, err => {
        alert('Error occurred: ' + err.error.message);
      });

    }
  }

  isPaymentValid(): boolean {

    this.paid_amount = 0;
    let amount_cannot_be_more_than_bill_total = 0;
    let amount_cannot_be_more_than_bill_names = '';
    let isPaymentValid:any = true;
    this.receiptTypes.forEach(receiptType => {
      
      receiptType.amount = receiptType.amount == '' || receiptType.amount == null ? 0 : receiptType.amount;
      this.paid_amount += +receiptType.amount;

      if( receiptType.amount < 0 ) {
        alert(receiptType.name + ' is less than zero');
        isPaymentValid = false;
      }

      if(receiptType.amount_can_be_more_than_bill == 0 ) {
        amount_cannot_be_more_than_bill_total += Math.round(receiptType.amount);
        amount_cannot_be_more_than_bill_names += receiptType.name + ', ';
      }

      if(receiptType.customer_name_required && receiptType.amount != 0 && (receiptType.customer == null || receiptType.customer == '') ) {
        alert('Please provide customer name');
        isPaymentValid = false;
      }

    });

    if(isPaymentValid == false) {
      return false;
    }

    let diff = Math.abs( Math.round(amount_cannot_be_more_than_bill_total) - Math.round(this.selectedOrder.receivable_amount) );
    if( diff > 1 ){
      alert('Sum of [' + amount_cannot_be_more_than_bill_names + '] should not be more than bill amount');
      return false;
    }

    if(this.paid_amount < this.selectedOrder.receivable_amount) {
      alert('Received amount is less than bill amount')
      return false;
    }

    return true;

  }

  sendPrintCommand(order_id, order_edit_id, print_type){
    this.orderService.sendPrintCommand(order_id, order_edit_id, print_type)
      .subscribe(resp => {
        alert(resp['message']);
      });
  }

  showCloseOrderModal(order) {
    this.selectedOrder = order;
    this.isCloseOrderModalVisible = true;

    this.receiptTypes.forEach(receiptType => {
      receiptType.amount = 0;
      receiptType.customer_name = '';
    });
  }

  showDiscountModal(order) {
    this.selectedOrder = order;
    this.isDiscountModalVisible = true;
  }

  saveDiscount()
  {
    if(this.discount_amount > 0 && this.discount_remarks == '') {
      alert('Please enterr discount remarks');
      return;
    }

    if(this.discount_amount < 0) {
      alert('Discount should be zero or more');
      return;
    }

    this.orderService.saveDiscount( 
      this.selectedOrder.id, 
      this.discount_percent, 
      this.discount_amount, 
      this.discount_remarks )
      .subscribe(data => {
        alert(data['message']);
        this.isDiscountModalVisible = false;
      },
      err => alert('Error occurred'));
  }

  setDiscountAmount() {
    this.discount_amount = Math.round( this.selectedOrder.order_amount_before_discount * this.discount_percent / 100);
  }

  setDiscountPercent() {
    this.discount_percent = Math.round(this.discount_amount / this.selectedOrder.order_amount_before_discount * 100);
  }

  paymentChanged() {
    this.paid_amount = 0;
    this.receiptTypes.forEach(receiptType => {
      this.paid_amount += +receiptType.amount;
    });
  }

}
