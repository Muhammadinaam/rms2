import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../../../../../admin/src/app/common-services-components/services/settings.service';
import { BaseEndPointService } from '../../../../../../admin/src/app/common-services-components/services/base-end-point.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tab-home-page',
  templateUrl: './tab-home-page.component.html',
  styleUrls: ['./tab-home-page.component.scss'],
})
export class TabHomePageComponent implements OnInit {

  loading: boolean;
  imageSources = [];

  openingHoursStart = '0:00AM';
  openingHoursEnd = '0:00AM';

  deliveryHoursStart = '0:00AM';
  deliveryHoursEnd = '0:00AM';

  basePath = BaseEndPointService.getBaseEndPoint();
  categories = null;


  slideOpts = {
    initialSlide: 1,
    speed: 400
  }

  constructor(
    private settingsService: SettingsService,
    private http: HttpClient,
    ) { }

  ngOnInit() {

    for(let i = 0; i < 5; i++ ){
      let imageURL = this.settingsService.getSettingFromArray('slider-image-' + (i+1));

      if(imageURL != null && imageURL != ''){
        this.imageSources.push( BaseEndPointService.getBaseEndPoint() + '/images/' + imageURL );
      }
    }

    console.log(this.imageSources);

    this.loading = true;
    this.http.get(this.basePath + '/api/categories?limit=3')
      .subscribe(resp => {
        this.categories = resp;
      }).add(() => {
        this.loading = false;
      });

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

}
