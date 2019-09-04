import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Router } from '@angular/router';
import { mergeMap, retry, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  @Input() order;
  @Input() redirectPath: string = "track-order";
  @Input() orderTypeIdt = 'wd';

  loading

  @Output() orderSaved:EventEmitter<any> = new EventEmitter<any>();
  retryCount: any;

  constructor(private orderService: OrderService, private router: Router) { }

  ngOnInit() {
  }

  saveOrder()
  {
    this.order.order_type_idt = this.orderTypeIdt;

    if(
      this.order.customer_name == '' ||
      this.order.customer_address == '' ||
      this.order.customer_phone == '' || 
      this.order.customer_zipcode == '')
    {
      alert('Please provide Name, Address, Zipcode and Phone');
      return;
    }

    if(this.orderService.minimumOrderAmount > this.order.order_amount_before_discount)
    {
      alert('Minimum Order Amount is ' 
      + this.orderService.minimumOrderAmount 
      + ', please add more items');
      return;
    }

    this.retryCount = 0;
    this.callSaveOrderServiceMethod();
  }


  private callSaveOrderServiceMethod() {
    this.loading = true;
    this.orderService.saveOrder()
      .subscribe(data => {
        if (data['success'] == true) {
          this.orderService.order.items = [];
          this.router.navigate(['/' + this.redirectPath, data['tracking_number']]);
          this.orderSaved.emit(data['tracking_number']);
        }
        else {
          alert(data['message']);
        }
        this.loading = false;
      }, (error) => {
        this.retryCount++;
        if(this.retryCount < 5) {
          this.callSaveOrderServiceMethod();
        } else {
          this.loading = false;
          console.log(error);
          alert('Internet/Network Failure, please try again. Error: ' + error.message);
        }
      });
  }
}
