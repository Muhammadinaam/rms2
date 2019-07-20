import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../../../../admin/src/app/common-services-components/services/order.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tab-order-page',
  templateUrl: './tab-order-page.component.html',
  styleUrls: ['./tab-order-page.component.scss'],
})
export class TabOrderPageComponent implements OnInit {
  order: any;

  constructor(private orderService: OrderService, private storage: Storage) { }

  ngOnInit() {
    this.order = this.orderService.order;
  }

  orderSaved(tracking_number) {
    this.storage.set('tracking_number', tracking_number)
  }

}
