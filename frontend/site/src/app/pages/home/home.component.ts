import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseEndPointService } from 'src/app/services/base-end-point.service';
import { MenuModalService } from 'src/app/services/menu-modal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 
  loading: boolean;

  constructor(
    private http: HttpClient,
    private menuModalService: MenuModalService,
    private router: Router) { }

  basePath = BaseEndPointService.getBaseEndPoint();
  categories = null;

  ngOnInit() {
    this.loading = true;
    this.http.get(this.basePath + '/api/categories?limit=3')
      .subscribe(resp => {
        this.categories = resp;
      }).add(() => {
        this.loading = false;
      });;
  }

  setMenuModalVisibility(visibility)
  {
    this.menuModalService.changeVisibility(visibility);
  }

  menuClicked(categoryName)
  {
    this.router.navigate(['/menu/' + categoryName.toLowerCase()]);
  }

}
