import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../../../admin/src/app/common-services-components/services/settings.service';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

@Component({
  selector: 'no-internet',
  templateUrl: './no-internet.component.html',
  styleUrls: ['./no-internet.component.scss'],
})
export class NoInternetComponent implements OnInit {

  constructor(private settingsService: SettingsService,
    private splashScreen: SplashScreen) { }

  ngOnInit() {}

  refresh() {
    this.settingsService.Init();
    this.splashScreen.show();
    window.location.reload();
  }

}
