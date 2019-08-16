import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../../../admin/src/app/common-services-components/services/settings.service';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

@Component({
  selector: 'no-internet',
  templateUrl: './no-internet.component.html',
  styleUrls: ['./no-internet.component.scss'],
})
export class NoInternetComponent implements OnInit {
  errorDetail: string;

  constructor(private settingsService: SettingsService,
    private splashScreen: SplashScreen) { }

  ngOnInit() {}

  refresh() {
    this.settingsService.Init();
    this.splashScreen.show();
    window.location.reload();
  }

  detail() {

    let error = this.settingsService.initError;

    if(error == null) {
      this.errorDetail = 'No Error - Please check internet connection.';
      return;
    }

    console.log(error);

    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      this.errorDetail = 'An error occurred:' + error.error.message;
      console.error(this.errorDetail);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      this.errorDetail = `Backend returned code: ${error.status}, ` +
      `Error Message: ${error.message}, ` +
      `body was: ${error.error}`;

      console.error(
        this.errorDetail);
    }

    alert(this.errorDetail);

  }

}
