import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../../../../admin/src/app/common-services-components/services/order.service';

@Component({
  selector: 'app-track-order',
  templateUrl: './track-order.component.html',
  styleUrls: ['./track-order.component.css']
})
export class TrackOrderComponent implements OnInit, OnDestroy {

  loading = false;
  tracking_number = '';
  status = '';
  intervalID;
  statusDescription: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(params => {
        this.tracking_number = params['tracking_number'];
      })

    this.refreshStatus();
    this.intervalID = setInterval(() => {
      this.refreshStatus();
    }, 20000);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalID);
    
  }

  refreshStatus()
  {
    if(this.tracking_number == '')
      return;

    this.orderService.refreshStatus(this.tracking_number)
      .subscribe(order_status => {
        let status = order_status['order_status'];

        if(status == null)
        {
          
          return;
        }

        let idt = status['idt'];
        console.log(idt);
        if(idt == 'phone-confirmation-pending' || idt == 'preparing' || idt == 'on-the-way' || idt == 'served' ||idt == 'phone-not-confirmed') {
          this.status = status['name'];
          this.statusDescription = status['description'];
        } else {
          this.status = 'Tracking link expired';
          this.statusDescription = '';
        }

      });
  }

}
