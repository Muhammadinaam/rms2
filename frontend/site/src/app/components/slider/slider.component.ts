import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';
import { BaseEndPointService } from 'src/app/services/base-end-point.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  imageSources = [];
  height = '60vh';

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
