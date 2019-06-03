/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import { filter } from 'rxjs/operators';
import { NbMenuService } from '@nebular/theme';
import { AuthService } from './auth/services/auth.service';
import { SettingsService } from './common-services-components/services/settings.service';

@Component({
  selector: 'ngx-app',
  //template: '<router-outlet></router-outlet>',

  template: 
  `
  <div *ngIf="!settingsService.initialized">
    <div style="text-align: center">
        <b>Failed to load data! Please Check Internet Connection</b>
        <br>
        <button style="padding: 30px; margin: 20px" class="btn btn-primary" (click)="refresh()">Refresh</button>
    </div>
    <!-- or <app-config-error-page> -->
  </div>
  <div *ngIf="settingsService.initialized" #layoutContainer >
    <router-outlet></router-outlet>

    <div *ngIf="isSpinnerVisible">
      <style>@-webkit-keyframes spin{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}@-moz-keyframes spin{0%{-moz-transform:rotate(0)}100%{-moz-transform:rotate(360deg)}}@keyframes spin{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}.spinner{position:fixed;top:0;left:0;width:100%;height:100%;z-index:1003;background: #000000;overflow:hidden}  .spinner div:first-child{display:block;position:relative;left:50%;top:50%;width:150px;height:150px;margin:-75px 0 0 -75px;border-radius:50%;box-shadow:0 3px 3px 0 rgba(255,56,106,1);transform:translate3d(0,0,0);animation:spin 2s linear infinite}  .spinner div:first-child:after,.spinner div:first-child:before{content:'';position:absolute;border-radius:50%}  .spinner div:first-child:before{top:5px;left:5px;right:5px;bottom:5px;box-shadow:0 3px 3px 0 rgb(255, 228, 32);-webkit-animation:spin 3s linear infinite;animation:spin 3s linear infinite}  .spinner div:first-child:after{top:15px;left:15px;right:15px;bottom:15px;box-shadow:0 3px 3px 0 rgba(61, 175, 255,1);animation:spin 1.5s linear infinite}</style>
      <div id="nb-global-spinner" class="spinner">
        <div class="blob blob-0"></div>
        <div class="blob blob-1"></div>
        <div class="blob blob-2"></div>
        <div class="blob blob-3"></div>
        <div class="blob blob-4"></div>
        <div class="blob blob-5"></div>
      </div>
    </div>
  </div>
  `

})
export class AppComponent implements OnInit {

  isSpinnerVisible = false;

  constructor(
    private analytics: AnalyticsService, 
    private menuService: NbMenuService,
    private authService: AuthService,
    public settingsService: SettingsService) {
    menuService.onItemClick()
      .subscribe(bag => {
        if( bag.tag == 'user-context-menu' ){
          if(bag.item.title == 'Log out'){
            this.authService.logout();
          }
        }
      });
  }

  ngOnInit() {
    this.analytics.trackPageViews();
    this.isSpinnerVisible = false;
  }

  refresh(){
    window.location.reload();
  }
  
}
