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

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  constructor(
    private analytics: AnalyticsService, 
    private menuService: NbMenuService,
    private authService: AuthService) {
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
  }

  
}
