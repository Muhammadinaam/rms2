import { Component, OnInit } from '@angular/core';

import { MENU_ITEMS as MENU_ITEMS_ALL } from './pages-menu';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/services/auth.service';
import cloneDeep from 'lodash/cloneDeep';

@Component({
  selector: 'ngx-pages',
  template: `
    <ngx-sample-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-sample-layout>
  `,
})
export class PagesComponent implements OnInit {
  
  menu = [];

  constructor(private http: HttpClient, private authService: AuthService)
  {
    
  }

  async ngOnInit() {

    let MENU_ITEMS = cloneDeep(MENU_ITEMS_ALL);
    let updatedMenu = [];
    
    for(let i = 0; i < MENU_ITEMS.length; i++) {
      if(MENU_ITEMS[i].children != null) {
        
        for(let j = 0; j < MENU_ITEMS[i].children.length; j++) {
          let hasPermission = await this.authService.loggedInUserHasPermission( MENU_ITEMS[i].children[j].data.permission_idt );
          if( !hasPermission ) {
            MENU_ITEMS[i].children.splice(j, 1);
            j--;
          }
        }

        if( MENU_ITEMS[i].children.length > 0 ) {
          updatedMenu.push(MENU_ITEMS[i]);
        }

      } else {

        if(MENU_ITEMS[i].data == null) {
          updatedMenu.push(MENU_ITEMS[i]);
          continue;
        }
        
        let hasPermission = await this.authService.loggedInUserHasPermission( MENU_ITEMS[i].data.permission_idt );
        if( hasPermission ) {
          updatedMenu.push(MENU_ITEMS[i]);
        }
      }
    }

    this.menu = updatedMenu;
    console.log(this.menu);
    
  }


  
}
