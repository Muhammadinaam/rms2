import { Component, OnInit } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/services/auth.service';

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

  ngOnInit() {
    
    for(let i = 0; i < MENU_ITEMS.length; i++) {
      if(MENU_ITEMS[i].children != null) {
        
        for(let j = 0; j < MENU_ITEMS[i].children.length; j++) {
          let hasPermission = this.authService.loggedInUserHasPermission( MENU_ITEMS[i].children[j].data.permission_idt );
          alert(hasPermission);
          if( !hasPermission ) {
            MENU_ITEMS[i].children.splice(j, j);
            j--;
          }
        }

        if( MENU_ITEMS[i].children.length > 0 ) {
          this.menu.push(MENU_ITEMS[i]);
        }

      } else {

        if(MENU_ITEMS[i].data == null) {
          this.menu.push(MENU_ITEMS[i]);
          continue;
        }
        
        let hasPermission = this.authService.loggedInUserHasPermission( MENU_ITEMS[i].data.permission_idt );
        if( hasPermission ) {
          this.menu.push(MENU_ITEMS[i]);
        }
      }
    }

    
  }


  
}
