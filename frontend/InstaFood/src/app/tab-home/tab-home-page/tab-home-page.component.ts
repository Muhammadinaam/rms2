import { Component, OnInit } from '@angular/core';
import { BaseEndPointService } from '../../../../../admin/src/app/common-services-components/services/base-end-point.service';
import { UserService } from 'src/app/api/user.service';
import { SettingsService } from '../../../../../admin/src/app/common-services-components/services/settings.service';
//import { SettingsService } from '../../../../../admin/src/app/common-services-components/services/settings.service';

@Component({
  selector: 'app-tab-home-page',
  templateUrl: './tab-home-page.component.html',
  styleUrls: ['./tab-home-page.component.scss'],
})
export class TabHomePageComponent implements OnInit {

  imageSources = [];

  constructor(private settingsService: SettingsService) { }

  ngOnInit() {

  }

  // constructor(private settingsService: SettingsService) { }

  // ngOnInit() {

  //   for(let i = 0; i < 5; i++ ){
  //     let imageURL = this.settingsService.getSettingFromArray('slider-image-' + (i+1));

  //     if(imageURL != null && imageURL != ''){
  //       this.imageSources.push( BaseEndPointService.getBaseEndPoint() + '/images/' + imageURL );
  //     }
  //   }

  //   console.log(this.imageSources);

  // }

}
