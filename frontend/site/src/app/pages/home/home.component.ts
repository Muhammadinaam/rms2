import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseEndPointService } from '../../../../../admin/src/app/common-services-components/services/base-end-point.service';
import { MenuModalService } from 'src/app/services/menu-modal.service';
import { Router } from '@angular/router';
import { SettingsService } from '../../../../../admin/src/app/common-services-components/services/settings.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 
  loading: boolean;
  allSettingsArray;

  openingHoursStart = '0:00AM';
  openingHoursEnd = '0:00AM';

  deliveryHoursStart = '0:00AM';
  deliveryHoursEnd = '0:00AM';

  constructor(
    private http: HttpClient,
    private menuModalService: MenuModalService,
    private router: Router,
    private settingsService: SettingsService) { }

  basePath = BaseEndPointService.getBaseEndPoint();
  categories = null;

  ngOnInit() {
    this.loading = true;
    this.http.get(this.basePath + '/api/categories?limit=3')
      .subscribe(resp => {
        this.categories = resp;
      }).add(() => {
        this.loading = false;
      });;

      this.allSettingsArray = this.settingsService.allSettingsArray;

      this.getHoursFromSettings();
  }

  private getHoursFromSettings() {
    let openingHours = this.settingsService.getSettingFromArray('opening-hours');
    let openingHoursArray = openingHours.split(",");

    this.openingHoursStart = openingHoursArray[0];
    if(openingHoursArray.length == 2){
      this.openingHoursEnd = openingHoursArray[1];
    }

    let deliveryHours = this.settingsService.getSettingFromArray('opening-hours');
    let deliveryHoursArray = deliveryHours.split(",");

    this.deliveryHoursStart = deliveryHoursArray[0];
    if(deliveryHoursArray.length == 2){
      this.deliveryHoursEnd = deliveryHoursArray[1];
    }
  }

  setMenuModalVisibility(visibility)
  {
    this.menuModalService.changeVisibility(visibility);
  }

  menuClicked(categoryName)
  {
    this.router.navigate(['/menu/' + categoryName.toLowerCase()]);
  }

}
