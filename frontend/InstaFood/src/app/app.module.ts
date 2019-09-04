import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { OneSignal } from '@ionic-native/onesignal/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { SettingsService } from '../../../admin/src/app/common-services-components/services/settings.service';
import { IonicStorageModule } from '@ionic/storage';
import { NoInternetComponent } from './no-internet/no-internet.component';
import { Network } from '@ionic-native/network/ngx';
import { BaseEndPointService } from '../../../admin/src/app/common-services-components/services/base-end-point.service';

export function initializeApp1(settingsService: SettingsService) {
  return (): Promise<any> => { 
    BaseEndPointService.isApp = true;
    return settingsService.Init();
  }
}

@NgModule({
  declarations: [AppComponent, NoInternetComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    HttpClientModule,
    IonicStorageModule.forRoot()
  ],
  providers: [
    Network,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    SettingsService,
    { provide: APP_INITIALIZER,useFactory: initializeApp1, deps: [SettingsService], multi: true},
    OneSignal
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
