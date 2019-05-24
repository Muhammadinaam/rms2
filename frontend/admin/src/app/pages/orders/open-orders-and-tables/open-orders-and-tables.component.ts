import { Component, OnInit, OnDestroy, TemplateRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoaderService } from '../../../@theme/services/loader.service';
import * as moment from 'moment';
import { NbDialogService } from '@nebular/theme';
import { BaseEndPointService } from '../../../common-services-components/services/base-end-point.service';

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
  
  constructor(private http: HttpClient, 
    private loaderService: LoaderService,
    private dialogService: NbDialogService) { }

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
      this.changeOrderStatus('cancelled', order);
    }
  }

  changeOrderStatus(status, order)
  {
    let data = {order_id: order.id, status_idt: status};
    this.http.post(BaseEndPointService.getBaseEndPoint() + '/api/change-order-status', data)
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

  closeOrder(order){
    alert("You do not have permission to Close Order");
  }

  

}
