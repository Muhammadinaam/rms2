import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { OrderService } from '../../../../../../admin/src/app/common-services-components/services/order.service';
import { SettingsService } from '../../../../../../admin/src/app/common-services-components/services/settings.service';
import { Network } from '@ionic-native/network/ngx';

@Component({
  selector: 'app-track-order-page',
  templateUrl: './track-order-page.component.html',
  styleUrls: ['./track-order-page.component.scss'],
})
export class TrackOrderPageComponent {
  
  loading = false;
  tracking_number = '';
  status = '';
  intervalID;

  constructor(private storage: Storage, 
    private orderService: OrderService,
    private settingsService: SettingsService,
    private network: Network) { 
      this.network.onDisconnect().subscribe(() => {
        this.settingsService.initialized = false;
        window.location.reload();
      });
    }

  ionViewDidEnter() {
    
    this.storage.get('tracking_number')
      .then(tracking_number => {
        this.tracking_number = tracking_number
        this.refreshStatus();
      });

    
    this.intervalID = setInterval(() => {
      this.refreshStatus();
    }, 20000);
  }

  ionViewWillLeave(): void {
    
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
