import { Component, OnInit, Input } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'order-items-amounts',
  templateUrl: './order-items-amounts.component.html',
  styleUrls: ['./order-items-amounts.component.scss']
})
export class OrderItemsAmountsComponent implements OnInit {

  currencyCode = this.settingsService.getCurrencyCode();

  @Input() order;
  @Input() small = false;
  showDetails = false;

  constructor(private orderService: OrderService,
    private settingsService: SettingsService) { }

  ngOnInit() {
  }

}
