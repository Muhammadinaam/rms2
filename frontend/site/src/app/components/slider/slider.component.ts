import { Component, OnInit } from '@angular/core';
import { BaseEndPointService } from '../../../../../admin/src/app/common-services-components/services/base-end-point.service';
import { SettingsService } from '../../../../../admin/src/app/common-services-components/services/settings.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  imageSources = [];

  constructor(private settingsService: SettingsService) { }

  ngOnInit() {
    
    for(let i = 0; i < 5; i++ ){
      let imageURL = this.settingsService.getSettingFromArray('slider-image-' + (i+1));

      if(imageURL != null && imageURL != ''){
        this.imageSources.push( BaseEndPointService.getBaseEndPoint() + '/images/' + imageURL );
      }
    }

    console.log(this.imageSources);

  }

}
