import { Component, OnInit } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';
import { HttpClient } from '@angular/common/http';
import { BaseEndPointService } from '../services/base-end-point.service';

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
  
  constructor(private http: HttpClient)
  {
    
  }

  ngOnInit(): void {
    
  }


  menu = MENU_ITEMS;
}
