import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseEndPointService } from '../../../../../../admin/src/app/common-services-components/services/base-end-point.service';
import { Network } from '@ionic-native/network/ngx';
import { SettingsService } from '../../../../../../admin/src/app/common-services-components/services/settings.service';

@Component({
  selector: 'app-tab-categories',
  templateUrl: './tab-categories.component.html',
  styleUrls: ['./tab-categories.component.scss'],
})
export class TabCategoriesComponent {

  loading:boolean;
  categories;

  constructor(private http: HttpClient,
    private settingsService: SettingsService,
    private network: Network) { 
    this.network.onDisconnect().subscribe(() => {
      this.settingsService.initialized = false;
      window.location.reload();
    });
  }

  ionViewDidEnter() {

    this.loading = true;
    this.http.get(BaseEndPointService.getBaseEndPoint() + '/api/categories?all=1')
      .subscribe(resp => {
        this.categories = resp;
      }).add(() => {
        this.loading = false;
      });

  }

}
