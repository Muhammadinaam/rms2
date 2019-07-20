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
        this.status = idt == 'phone-confirmation-pending' || idt == 'preparing' || idt == 'on-the-way' || idt == 'served' ? 
          status['name'] :
          'Tracking link expired';

      });
  }

}
