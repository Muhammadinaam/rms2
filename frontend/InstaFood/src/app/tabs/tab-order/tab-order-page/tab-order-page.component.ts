import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../../../../admin/src/app/common-services-components/services/order.service';
import { Storage } from '@ionic/storage';
import { SettingsService } from '../../../../../../admin/src/app/common-services-components/services/settings.service';
import { Network } from '@ionic-native/network/ngx';

@Component({
  selector: 'app-tab-order-page',
  templateUrl: './tab-order-page.component.html',
  styleUrls: ['./tab-order-page.component.scss'],
})
export class TabOrderPageComponent implements OnInit {
  
  order: any;

  constructor(private orderService: OrderService, 
    private storage: Storage,
    private settingsService: SettingsService,
    private network: Network) { 
      this.network.onDisconnect().subscribe(() => {
        this.settingsService.initialized = false;
        window.location.reload();
      });
    }

  ngOnInit(): void {
    this.order = this.orderService.order;
  }

  ionViewDidEnter() {
    this.order = this.orderService.order;
  }

  orderSaved(tracking_number) {
    this.storage.set('tracking_number', tracking_number)
  }

}
