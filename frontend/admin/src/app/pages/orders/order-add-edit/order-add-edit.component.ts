import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../common-services-components/services/order.service';

@Component({
  selector: 'order-add-edit',
  templateUrl: './order-add-edit.component.html',
  styleUrls: ['./order-add-edit.component.scss']
})
export class OrderAddEditComponent implements OnInit {

  order;

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.order = this.orderService.order;
  }

}
