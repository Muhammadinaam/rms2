import { Component, OnInit, OnDestroy, TemplateRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoaderService } from '../../../@theme/services/loader.service';
import * as moment from 'moment';
import { NbDialogService } from '@nebular/theme';
import { BaseEndPointService } from '../../../common-services-components/services/base-end-point.service';
import { OrderService } from '../../../common-services-components/services/order.service';

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
  closingOrder = null;
  cash_received = 0;
  card_received = 0;
  
  constructor(private http: HttpClient, 
    private loaderService: LoaderService,
    private dialogService: NbDialogService,
    private orderService: OrderService) { }

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

  calculateTime(order)
  {
    let created_at = moment(order.created_at);
    let current = moment();
    let diff = current.diff(created_at, 'minutes');

    return diff;
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
    if(this.closingOrder.receivable_amount - this.cash_received - this.card_received > 0){
      alert('Received amount is less than Order Amount');
      return;
    }

    this.orderService.closeOrder(this.closingOrder, this.cash_received, this.card_received)
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
    this.closingOrder = order;
    this.isCloseOrderModalVisible = true;
  }

  

}
