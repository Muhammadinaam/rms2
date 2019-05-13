import { Component, OnInit, Input } from '@angular/core';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'order-items-amounts',
  templateUrl: './order-items-amounts.component.html',
  styleUrls: ['./order-items-amounts.component.scss']
})
export class OrderItemsAmountsComponent implements OnInit {

  @Input() order;

  constructor(private orderService: OrderService) { }

  ngOnInit() {
  }

}
