import { Component, OnInit } from '@angular/core';
import { MenuModalService } from 'src/app/services/menu-modal.service';
import { OrderService } from '../../../../../admin/src/app/common-services-components/services/order.service';
import { SettingsService } from '../../../../../admin/src/app/common-services-components/services/settings.service';

@Component({
  selector: 'nav2',
  templateUrl: './nav2.component.html',
  styleUrls: ['./nav2.component.css']
})
export class Nav2Component implements OnInit {

  order;
  currencyCode = this.settingsService.getCurrencyCode();

  constructor(
    private menuModalService: MenuModalService,
    private orderService: OrderService,
    public settingsService: SettingsService) { }

  ngOnInit() {
    this.order = this.orderService.order;
  }

  setMenuModalVisibility(visibility)
  {
    this.menuModalService.changeVisibility(visibility);
  }

  setOrderModalVisibility(visibility)
  {
    this.orderService.changeOrderModalVisibility(visibility);
  }

}
