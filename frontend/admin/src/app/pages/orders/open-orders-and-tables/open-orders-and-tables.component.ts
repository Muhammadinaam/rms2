import { Component, OnInit, OnDestroy, TemplateRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoaderService } from '../../../@theme/services/loader.service';
import { NbDialogService } from '@nebular/theme';
import { BaseEndPointService } from '../../../common-services-components/services/base-end-point.service';
import { OrderService } from '../../../common-services-components/services/order.service';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'open-orders-and-tables',
  templateUrl: './open-orders-and-tables.component.html',
  styleUrls: ['./open-orders-and-tables.component.scss']
})
export class OpenOrdersAndTablesComponent implements OnInit, OnDestroy {

  openOrders: any = [];
  freeTables:any = [];
  refreshTimer;
  isTimerStopped = false;
  assignableStatuses:any = [];
  changeStatusDialogRef;
  isCloseOrderModalVisible = false;
  selectedOrder = null;
  cash_received = 0;
  card_received = 0;
  isDiscountModalVisible: boolean;
  discount_percent = 0;
  discount_amount = 0;
  discount_remarks = '';
  
  constructor(private http: HttpClient, 
    private loaderService: LoaderService,
    private dialogService: NbDialogService,
    private orderService: OrderService,
    public authService: AuthService) { }

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
    return order.order_status_idt == 'phone-confirmation-pending' || order.order_status_idt == 'preparing';
  }

  cancelOrder(order){
    if(confirm("Are you sure to cancel order?")){
      this.changeOrderStatus(order, 'cancelled');
    }
  }

  changeOrderStatus(order, status)
  {
    this.orderService.changeOrderStatus(order, status)
      .subscribe(resp => {
        alert(resp['message']);
        
        if(this.changeStatusDialogRef != null)
          this.changeStatusDialogRef.close();
        
        this.refresh();
      });
  }

  setTimerStoppedState(state: boolean){
    console.log(state);
    this.isTimerStopped = state;
  }

  closeOrder(){
    if(this.selectedOrder.receivable_amount - this.cash_received - this.card_received > 0){
      alert('Received amount is less than Order Amount');
      return;
    }

    this.orderService.closeOrder(this.selectedOrder, this.cash_received, this.card_received)
      .subscribe(resp => {
        alert(resp['message']);
        if(resp['success'] == true){
          this.isCloseOrderModalVisible = false;
          this.refresh();
        }
      });
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
  }

  showDiscountModal(order) {
    this.selectedOrder = order;
    this.isDiscountModalVisible = true;
  }

  saveDiscount()
  {
    alert('saveDiscount');
  }

  setDiscountAmount() {
    this.discount_amount = Math.round(this.selectedOrder.receivable_amount * this.discount_percent / 100);
  }

  setDiscountPercent() {
    this.discount_percent = Math.round(this.discount_amount / this.selectedOrder.receivable_amount * 100);
  }

}
